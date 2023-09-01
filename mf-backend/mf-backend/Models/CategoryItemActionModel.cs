namespace mf_backend.Models
{
    public class CategoryItemActionModel
    {

        public string CategoryName { get; set; }

        public string Description { get; set; }

        public IFormFile? ImagePath { get; set; }
    }
}
