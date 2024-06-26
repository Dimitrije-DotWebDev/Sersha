using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    public class UserAccessor:IUserAccessor
    {
        private readonly IHttpContextAccessor _httpContextAccessor;


        public UserAccessor(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;

        }


        public string GetCurrentUserName()
        {
            //throw new System.NotFiniteNumberException();
            var username = _httpContextAccessor.HttpContext.User?.Claims?.FirstOrDefault(x=> x.Type == ClaimTypes.NameIdentifier)?.Value;
            return username;
        }
    }
}