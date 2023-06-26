namespace mf_backend.Models
{
    public class Account
    {
        public int AccountID { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Avatar { get; set; }
        public string Email { get; set; }
        public string Fullname { get; set; }
        public int Level { get; set; }
        public int Score_PvP { get; set; }
        public int Exp { get; set; }
        public int NumberOfMaps { get; set; }
        public DateTime Created_at { get; set; }
        public DateTime LastLogin { get; set; }
        public string  Status { get; set; }
        public int Role { get; set; }
    }
}
