using ClientService.Domain.Exceptions;
using EcommEntity.Models;

namespace ClientService.Domain.Validators;

public static class UsuarioRequestValidator
{
  public static void Validate(Register employee)
  {
    if(employee == null){
      throw new UsuarioArgumentException($"{nameof(employee)} is null");
    }
    else if(employee.username.Length < 4 && employee.username.Length > 20){
      throw new UsuarioArgumentException($"{nameof(employee.username)} Tiene que tener entre 4 y 20 caracteres");
    }
    else if(employee.password.Length < 4 && employee.password.Length > 20){
      throw new UsuarioArgumentException($"{nameof(employee.password)} is Null/Empty/WhiteSpace");
    }
    else if(string.IsNullOrWhiteSpace(employee.username)){
      throw new UsuarioArgumentException($"{nameof(employee.username)} is Null/Empty/WhiteSpace");
    }
    else if(string.IsNullOrWhiteSpace(employee.password)){
      throw new UsuarioArgumentException($"{nameof(employee.password)} is Null/Empty/WhiteSpace");
    }
  }
}
