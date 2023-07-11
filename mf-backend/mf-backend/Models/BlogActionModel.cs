using System.ComponentModel.DataAnnotations;

namespace mf_backend.Models
{
    public class BlogActionModel
    {
        [Required]
        public string BlogTitle { get; set; }

        [Required]
        public string BlogContent { get; set; }

        public List<IFormFile> Images { get; set; }
    }
}
