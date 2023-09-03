using mf_backend.DataAccess;
using mf_backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace mf_backend.Controllers
{
    [Route("api/mf/items")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public ItemController(ApplicationDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        // GET: api/mf/items
        [HttpGet]
        public async Task<IActionResult> GetItems()
        {
            var items = await _context.Items.ToListAsync();
            return Ok(items);
        }

        // GET: api/mf/items/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetItem(int id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item == null)
            {
                return NotFound("Item could not be found");
            }
            return Ok(item);
        }

        // POST: api/mf/items
        [HttpPost]
        public async Task<IActionResult> CreateItem([FromForm] ItemActionModel itemModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existed = await _context.Items.FirstOrDefaultAsync(c => c.ItemName.ToLower() == itemModel.ItemName.ToLower());

            if (existed != null)
            {
                return StatusCode(StatusCodes.Status409Conflict, "Item Name already exists");
            }

            var item = new Item
            {
                ItemName = itemModel.ItemName,
                Description = itemModel.Description,
                Gold = itemModel.Gold,
                Silver = itemModel.Silver,
                Type = itemModel.Type,
                Equipped = itemModel.Equipped,
                AttackValue = itemModel.AttackValue,
                HealthValue = itemModel.HealthValue,
                DefenseValue = itemModel.DefenseValue,
                SpeedValue = itemModel.SpeedValue,
                IntellectValue = itemModel.IntellectValue,
                PhysicalValue = itemModel.PhysicalValue,
                ManaValue = itemModel.ManaValue,
                SectId = itemModel.SectId,
                CategoryId = itemModel.CategoryId,
            };

            if (itemModel.ImagePath != null)
            {
                var imageUrl = await SaveImage(itemModel.ImagePath);
                if (imageUrl.Equals(string.Empty))
                {
                    return StatusCode(StatusCodes.Status405MethodNotAllowed, "Invalid image format.Valid format (png, jpg, gif or jpeg)");
                }
                item.ImagePath = imageUrl;
            }

            _context.Items.Add(item);
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, item);
        }

        // PUT: api/mf/items/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateItem(int id, [FromForm] ItemActionModel itemModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existed = await _context.Items.FirstOrDefaultAsync(c => c.ItemName.ToLower() == itemModel.ItemName.ToLower() && c.ItemId != id);

            if (existed != null)
            {
                return StatusCode(StatusCodes.Status409Conflict, "Item Name already exists");
            }

            var item = await _context.Items.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            item.ItemName = itemModel.ItemName;
            item.Description = itemModel.Description;
            item.Gold = itemModel.Gold;
            item.Silver = itemModel.Silver;
            item.Type = itemModel.Type;
            item.Equipped = itemModel.Equipped;
            item.AttackValue = itemModel.AttackValue;
            item.HealthValue = itemModel.HealthValue;
            item.DefenseValue = itemModel.DefenseValue;
            item.SpeedValue = itemModel.SpeedValue;
            item.IntellectValue = itemModel.IntellectValue;
            item.PhysicalValue = itemModel.PhysicalValue;
            item.ManaValue = itemModel.ManaValue;
            item.SectId = itemModel.SectId;
            item.CategoryId = itemModel.CategoryId;

            if (itemModel.ImagePath != null)
            {
                var imageUrl = await SaveImage(itemModel.ImagePath);
                if (imageUrl.Equals(string.Empty))
                {
                    return StatusCode(StatusCodes.Status405MethodNotAllowed, "Invalid image format.Valid format (png, jpg, gif or jpeg)");
                }
                item.ImagePath = imageUrl;
            }

            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status202Accepted);
        }

        // DELETE: api/mf/items/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            var isReferencedInMaps = await _context.Maps.AnyAsync(map => map.ItemId == id);

            if (isReferencedInMaps)
            {
                return StatusCode(StatusCodes.Status409Conflict, "This item is referenced in one or more maps and cannot be deleted");
            }

            _context.Items.Remove(item);
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
