namespace mf_backend.Models
{
    public class Blog
    {
        public int BlogID { get; set; }
        public string BlogName { get; set; }
        public string BlogDescription { get; set; }
        public string Image { get; set; }
        public DateTime Post_at { get; set; }
    }
}
