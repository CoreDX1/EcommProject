using System.Security.Claims;
using ClientService.Interface;
using EcommEntity.Models;
using Microsoft.AspNetCore.Mvc;

namespace ClientService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HomeController : Controller
{
    private readonly IHome<Home> _homeSer;
    public HomeController(IHome<Home> homeSer)
    {
        _homeSer = homeSer;
    }

    /// <summary>
    /// Get all products
    /// </summary>
    /// <returns>Json Products</returns>

    [HttpGet]
    [Route("GetHome")]
    public async Task<ActionResult<Home>> Get()
    {
        var data = await _homeSer.GetHome();
        if(data != null) return StatusCode(200, data);
        return StatusCode(404, "No hay datos");
    }

    /// <summary>
    /// Insert products
    /// </summary>
    /// <param name="add">Create Products</param>
    /// <returns>Json Products</returns>
    [HttpPost]
    [Route("InsertProducts")]
    public async Task<ActionResult<Home>> Post(CreateProduct add)
    {
        var data = await _homeSer.InsertProducts(add);
        if(data != null) return StatusCode(200, data);
        return StatusCode(404, "No se pudo insertar");
    }

    /// <summary>
    /// Method to delete product
    /// </summary>
    /// <param name="id">Id of product</param>
    /// <returns>A success or failure message and the ID of the deleted product</returns>

    [HttpDelete]
    [Route("DeleteProducts")]
    public async Task<dynamic> Delete(DeleteID id)
    {
        var indentiy = HttpContext.User.Identity as ClaimsIdentity;
        var data = await _homeSer.ValidarToken(indentiy);
        if(!data.success ) return data;
        Usuario user = data.result;
        if(user.rol != "admin") {
            return new {
                success = false,
                message = "No tiene permisos para eliminar",
                result = ""
            };
        }
        var homeproduct = await _homeSer.DeleteProducts(id.id_home);
        return new {
            success = true,
            message = "Producto eliminado",
            result = id
        };
    }
}
