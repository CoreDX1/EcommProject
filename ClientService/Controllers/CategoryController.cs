using Microsoft.AspNetCore.Mvc;
using ClientService.Interface;
using EcommEntity.Models;

namespace ClientService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoryController : Controller
{
    private ICategory<Category> category;

    public CategoryController(ICategory<Category> category)
    {
        this.category = category;
    }

    [HttpGet]
    public async Task<ActionResult<Category>> Get()
    {
        var data = await category.Get();
        return StatusCode(200, data);
    }

    [HttpPost]
    public async Task<ActionResult<Category>> Insert(Category form)
    {
        Category data = await category.Insert(form);
        return StatusCode(200, data);
    }
}
