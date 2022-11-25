using EcommEntity.Models;
using ClientService.Interface;

using EcommData.Data;

namespace ClientService.Services;
public class Products : IProduct<Category>{

    private DataContext dbpost;
    
    public Products(DataContext data){
        this.dbpost = data;
    }
    
    public async Task<Category> Get(){
        var data = await dbpost.Categories.FindAsync();
        return data;
    }
}
