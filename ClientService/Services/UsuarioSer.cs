using ClientService.Interface;
using EcommData.Data;
using EcommEntity.Models;
using Microsoft.EntityFrameworkCore;

namespace ClientService.Services;

public class UsuarioSer : IUsuario<Usuario>
{
    private DataContext dbpost;

    public UsuarioSer(DataContext _dbpost)
    {
        this.dbpost = _dbpost;
    }

    public Task<List<Usuario>> GetUsuario()
    {
        var data = dbpost.Usuarios.ToListAsync();
        return data;
    }
}
