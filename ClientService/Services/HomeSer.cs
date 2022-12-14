using System.Security.Claims;
using ClientService.Interface;
using EcommData.Data;
using EcommEntity.Models;
using Microsoft.EntityFrameworkCore;

namespace ClientService.Services;
public class HomeSer : IHome<Home>
{
    private DataContext dbpost;

    public HomeSer(DataContext _dbpost)
    {
        this.dbpost = _dbpost;
    }

    public async Task<List<Home>> GetHome()
    {
        var data = await dbpost.Homes.ToListAsync();
        return data;
    }

    public async Task<Home> InsertProducts(CreateProduct add)
    {
        Home data = new Home()
        {
            title = add.title,
            image = add.image,
            price = add.price
        };
        await dbpost.Homes.AddAsync(data);
        await dbpost.SaveChangesAsync();
        return data;
    }

    public async Task<Home> DeleteProducts(int id)
    {
        var data = await dbpost.Homes.FindAsync(id);
        dbpost.Homes.Remove(data);
        await dbpost.SaveChangesAsync();
        return data;
    }

    public async Task<dynamic> ValidarToken(ClaimsIdentity identity)
    {
        try
        {
            if (identity.Claims.Count() == 0)
            {
                return new
                {
                    success = false,
                    message = "Verificar si esta enviando un toke valido",
                    result = ""
                };
            }
            var id = identity.Claims.FirstOrDefault(x => x.Type == "id").Value;
            Usuario usuario = await dbpost.Usuarios.FirstOrDefaultAsync(x => x.id_user.ToString() == id);
            return new
            {
                success = true,
                message = "Token valido",
                result = usuario
            };
        }
        catch (Exception e)
        {
            return new
            {
                success = false,
                message = "Chat: " + e.Message,
                result = ""
            };
        }
    }
}
