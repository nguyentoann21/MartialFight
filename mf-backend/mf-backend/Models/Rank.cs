namespace mf_backend.Models
{
    public class Rank
    {
        public int RankID { get; set; }
        public string RankName { get; set; }
        public string RankDescription { get; set; }
        public int Score { get; set; }
        public int AccountID { get; set; }
    }
}
