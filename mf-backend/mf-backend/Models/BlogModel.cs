namespace mf_backend.Models
{
    public class BlogModel
    {
        public int BlogID { get; set; }
        public string BlogTitle { get; set; }
        public string BlogContent { get; set; }
        public List<string> Images { get; set; }
        public DateTime PostAt { get; set; }
    }
}
