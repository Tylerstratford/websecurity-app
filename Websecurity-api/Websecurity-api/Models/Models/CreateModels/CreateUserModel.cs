namespace Websecurity_api.Models.Models.CreateModels
{
    public class CreateUserModel
    {
        public CreateUserModel(string id)
        {
            Id = id;
        }

        public CreateUserModel()
        {

        }

        public string Id { get; set; }
    }
}
