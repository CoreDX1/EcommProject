using Microsoft.AspNetCore.Mvc;
using ClientService.Interface;
using EcommEntity.Models;
using System.Net;

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

    /// summary>
    /// Get all categories and subcategories
    /// </summary>
    /// <returns> Return menu </returns>
    [HttpGet]
    [ProducesResponseType(200), ProducesResponseType(404)]
    [ProducesDefaultResponseType, Produces("application/json")]
    public async Task<ActionResult<SubCategory>> GetPrueba()
    {
        var data = await menu.GetCategorySubCategory();
        if(data != null) return StatusCode(200, data);
        var resp = new HttpResponseMessage(HttpStatusCode.NotFound){
            ReasonPhrase = "No hay datos"
        };
        return StatusCode(404, resp);
    } 
}
