using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Websecurity_api.Models.Entities
{
    public class BlogEntity
    {

        public BlogEntity()
        {

        }
        public BlogEntity(string appId, string userName, UserEntity user, string title, string body, string created, string? fileName)
        {
            AppId = appId;
            UserName = userName;
            User = user;
            Title = title;
            Body = body;
            Created = created;
            FileName = fileName;
            //File = file;
        }

        [Key]
        public int Id { get; set; }

        [Required]
        public string AppId { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        public UserEntity User { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(70)")]
        public string Title { get; set; } = null!;

        [Required]
        [Column(TypeName = "nvarchar(150)")]
        public string Body { get; set; } = null!;

        [Required]
        public string Created { get; set; }

        public string? FileName { get; set; }

        //[NotMapped]
        //[Display(Name = "Upload File")]
        //public IFormFile? File { get; set; }



    }
}
