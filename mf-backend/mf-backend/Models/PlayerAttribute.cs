using System.ComponentModel.DataAnnotations.Schema;

namespace mf_backend.Models
{
    public class PlayerAttribute
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PlayerAttributeID { get; set; }
        public string PlayerName { get; set; }
        public int Silver { get; set; }
        public int Gold { get; set; }
        public int Level { get; set; }
        public int SkillMainCount { get; set; }
        public int Exp { get; set; }
        public int ScorePvP { get; set; }
        public int NumberOfMaps { get; set; }
        public int AttackValue { get; set; }
        public int DefenseValue { get; set; }
        public int SpeedValue { get; set; }
        public int IntellectValue { get; set; }
        public int PhysicalValue { get; set; }
        public int LevelSkill0 { get; set; }
        public int LevelSkill1 { get; set; }
        public int LevelSkill2 { get; set; }
        public int LevelSkill3 { get; set; }
        public int LevelSkill4 { get; set; }
        public int SettingSoundValue { get; set; }
        public int SettingBrightnessValue { get; set; }
        public int CharacterID { get; set; }
        public int AccountID { get; set; }
    }
}
