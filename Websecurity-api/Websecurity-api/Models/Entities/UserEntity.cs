using System.ComponentModel.DataAnnotations;

namespace Websecurity_api.Models.Entities
{
    public class UserEntity
    {

        [Key]
        public int Id { get; set; }

        [Required]
        public string AppId { get; set; }
        public ICollection<BlogEntity> Blogs { get; set; } = null!;
    }
}
