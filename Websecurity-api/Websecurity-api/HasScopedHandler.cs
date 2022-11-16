using Microsoft.AspNetCore.Authorization;

namespace Websecurity_api
{
    public class HasScopedHandler : AuthorizationHandler<HasScopedRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, HasScopedRequirement requirement)
        {
            if (!context.User.HasClaim(c => c.Type == "scope" && c.Issuer == requirement.Issuer))
                return Task.CompletedTask;
            //throw new NotImplementedException();

            var scopes = context.User.FindFirst(c => c.Type == "scope" && c.Issuer == requirement.Issuer).Value.Split(' ');

            if (scopes.Any(s => s == requirement.Scope))
                context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}
