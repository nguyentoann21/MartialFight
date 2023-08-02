using System.ComponentModel.DataAnnotations.Schema;

namespace mf_backend.Models
{
    public class Player
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public int Level { get; set; }
        public int Score { get; set; }
        public int Challenge { get; set; }
        public string Username { get; set; }
    }
}
