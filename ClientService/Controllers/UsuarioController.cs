using EcommEntity.Models;
using Microsoft.AspNetCore.Mvc;

namespace ClientService.Controllers;

[ApiController]
[Route("api/[Controller]")]
public class UsuarioController : Controller
{
    private IUsuario<Usuario> usuario;

    public UsuarioController(IUsuario<Usuario> _usuario)
    {
        this.usuario = _usuario;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var data = await usuario.GetUsuario();
        return Ok(data);
    }
}
