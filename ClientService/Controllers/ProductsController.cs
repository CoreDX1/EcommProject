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
    public ActionResult<Category> Get()
    {
        IQueryable data = category.Get();
        return StatusCode(200, data);
    }

    [HttpPost]
    public async Task<ActionResult<Category>> Insert(Category form)
    {
        Category data = await category.Insert(form);
        return StatusCode(200, data);
    }
}
