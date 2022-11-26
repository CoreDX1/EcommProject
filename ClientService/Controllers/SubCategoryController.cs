using Microsoft.AspNetCore.Mvc;
using ClientService.Interface;
using EcommEntity.Models;

namespace ClientService.Controllers;

[ApiController]
[Route("api/[controller]")]

public class SubCategoryController : Controller
{
    private ISubCategory<SubCategory> category;
    public SubCategoryController(ISubCategory<SubCategory> category)
    {
        this.category = category;
    }

    [HttpGet]
    public async Task<IActionResult> GetSub()
    {
        var data = await category.GetSubCategory();
        return StatusCode(200, data);
    }

    [HttpPost]
    public async Task<IActionResult> Insert(SubCategory form)
    {
        var data = await category.Insert(form);
        return StatusCode(200, data);
    }
}
