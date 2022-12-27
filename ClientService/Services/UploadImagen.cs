using System.Net.Http.Headers;
using ClientService.Interface;

namespace ClientService.Services;
public class UploadImagen : IUploadImagen
{
    public bool PostImagen(IFormFile imagen)
    {
        string path = @"/home/core/Desktop/BackEnd/EcommProject/ClientApp/public/Products";
        var pathToSave = Path.Combine(path);
        if (imagen.Length > 0)
        {
            string fileName = ContentDispositionHeaderValue.
                Parse(imagen.ContentDisposition).
                FileName.Trim('"');
            string fullPath = Path.Combine(pathToSave, fileName);
            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                imagen.CopyTo(stream);
            }
            return true;
        };
        return false;
    }
}
