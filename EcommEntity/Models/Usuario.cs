namespace EcommEntity.Models;

public class Usuario
{
    public int id_user {get; set;}
    public string name { get; set; } = string.Empty;
    public string password { get; set; } = string.Empty;
    public string rol { get; set; } = string.Empty;
}

public class Register{
    public string name { get; set; } = string.Empty;
    public string password { get; set; } = string.Empty;
    public string rol { get; set; } = string.Empty;
}

public class LoginUser{
    public string name { get; set; } = string.Empty;
    public string password { get; set; } = string.Empty;
}
