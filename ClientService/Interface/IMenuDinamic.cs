namespace ClientService.Interface;

public interface IMenuDinamic
{
    public Task<List<Dictionary<string, object>>> GetCategorySubCategory();
}
