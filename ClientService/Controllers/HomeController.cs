using ClientService.Interface;
using EcommEntity.Models;
using Microsoft.AspNetCore.Mvc;

namespace ClientService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HomeController : Controller
{
    private readonly IHome<Home> _homeSer;
    public HomeController(IHome<Home> homeSer)
    {
        _homeSer = homeSer;
    }

    [HttpGet]
    [Route("GetHome")]
    public async Task<ActionResult<Home>> Get()
    {
        var data = await _homeSer.GetHome();
        if(data != null) return StatusCode(200, data);
        return StatusCode(404, "No hay datos");
    }
}