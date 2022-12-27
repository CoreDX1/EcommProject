using ClientService.Interface;
using Microsoft.AspNetCore.Mvc;

namespace ClientService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UploadImagenController : ControllerBase
{
    private IUploadImagen _uploadImagen;
    public UploadImagenController(IUploadImagen uploadImagen)
    {
        _uploadImagen = uploadImagen;
    }

    [HttpPost, DisableRequestSizeLimit]
    public IActionResult PostImagen(IFormFile imagen)
    {
        try
        {
            var file = Request.Form.Files[0];
            if (_uploadImagen.PostImagen(file))
            {
                return Ok(new { message = "Imagen subida correctamente" });
            }
            else
            {
                return BadRequest(new { message = "Error al subir la imagen" });
            }
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
