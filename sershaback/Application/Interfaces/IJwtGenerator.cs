using Domain;

namespace Application.Interfaces
{
    public interface IJwtGenerator  
    {
        string CreateToken(AppUser user);
        string CreateToken(User.User user);

    }
}