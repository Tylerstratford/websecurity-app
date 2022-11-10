namespace Websecurity_api.Models.Models.OutputModels
{
    public class BlogPostOutputModel
    {
        public BlogPostOutputModel(string id, string title, string body, DateTime 
             created, string fileName)
        {
            Id = id;
            Title = title;
            Body = body;
            Created = created;
            FileName = fileName;
        }

        public string Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }    
        public DateTime Created { get; set; }
        public string FileName { get; set; }

    }
}
