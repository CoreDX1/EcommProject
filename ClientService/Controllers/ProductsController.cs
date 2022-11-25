using Microsoft.AspNetCore.Mvc;
using ClientService.Interface;
using EcommEntity.Models;

namespace ClientService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : Controller
{
    private IProduct<Category> category;
    public ProductsController(IProduct<Category> category)
    {
        this.category = category;
    }

    [HttpGet]
    public IActionResult Get()
    {
        var data = category.Get();
        return StatusCode(200, data);
    }
}
