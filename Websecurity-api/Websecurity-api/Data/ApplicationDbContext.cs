
using Microsoft.EntityFrameworkCore;
using Websecurity_api.Models.Entities;

namespace Websecurity_api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext()
        {

        }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext>options
            ): base(options)
        {

        }

        public DbSet<BlogEntity> Blogs
            { get; set; }

        public DbSet<UserEntity> Users { get; set; }
    }


}
