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

            var news = new News
            {
                NewsTitle = newsModel.NewsTitle,
                NewsContent = newsModel.NewsContent,
                PostAt = DateTime.Now
            };

            if (newsModel.Images != null && newsModel.Images.Count > 0)
            {
                var imageUrls = await SaveImages(newsModel.Images);
                news.Images = string.Join(",", imageUrls);
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

            var news = await _context.News.FindAsync(id);
            if (news == null)
            {
                return NotFound();
            }

            news.NewsTitle = newsModel.NewsTitle;
            news.NewsContent = newsModel.NewsContent;

            if (newsModel.Images != null && newsModel.Images.Count > 0)
            {
                var imageUrls = await SaveImages(newsModel.Images);
                news.Images = string.Join(",", imageUrls);
            }

            news.PostAt = DateTime.Now;

            _context.Entry(news).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK);
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
            var imageUrls = new string[images.Count];
            var newsImagesDirectory = Path.Combine(_environment.WebRootPath, "News");

            if (!Directory.Exists(newsImagesDirectory))
            {
                Directory.CreateDirectory(newsImagesDirectory);
            }

            for (var i = 0; i < images.Count; i++)
            {
                var imageFile = images[i];
                var imageFileName = $"{Guid.NewGuid()}{Path.GetExtension(imageFile.FileName)}";
                var imagePath = Path.Combine(newsImagesDirectory, imageFileName);

                using (var stream = new FileStream(imagePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(stream);
                }

                imageUrls[i] = Path.Combine("News", imageFileName);
            }

            return imageUrls;
        }
    }
}
