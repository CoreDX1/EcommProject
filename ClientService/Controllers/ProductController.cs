using Microsoft.AspNetCore.Mvc;
using ClientService.Interface;
using EcommEntity.Models;

namespace ClientService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductController : Controller
{
    private IProduct product;
    public ProductController(IProduct entity)
    {
        product = entity;
    }

    [HttpGet]
    public async Task<ActionResult<Product>> Get()
    {
        var data = await product.GetAll();
        return StatusCode(200, data);
    }
}
