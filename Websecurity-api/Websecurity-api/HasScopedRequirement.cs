using Microsoft.AspNetCore.Authorization;

namespace Websecurity_api
{
    public class HasScopedRequirement : IAuthorizationRequirement
    {
        public string Issuer { get; }
        public string Scope { get; }

        public HasScopedRequirement(string scope, string issuer)
        {
            scope = scope ?? throw new ArgumentNullException(nameof(scope));
            Issuer = issuer ?? throw new ArgumentNullException(nameof(issuer));
        }
    }
}
