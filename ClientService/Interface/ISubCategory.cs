using EcommEntity.Models;

namespace ClientService.Interface;
public interface ISubCategory<T>
{
    public Task<List<SubCategory>> GetSubCategory();
    public Task<SubCategory> Insert(SubCategory form);
}
