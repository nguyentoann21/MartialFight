using mf_backend.DataAccess;
using mf_backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

            var category = new CategoryItem
            {
                CategoryName = categoryModel.CategoryName,
                CategoryDescription = categoryModel.CategoryDescription,
            };

            if (categoryModel.Image != null)
            {
                var imageUrl = await SaveImage(categoryModel.Image);
                category.Image = imageUrl;
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

            var category = await _context.CategoryItems.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            category.CategoryName = categoryModel.CategoryName;
            category.CategoryDescription = categoryModel.CategoryDescription;

            if (categoryModel.Image != null)
            {
                var imageUrl = await SaveImage(categoryModel.Image);
                category.Image = imageUrl;
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

            bool isReferenced = await _context.Items.AnyAsync(item => item.CategoryID == id);

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
            var categoryImagesDirectory = Path.Combine(_environment.WebRootPath, "CategoryItems");
            if (!Directory.Exists(categoryImagesDirectory))
            {
                Directory.CreateDirectory(categoryImagesDirectory);
            }
            var imageFileName = $"{Guid.NewGuid()}{Path.GetExtension(image.FileName)}";
            var imagePath = Path.Combine(categoryImagesDirectory, imageFileName);

            using (var stream = new FileStream(imagePath, FileMode.Create))
            {
                await image.CopyToAsync(stream);
            }
            return Path.Combine("CategoryItems", imageFileName);
        }
    }
}
