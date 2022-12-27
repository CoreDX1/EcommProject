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
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    [ProducesDefaultResponseType, Produces("application/json")]
    public async Task<ActionResult<Category>> Get()
    {
        List<Category> data = await category.Get();
        if (data != null) return StatusCode(200, data);
        return StatusCode(404, "No hay datos");
    }

    [HttpPost]
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    [ProducesDefaultResponseType, Produces("application/json")]
    public async Task<ActionResult<Category>> Insert([FromBody] Category form)
    {
        Category data = await category.Insert(form);
        if (data != null) StatusCode(200, data);
        return StatusCode(404, "No se pudo insertar");
    }
}
