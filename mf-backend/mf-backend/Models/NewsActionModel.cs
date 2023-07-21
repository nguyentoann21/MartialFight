using System.ComponentModel.DataAnnotations;

namespace mf_backend.Models
{
    public class NewsActionModel
    {
        [Required]
        public string NewsTitle { get; set; }

        [Required]
        public string NewsContent { get; set; }

        public List<IFormFile> Images { get; set; }
    }
}
