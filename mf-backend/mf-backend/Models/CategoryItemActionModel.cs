namespace mf_backend.Models
{
    public class CategoryItemActionModel
    {

        public string CategoryName { get; set; }

        public string CategoryDescription { get; set; }

        public IFormFile? Image { get; set; }
    }
}
