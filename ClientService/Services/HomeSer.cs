using System.Security.Claims;
using ClientService.Interface;
using EcommData.Data;
using EcommEntity.Models;
using Microsoft.EntityFrameworkCore;

namespace ClientService.Services;
public class HomeSer : IHome
{
  private DataContext dbpost;

  public HomeSer(DataContext _dbpost)
  {
    this.dbpost = _dbpost;
  }

  /// <summary>
  /// Get all products
  /// </summary>
  /// <returns>List Products</returns>
  public async Task<List<Home>> GetHome()
  {
    var data = await dbpost.Homes.ToListAsync();
    return data;
  }


  /// <summary>
  /// Create new product
  /// </summary>
  /// <param name="add">Date product</param>
  /// <returns>Product</returns>
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

  /// <summary>
  /// Delete product and imagen
	/// </summary>
	/// <param name="id">Id product</param>
	/// <returns>Delete product</returns>
  public async Task<Home> DeleteProducts(int id)
  {
    string path = @"/home/core/Desktop/BackEnd/EcommProject/ClientApp/public/Products";
    var data = await dbpost.Homes.FindAsync(id);
    dbpost.Homes.Remove(data);
    // Delete image
    var fullPath = Path.Combine(path, data.image);
    try
    {
      if (File.Exists(fullPath))
        File.Delete(fullPath);
    }
    catch (Exception e)
    {
      Console.WriteLine(e.Message);
    }
    await dbpost.SaveChangesAsync();
    return data;
  }

	/// <summary>
	/// Validar token
	/// </summary>
	/// <param name="identity">ClaimsIdentity</param>
	/// <returns>Usuario</returns>
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
