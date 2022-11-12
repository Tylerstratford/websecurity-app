using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Websecurity_api.Models;

namespace Websecurity_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileUploadController : ControllerBase
    {

        private BlobServiceClient serviceClient;
        private BlobContainerClient containerClient;
        private BlobClient blobClient;


        public FileUploadController(IConfiguration configuration)
        {
            serviceClient = new BlobServiceClient(configuration.GetConnectionString("StorageAccount"));
            try
            {
                containerClient = serviceClient.CreateBlobContainer("images");
                containerClient.SetAccessPolicy(Azure.Storage.Blobs.Models.PublicAccessType.BlobContainer);
            }
            catch
            {
                containerClient = serviceClient.GetBlobContainerClient("images");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Upload([FromForm] CreateBlogPostModel model)
        {
            try
            {
                using var file = model.File.OpenReadStream();
                blobClient = containerClient.GetBlobClient($"IMG_{Guid.NewGuid()}{Path.GetExtension(model.File.FileName)}");
                await blobClient.UploadAsync(file);

                return new OkObjectResult(blobClient.Uri.AbsoluteUri);
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
        }
    }
}
