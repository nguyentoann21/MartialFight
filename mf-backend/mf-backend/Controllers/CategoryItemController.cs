using mf_backend.DataAccess;
using mf_backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net.NetworkInformation;

namespace mf_backend.Controllers
{
    [Route("api/mf/categories/")]
    [ApiController]
    public class CategoryItemController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public CategoryItemController(ApplicationDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        // GET: api/mf/categories
        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _context.CategoryItems.ToListAsync();
            return Ok(categories);
        }

        // GET: api/mf/categories/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategory(int id)
        {
            var category = await _context.CategoryItems.FindAsync(id);
            if (category == null)
            {
                return NotFound("Category could not be found");
            }
            return Ok(category);
        }

        // POST: api/mf/categories
        [HttpPost]
        public async Task<IActionResult> CreateCategory([FromForm] CategoryItemActionModel categoryModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existed = await _context.CategoryItems.FirstOrDefaultAsync(c => c.CategoryName.ToLower() == categoryModel.CategoryName.ToLower());

            if (existed != null) 
            {
                return StatusCode(StatusCodes.Status409Conflict, "Category Name already exists");
            }

            var category = new CategoryItem
            {
                CategoryName = categoryModel.CategoryName,
                Description = categoryModel.Description,
            };

            if (categoryModel.ImagePath != null)
            {
                var imageUrl = await SaveImage(categoryModel.ImagePath);
                if (imageUrl.Equals(string.Empty))
                {
                    return StatusCode(StatusCodes.Status405MethodNotAllowed, "Invalid image format.Valid format (png, jpg, gif or jpeg)");
                }
                category.ImagePath = imageUrl;
            }

            _context.CategoryItems.Add(category);
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, category);
        }

        // PUT: api/mf/categories/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(int id, [FromForm] CategoryItemActionModel categoryModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existed = await _context.CategoryItems.FirstOrDefaultAsync(c => c.CategoryName.ToLower() == categoryModel.CategoryName.ToLower() && c.CategoryId != id);

            if (existed != null)
            {
                return StatusCode(StatusCodes.Status409Conflict, "Category Name already exists");
            }

            var category = await _context.CategoryItems.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            category.CategoryName = categoryModel.CategoryName;
            category.Description = categoryModel.Description;

            if (categoryModel.ImagePath != null)
            {
                var imageUrl = await SaveImage(categoryModel.ImagePath);
                if(imageUrl.Equals(string.Empty))
                {
                    return StatusCode(StatusCodes.Status405MethodNotAllowed, "Invalid image format.Valid format (png, jpg, gif or jpeg)");
                }
                category.ImagePath = imageUrl;
            }

            _context.Entry(category).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status202Accepted);
        }


        // DELETE: api/mf/categories/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await _context.CategoryItems.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            bool isReferenced = await _context.Items.AnyAsync(item => item.CategoryId == id);

            if (isReferenced)
            {
                return StatusCode(StatusCodes.Status409Conflict, "Cannot delete the category because it is referenced by items");
            }

            _context.CategoryItems.Remove(category);
            await _context.SaveChangesAsync();

            return Ok("Delete successful");
        }

        private async Task<string> SaveImage(IFormFile image)
        {
            var imagesDirectory = Path.Combine(_environment.WebRootPath, "Images");
            Directory.CreateDirectory(imagesDirectory);

            var allowedContentTypes = new[] { "image/jpeg", "image/png", "image/gif", "image/jpg" };
            var contentType = image.ContentType.ToLower();

            if (!allowedContentTypes.Contains(contentType))
            {
                return string.Empty;
            }

            var extension = Path.GetExtension(image.FileName).ToLower();
            var imageFileName = $"{Guid.NewGuid()}{extension}";
            var imagePath = Path.Combine(imagesDirectory, imageFileName);

            using (var stream = new FileStream(imagePath, FileMode.Create))
                await image.CopyToAsync(stream);

            return imageFileName;
        }
    }
}
