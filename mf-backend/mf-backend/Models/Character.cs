namespace mf_backend.Models
{
    public class Character
    {
        public int CharacterID { get; set; }
        public string CharacterName { get; set; }
        public string CharacterDescription { get; set; }
        public string Image { get; set; }
        public int AccountID { get; set; }
        public int Health { get; set; }
        public int Mana { get; set; }
        public int Attack { get; set; }
        public int Defend { get; set; }
        public int Speed { get; set; }
        public int Intellect { get; set; }

    }
}
