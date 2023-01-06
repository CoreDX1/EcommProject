using EcommEntity.Models;

namespace ClientService.Interface;

public interface IMenuDinamic
{
    public Task<List<Menu>> GetCategorySubCategory();
}
