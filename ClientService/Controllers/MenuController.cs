using Microsoft.AspNetCore.Mvc;
using ClientService.Interface;
using EcommEntity.Models;

namespace ClientService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MenuController : Controller
{
    private IMenuDinamic menu;

    public MenuController(IMenuDinamic _menu)
    {
        this.menu = _menu;
    }

    [HttpGet]
    public async Task<IActionResult> GetPrueba()
    {
        var data = await menu.GetCategorySubCategory();
        return Ok(data);
    }
}
