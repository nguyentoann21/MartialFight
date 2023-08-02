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

            var item = new Item
            {
                ItemName = itemModel.ItemName,
                ItemDescription = itemModel.ItemDescription,
                Gold = itemModel.Gold,
                Diamond = itemModel.Diamond,
                ItemType = itemModel.ItemType,
                Equipped = itemModel.Equipped,
                SectID = itemModel.SectID,
                CategoryID = itemModel.CategoryID,
            };

            if (itemModel.Image != null)
            {
                var imageUrl = await SaveImage(itemModel.Image);
                item.Image = imageUrl;
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

            var item = await _context.Items.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            item.ItemName = itemModel.ItemName;
            item.ItemDescription = itemModel.ItemDescription;
            item.Gold = itemModel.Gold;
            item.Diamond = itemModel.Diamond;
            item.ItemType = itemModel.ItemType;
            item.Equipped = itemModel.Equipped;
            item.SectID = itemModel.SectID;
            item.CategoryID = itemModel.CategoryID;

            if (itemModel.Image != null)
            {
                var imageUrl = await SaveImage(itemModel.Image);
                item.Image = imageUrl;
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

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();

            return Ok("Delete successful");
        }

        private async Task<string> SaveImage(IFormFile image)
        {
            var itemImagesDirectory = Path.Combine(_environment.WebRootPath, "Items");

            if (!Directory.Exists(itemImagesDirectory))
            {
                Directory.CreateDirectory(itemImagesDirectory);
            }

            var imageFileName = $"{Guid.NewGuid()}{Path.GetExtension(image.FileName)}";
            var imagePath = Path.Combine(itemImagesDirectory, imageFileName);

            using (var stream = new FileStream(imagePath, FileMode.Create))
            {
                await image.CopyToAsync(stream);
            }

            return Path.Combine("Items", imageFileName);
        }
    }
}
