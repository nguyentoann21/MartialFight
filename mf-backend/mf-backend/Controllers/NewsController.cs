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
    [Route("api/mf/news")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public NewsController(ApplicationDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        // GET: api/mf/news
        [HttpGet]
        public async Task<IActionResult> GetAllNews()
        {
            var allNews = await _context.News.ToListAsync();
            return Ok(allNews);
        }

        // GET: api/mf/news/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetNews(int id)
        {
            var news = await _context.News.FindAsync(id);
            if (news == null)
            {
                return NotFound("News could not be found");
            }
            return Ok(news);
        }

        // POST: api/mf/news
        [HttpPost]
        public async Task<IActionResult> CreateNews([FromForm] NewsActionModel newsModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if(newsModel.NewsTitle == null || newsModel.Description == null || newsModel.ImagePath == null)
            {
                return StatusCode(StatusCodes.Status403Forbidden, "Please fill in all the required fields");
            }

            var news = new News
            {
                NewsTitle = newsModel.NewsTitle,
                Description = newsModel.Description,
                PostAt = DateTime.Now
            };

            if (newsModel.ImagePath != null && newsModel.ImagePath.Count > 0)
            {
                var imageUrls = await SaveImages(newsModel.ImagePath);

                if (imageUrls.Length == 1 && imageUrls[0] == "Invalid")
                {
                    return StatusCode(StatusCodes.Status405MethodNotAllowed, "One or more image formats are invalid. Valid format (png, jpg, gif, or jpeg)");
                }
                if (imageUrls.Length == 1 && imageUrls[0] == "OverSize")
                {
                    return StatusCode(StatusCodes.Status413PayloadTooLarge, "Image(s) size is too large. Image(s) size limit is 24MB");
                }
                news.ImagePath = string.Join(",", imageUrls);
            }


            _context.News.Add(news);
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, news);
        }

        // PUT: api/mf/news/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateNews(int id, [FromForm] NewsActionModel newsModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (newsModel.NewsTitle == null || newsModel.Description == null || newsModel.ImagePath == null)
            {
                return StatusCode(StatusCodes.Status403Forbidden, "Please fill in all the required fields");
            }

            var news = await _context.News.FindAsync(id);
            if (news == null)
            {
                return NotFound();
            }

            bool isChanged = false;

            if (news.NewsTitle != newsModel.NewsTitle)
            {
                news.NewsTitle = newsModel.NewsTitle;
                isChanged = true;
            }

            if (news.Description != newsModel.Description)
            {
                news.Description = newsModel.Description;
                isChanged = true;
            }

            if (newsModel.ImagePath != null && newsModel.ImagePath.Count > 0)
            {
                var imageUrls = await SaveImages(newsModel.ImagePath);

                if (imageUrls.Length == 1 && imageUrls[0] == "Invalid")
                {
                    return StatusCode(StatusCodes.Status405MethodNotAllowed, "One or more image formats are invalid. Valid format (png, jpg, gif, or jpeg)");
                }

                if (imageUrls.Length == 1 && imageUrls[0] == "OverSize")
                {
                    return StatusCode(StatusCodes.Status413PayloadTooLarge, "Image(s) size is too large. Image(s) size limit is 24MB");
                }

                string newImagePaths = string.Join(",", imageUrls);

                if (news.ImagePath != newImagePaths)
                {
                    news.ImagePath = newImagePaths;
                    isChanged = true;
                }
            }

            if (isChanged)
            {
                news.PostAt = DateTime.Now;
                _context.Entry(news).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK);
            }
            else
            {
                return StatusCode(StatusCodes.Status406NotAcceptable, "Nothing to update");
            }
        }


        // DELETE: api/mf/news/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNews(int id)
        {
            var news = await _context.News.FindAsync(id);
            if (news == null)
            {
                return NotFound();
            }

            _context.News.Remove(news);
            await _context.SaveChangesAsync();

            return Ok("Delete successful");
        }

        private async Task<string[]> SaveImages(List<IFormFile> images)
        {
            var imageUrls = new List<string>();
            var imagesDirectory = Path.Combine(_environment.WebRootPath, "Images");
            Directory.CreateDirectory(imagesDirectory);

            var allowedContentTypes = new[] { "image/jpeg", "image/png", "image/gif", "image/jpg" };

            var maxSize = 24 * 1024 * 1024; // 24 megabytes

            long totalFileSize = 0;
            bool isValid = true;
            bool overSize = false;

            foreach (var image in images)
            {
                var contentType = image.ContentType.ToLower();

                if (!allowedContentTypes.Contains(contentType))
                {
                    isValid = false;
                    continue;
                }

                var extension = Path.GetExtension(image.FileName).ToLower();
                var imageFileName = $"{Guid.NewGuid()}{extension}";
                var imagePath = Path.Combine(imagesDirectory, imageFileName);

                using (var stream = new FileStream(imagePath, FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                }

                long fileSizeBytes = new FileInfo(imagePath).Length;
                totalFileSize += fileSizeBytes;

                if (fileSizeBytes > maxSize)
                {
                    overSize = true;
                    System.IO.File.Delete(imagePath); 
                    break;
                }

                imageUrls.Add(imageFileName);
            }

            if (!isValid)
            {
                foreach (var imageUrl in imageUrls)
                {
                    var imagePath = Path.Combine(imagesDirectory, imageUrl);
                    System.IO.File.Delete(imagePath);
                }
                return new string[] { "Invalid" };
            }

            if (overSize || totalFileSize > maxSize)
            {
                foreach (var imageUrl in imageUrls)
                {
                    var imagePath = Path.Combine(imagesDirectory, imageUrl);
                    System.IO.File.Delete(imagePath);
                }
                return new string[] { "OverSize" };
            }

            return imageUrls.ToArray();
        }

    }
}
