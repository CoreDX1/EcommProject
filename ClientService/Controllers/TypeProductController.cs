using ClientService.Interface;
using EcommEntity.Models;
using Microsoft.AspNetCore.Mvc;

namespace ClientService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TypeProductController : Controller
{
    private ITypeProduct typeProduct;

    public TypeProductController(ITypeProduct entity)
    {
        typeProduct = entity;
    }

    /// <summary>
    /// Get all TypeProduct
    /// </summary>
    /// <returns> Returns the typeproducts data in json format</returns>
    [HttpGet]
    [ProducesDefaultResponseType, Produces("application/json")]
    [ProducesResponseType(200, Type = typeof(Home))]
    [ProducesResponseType(404, Type = typeof(string))]
    public async Task<ActionResult<TypeProduct>> Get()
    {
        List<TypeProduct> data = await typeProduct.GetAll();
        return StatusCode(200, data);
    }
}
