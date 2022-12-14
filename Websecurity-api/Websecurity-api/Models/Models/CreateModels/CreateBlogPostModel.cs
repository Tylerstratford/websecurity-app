namespace Websecurity_api.Models
{
    public class CreateBlogPostModel
    {
        private string title;
        private string body;
        private string appId;
        private string userName;


        public string AppId { get { return appId; } set {appId = value; } }
    
        public string Title {
            get { return title; }
            set { title = value; }
        }
        public string Body { 
            get { return body; }
            set { body = value; }
        }

        public string UserName { get { return userName; } set { userName = value; } }

        public IFormFile? File { get; set; } = null!;


    }
}
