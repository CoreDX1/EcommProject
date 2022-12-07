using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using EcommEntity.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace ClientService.Controllers;

[ApiController]
[Route("api/[Controller]")]
public class UsuarioController : Controller
{
    private IUsuario<Usuario> usuario;
    public IConfiguration _configuration;

    public UsuarioController(IUsuario<Usuario> _usuario, IConfiguration configuration)
    {
        this.usuario = _usuario;
        this._configuration = configuration;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var data = await usuario.GetUsuario();
        return Ok(data);
    }

    [HttpPost]
    public async Task<IActionResult> GetRegister(Register user)
    {
        var data = await usuario.CreateUser(user);
        return Ok(data);
    }

    [HttpPost]
    [Route("login")]
    public dynamic login([FromBody] LoginUser user)
    {
        Usuario data = usuario.GetByUser(user.name, user.password);
        if (data == null)
        {
            return new { success = false, message = "Usuario no encontrado" };
        }
        return new { success = true, message = "Usuario encontrado" , data};
    }

    [HttpPost]
    [Route("token")]
    public dynamic IniciarSesion([FromBody] Object optdata)
    {
        var data = JsonConvert.DeserializeObject<dynamic>(optdata.ToString());
        string user = data.name.ToString();
        string password = data.password.ToString();
        Usuario usuarioApi = usuario.GetByUser(user, password);
        if (usuarioApi == null)
        {
            return new
            {
                success = false,
                message = "Credenciales incorrectas",
                result = ""
            };
        }

        var jwt = _configuration.GetSection("Jwt").Get<Jwt>();
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, jwt.Subject),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
            new Claim("id", usuarioApi.id_user.ToString()),
            new Claim("name", usuarioApi.name),
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.Key));
        var singIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            jwt.Issuer,
            jwt.Audience,
            claims,
            expires: DateTime.Now.AddHours(3),
            signingCredentials: singIn
        );

        return new
        {
            success = true,
            messsage = "Exito",
            usuarioApi,
            result = new JwtSecurityTokenHandler().WriteToken(token),
        };
    }
}
