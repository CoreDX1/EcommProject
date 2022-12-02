using ClientService.Interface;
using EcommEntity.Models;
using Microsoft.AspNetCore.Mvc;

namespace ClientService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TypeProductController : Controller
{
    private ITypeProduct<TypeProduct> typeProduct;

    public TypeProductController(ITypeProduct<TypeProduct> entity)
    {
        typeProduct = entity;
    }

    [HttpGet]
    public async Task<ActionResult<TypeProduct>> Get()
    {
        List<TypeProduct> data = await typeProduct.GetAll();
        return StatusCode(200, data);
    }
}
