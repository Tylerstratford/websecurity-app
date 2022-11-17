using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Websecurity_api.Data;
using Websecurity_api.Models;
using Websecurity_api.Models.Entities;

namespace Websecurity_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private string[] _tagsAllowed = new string[] { "<b>", "</b>", "<i>", "</i>" };

        private BlobServiceClient serviceClient;
        private BlobContainerClient containerClient;
        private BlobClient blobClient = null!;



        public BlogController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;


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

        // GET: api/Blog
        [HttpGet]

        public async Task<ActionResult<IEnumerable<BlogEntity>>> GetBlogs()
        {
            List<BlogEntity> Blogs = await _context.Blogs.ToListAsync();

            foreach (var blog in Blogs)
            {
                blog.Title = HttpUtility.HtmlEncode(blog.Title);
                blog.Body = HttpUtility.HtmlEncode(blog.Body);
            }

            foreach (var tag in _tagsAllowed)
            {
                var encodedTag = HttpUtility.HtmlEncode(tag);
                foreach (var blog in Blogs)
                {
                    blog.Title = blog.Title.Replace(encodedTag, tag);
                    blog.Body = blog.Body.Replace(encodedTag, tag);
                }
            }

            return Blogs;
        }

        // GET: api/Blog/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BlogEntity>> GetBlogEntity(int id)
        {
            var blogEntity = await _context.Blogs.FindAsync(id);

            if (blogEntity == null)
            {
                return NotFound();
            }

            return blogEntity;
        }

        // PUT: api/Blog/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBlogEntity(int id, BlogEntity blogEntity)
        {
            if (id != blogEntity.Id)
            {
                return BadRequest();
            }

            _context.Entry(blogEntity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BlogEntityExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        [Authorize]

        public async Task<ActionResult<CreateBlogPostModel>>PostBlogEntity([FromForm]CreateBlogPostModel model)
        {

            var _user = await _context.Users.Where(x => x.AppId == model.AppId).FirstOrDefaultAsync();

            string encodedTitle = HttpUtility.HtmlEncode(model.Title);
            string encodedBody = HttpUtility.HtmlEncode(model.Body);

            foreach(var tag in _tagsAllowed)
            {
                var encodedTag = HttpUtility.HtmlEncode(tag);
                encodedBody = encodedBody.Replace(encodedTag,tag);
                encodedTitle = encodedTitle.Replace(encodedTag,tag);
            }

            var imageFile = "";

            if(model.File != null)
            {
                using var file = model.File.OpenReadStream();
                blobClient = containerClient.GetBlobClient($"IMG_{Guid.NewGuid()}{Path.GetExtension(model.File.FileName)}");
                var response = await blobClient.UploadAsync(file);

                imageFile = blobClient.Uri.AbsoluteUri.ToString();
            } else
            {
                imageFile = "";
            }

            var fileExtension = Path.GetExtension(imageFile);


            if (fileExtension == ".jpg" || fileExtension == ".jpeg" || fileExtension == ".png" || fileExtension == "")
            {

                if (_user == null)
                {

                    var _blogPostEntity = new BlogEntity()
                    {
                        AppId = model.AppId,
                        UserName = model.UserName,
                        User = new UserEntity()
                        {
                            AppId = model.AppId,
                        },
                        Title = encodedTitle,
                        Body = encodedBody,
                        Created = DateTime.Now.ToString(),
                        FileName = imageFile,
                    };
                    _context.Blogs.Add(_blogPostEntity);
                    await _context.SaveChangesAsync();

                    return CreatedAtAction("GetBlogEntity", new { id = _blogPostEntity.Id }, _blogPostEntity);
                }

                var blogPostEntity = new BlogEntity(
                    model.AppId,
                    model.UserName,
                    _user,
                    encodedTitle,
                    encodedBody,
                    DateTime.Now.ToString(),
                    imageFile
                    );

                _context.Blogs.Add(blogPostEntity);

                await _context.SaveChangesAsync();


                return CreatedAtAction("GetBlogEntity", new { id = blogPostEntity.Id }, blogPostEntity);
            } else
            {
                return BadRequest("File must be jpg or png");
            }


        }

        // DELETE: api/Blog/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlogEntity(int id)
        {
            var blogEntity = await _context.Blogs.FindAsync(id);
            if (blogEntity == null)
            {
                return NotFound();
            }

            _context.Blogs.Remove(blogEntity);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BlogEntityExists(int id)
        {
            return _context.Blogs.Any(e => e.Id == id);
        }
    }
}



