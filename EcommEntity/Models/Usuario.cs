namespace EcommEntity.Models;

public class Usuario
{
    public int id_user {get; set;}
    public string username { get; set; } = string.Empty;
    public string password { get; set; } = string.Empty;
    public string email { get; set; } = string.Empty;
    public string rol { get; set; } = string.Empty;
}

public class Register{
    public string username { get; set; } = string.Empty;
    public string email { get; set; } = string.Empty;
    public string password { get; set; } = string.Empty;
    public string rol { get; set; } = "cliente";
}

public class LoginUser{
    public string email { get; set; } = string.Empty;
    public string password { get; set; } = string.Empty;
}
