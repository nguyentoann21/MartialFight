using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using mf_backend.DataAccess;
using mf_backend.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace mf_backend.Controllers
{
    [Route("api/mf/blogs")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public BlogController(ApplicationDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        // GET: api/mf/blogs
        [HttpGet]
        public async Task<IActionResult> GetBlogs()
        {
            var blogs = await _context.Blogs.ToListAsync();
            return Ok(blogs);
        }

        // GET: api/mf/blogs/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBlog(int id)
        {
            var blog = await _context.Blogs.FindAsync(id);
            if (blog == null)
            {
                return NotFound("Blog could not be found");
            }
            return Ok(blog);
        }

        // POST: api/mf/blogs
        [HttpPost]
        public async Task<IActionResult> CreateBlog([FromForm] BlogActionModel blogModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var blog = new Blog
            {
                BlogTitle = blogModel.BlogTitle,
                BlogContent = blogModel.BlogContent,
                PostAt = DateTime.Now
            };

            if (blogModel.Images != null && blogModel.Images.Count > 0)
            {
                var imageUrls = await SaveImages(blogModel.Images);
                blog.Images = string.Join(",", imageUrls);
            }

            _context.Blogs.Add(blog);
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, blog);
        }

        // PUT: api/mf/blogs/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBlog(int id, [FromForm] BlogActionModel blogModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var blog = await _context.Blogs.FindAsync(id);
            if (blog == null)
            {
                return NotFound();
            }

            blog.BlogTitle = blogModel.BlogTitle;
            blog.BlogContent = blogModel.BlogContent;

            if (blogModel.Images != null && blogModel.Images.Count > 0)
            {
                var imageUrls = await SaveImages(blogModel.Images);
                blog.Images = string.Join(",", imageUrls);
            }

            blog.PostAt = DateTime.Now;

            _context.Entry(blog).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK);
        }

        // DELETE: api/mf/blogs/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlog(int id)
        {
            var blog = await _context.Blogs.FindAsync(id);
            if (blog == null)
            {
                return NotFound();
            }

            _context.Blogs.Remove(blog);
            await _context.SaveChangesAsync();

            return Ok("Delete successful");
        }

        private async Task<string[]> SaveImages(List<IFormFile> images)
        {
            var imageUrls = new string[images.Count];
            var blogImagesDirectory = Path.Combine(_environment.WebRootPath, "Blogs");

            if (!Directory.Exists(blogImagesDirectory))
            {
                Directory.CreateDirectory(blogImagesDirectory);
            }

            for (var i = 0; i < images.Count; i++)
            {
                var imageFile = images[i];
                var imageFileName = $"{Guid.NewGuid()}{Path.GetExtension(imageFile.FileName)}";
                var imagePath = Path.Combine(blogImagesDirectory, imageFileName);

                using (var stream = new FileStream(imagePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(stream);
                }

                imageUrls[i] = Path.Combine("Blogs", imageFileName);
            }

            return imageUrls;
        }
    }
}
