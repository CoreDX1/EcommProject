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
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [Route("register")]
    public async Task<dynamic> GetRegister([FromBody] Register user)
    {
        Usuario data = await usuario.CreateUser(user);
        if(data == null)
            return new { success = false, message = "El Email ingresado existe"};
        return Ok(new { success = true, message = "Usuario creado"});
    }

    [HttpPost]
    [Route("login")]
    public async Task<dynamic> login([FromBody] LoginUser user)
    {
        Usuario data = await usuario.GetByUser(user.email, user.password);
        if (data != null) return new { success = true, message = "Usuario encontrado" , data};
        return new { success = false, message = "El email ingresado existe" };
        
    }

    [HttpPost]
    [Route("token")]
    public async Task<dynamic> IniciarSesion([FromBody] Object optdata)
    {
        var data = JsonConvert.DeserializeObject<dynamic>(optdata.ToString());
        string email = data.email.ToString();
        string password = data.password.ToString();
        Usuario usuarioApi = await usuario.GetByUser(email, password);
        if (usuarioApi == null)
        {
            return new
            {
                success = false,
                message = "Credenciales incorrectas",
                result = "El Email o la contraseña son incorrectos"
            };
        }

        Jwt jwt = _configuration.GetSection("Jwt").Get<Jwt>();
        Claim[] claims = new[]
        {
            // new Claim(JwtRegisteredClaimNames.Sub, jwt.Subject),
            // new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            // new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
            new Claim("id", usuarioApi.id_user.ToString()),
            new Claim("email", usuarioApi.email),
            new Claim("username", usuarioApi.username),
            new Claim("password", usuarioApi.password)
        };

        SecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.Key));
        SigningCredentials singIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        JwtSecurityToken token = new JwtSecurityToken(
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
