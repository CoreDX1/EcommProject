namespace ClientService.Domain.Exceptions;
    public class UsuarioArgumentException : Exception
    {
      public UsuarioArgumentException()
        {
        }

        public UsuarioArgumentException(string message) : base(message)
        {
        }

        public UsuarioArgumentException(string message, Exception innerException) : base(message, innerException)
        {
        }

        public UsuarioArgumentException(System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context) : base(info, context)
        {
        }

    }