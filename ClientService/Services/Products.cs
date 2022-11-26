using EcommEntity.Models;
using ClientService.Interface;

using EcommData.Data;
using Microsoft.EntityFrameworkCore;

namespace ClientService.Services;
public class Products : IProduct<Category>{

    private DataContext dbpost;
    
    public Products(DataContext data){
        this.dbpost = data;
    }
    
    public List<Category> Get(){
        var data = dbpost.Categories.ToList();
        return data;
    }
}
