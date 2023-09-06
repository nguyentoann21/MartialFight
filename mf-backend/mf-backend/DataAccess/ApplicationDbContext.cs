using mf_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace mf_backend.DataAccess
{
    public class ApplicationDbContext : DbContext
    {
        //private static readonly string SQL_CONNECTION = "Server=(local);uid=sa;pwd=123456;Database=MF_V35;Trusted_Connection=true;Encrypt=false";

        private static readonly string SQL_CONNECTION = "Data Source=database-martarilfight.cbmr4jk2hmdz.ap-southeast-1.rds.amazonaws.com,1433;Initial Catalog= DB_Server_MartarilFight;User ID=admin;Password=admin123456;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False";
        public ApplicationDbContext() { }

        public DbSet<Account> Accounts { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<Sect> Sects { get; set; }
        public DbSet<Map> Maps { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<Character> Characters { get; set; }
        public DbSet<PlayerAttribute> PlayerAttributes { get; set; }
        public DbSet<CategoryItem> CategoryItems { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<CharacterSkill> CharacterSkills { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
            optionsBuilder.UseSqlServer(SQL_CONNECTION);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>().HasKey(a => a.AccountId);
            modelBuilder.Entity<News>().HasKey(a => a.NewsId);
            modelBuilder.Entity<Sect>().HasKey(a => a.SectId);
            modelBuilder.Entity<Map>().HasKey(a => a.MapId);
            modelBuilder.Entity<Skill>().HasKey(a => a.SkillId);
            modelBuilder.Entity<Character>().HasKey(a => a.CharacterId);
            modelBuilder.Entity<CategoryItem>().HasKey(a => a.CategoryId);
            modelBuilder.Entity<Item>().HasKey(a => a.ItemId);
            modelBuilder.Entity<PlayerAttribute>().HasKey(a => a.PlayerAttributeId);
            modelBuilder.Entity<CharacterSkill>().HasKey(a => a.CharacterSkillId);

            modelBuilder.Entity<Character>()
                .HasOne(c => c.Sect)
                .WithMany(s => s.Characters)
                .HasForeignKey(c => c.SectId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Item>()
                .HasOne(i => i.Sect)
                .WithMany()
                .HasForeignKey(i => i.SectId)
                .OnDelete(DeleteBehavior.Restrict); 

            modelBuilder.Entity<Item>()
                .HasOne(i => i.Category)
                .WithMany()
                .HasForeignKey(i => i.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Map>()
                .HasOne(i => i.Item)
                .WithMany()
                .HasForeignKey(i => i.ItemId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<CharacterSkill>()
                .HasOne(cs => cs.Skill)
                .WithMany()
                .HasForeignKey(cs => cs.SkillId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<CharacterSkill>()
                .HasOne(cs => cs.Character)
                .WithMany()
                .HasForeignKey(cs => cs.CharacterId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Account>().HasData(
                new Account
                {
                    //12345@6
                    AccountId = 1,
                    Username = "mf_admin",
                    Password = "$2a$11$Zq2mQ3no7qbNtEV8lX76EOuB3T91sdYjVlFAPPSurjD.1UoKuzsqq",
                    Avatar = "player.jpg",
                    Email = "toannvce150811@fpt.edu.vn",
                    Fullname = "Administrator",
                    Gender = "male",
                    Role = 1
                },
                new Account
                {
                    AccountId = 2,
                    Username = "mf_player1",
                    Password = "$2a$11$xbwxiTTmueuiy4HF2i9kR.O8GkzWH64SyZdkTB6n0tuf87UCtgLb6",
                    Avatar = "player.jpg",
                    Email = "mplkingofworld@gmail.com",
                    Fullname = "Nguyen Van Toan",
                    Gender = "female"
                },
                new Account
                {
                    AccountId = 3,
                    Username = "mf_player2",
                    Password = "$2a$11$xbwxiTTmueuiy4HF2i9kR.O8GkzWH64SyZdkTB6n0tuf87UCtgLb6",
                    Avatar = "player.jpg",
                    Email = "nguyenvantoan.1@gmail.com",
                    Fullname = "Nguyen Van A",
                    Gender = "male"
                },
                new Account
                {
                    AccountId = 4,
                    Username = "mf_player3",
                    Password = "$2a$11$xbwxiTTmueuiy4HF2i9kR.O8GkzWH64SyZdkTB6n0tuf87UCtgLb6",
                    Avatar = "player.jpg",
                    Email = "nguyenvantoan.2@gmail.com",
                    Fullname = "Nguyen Van B",
                    Gender = "male"
                },
                new Account
                {
                    //123456@
                    AccountId = 5,
                    Username = "mf_player4",
                    Password = "$2a$11$xbwxiTTmueuiy4HF2i9kR.O8GkzWH64SyZdkTB6n0tuf87UCtgLb6",
                    Avatar = "player.jpg",
                    Email = "nguyenvantoan.3@gmail.com",
                    Fullname = "Nguyen Van C",
                    Gender = "male"
                },
                new Account
                {
                    AccountId = 6,
                    Username = "mf_player5",
                    Password = "$2a$11$xbwxiTTmueuiy4HF2i9kR.O8GkzWH64SyZdkTB6n0tuf87UCtgLb6",
                    Avatar = "player.jpg",
                    Email = "nguyenvantoan.4@gmail.com",
                    Fullname = "Tran A",
                    Gender = "female"
                },
                new Account
                {
                    AccountId = 7,
                    Username = "mf_player6",
                    Password = "$2a$11$xbwxiTTmueuiy4HF2i9kR.O8GkzWH64SyZdkTB6n0tuf87UCtgLb6",
                    Avatar = "player.jpg",
                    Email = "nguyenvantoan.5@gmail.com",
                    Fullname = "Tran B",
                    Gender = "female"
                },
                new Account
                {
                    AccountId = 8,
                    Username = "mf_player7",
                    Password = "$2a$11$xbwxiTTmueuiy4HF2i9kR.O8GkzWH64SyZdkTB6n0tuf87UCtgLb6",
                    Avatar = "player.jpg",
                    Email = "nguyenvantoan.6@gmail.com",
                    Fullname = "Tran C",
                    Gender = "female"
                },
                new Account
                {
                    AccountId = 9,
                    Username = "mf_player8",
                    Password = "$2a$11$xbwxiTTmueuiy4HF2i9kR.O8GkzWH64SyZdkTB6n0tuf87UCtgLb6",
                    Avatar = "player.jpg",
                    Email = "nguyenvantoan.7@gmail.com",
                    Fullname = "Tran D",
                    Gender = "female"
                },
                new Account
                {
                    AccountId = 10,
                    Username = "mf_player9",
                    Password = "$2a$11$xbwxiTTmueuiy4HF2i9kR.O8GkzWH64SyZdkTB6n0tuf87UCtgLb6",
                    Avatar = "player.jpg",
                    Email = "nguyenvantoan.8@gmail.com",
                    Fullname = "Tran Bi",
                    Gender = "male"
                },
                new Account
                {
                    AccountId = 11,
                    Username = "mf_player10",
                    Password = "$2a$11$xbwxiTTmueuiy4HF2i9kR.O8GkzWH64SyZdkTB6n0tuf87UCtgLb6",
                    Avatar = "player.jpg",
                    Email = "nguyenvantoan.9@gmail.com",
                    Fullname = "Tran Bi",
                    Gender = "male"
                },
                new Account
                {
                    AccountId = 12,
                    Username = "mf_player11",
                    Password = "$2a$11$xbwxiTTmueuiy4HF2i9kR.O8GkzWH64SyZdkTB6n0tuf87UCtgLb6",
                    Avatar = "player.jpg",
                    Email = "mplkingofworld.10@gmail.com",
                    Fullname = "Nguyen Van Anh",
                    Gender = "female"
                },
                new Account
                {
                    AccountId = 13,
                    Username = "mf_player12",
                    Password = "$2a$11$xbwxiTTmueuiy4HF2i9kR.O8GkzWH64SyZdkTB6n0tuf87UCtgLb6",
                    Avatar = "player.jpg",
                    Email = "nguyenvantoan.11@gmail.com",
                    Fullname = "Nguyen A",
                    Gender = "male"
                },
                new Account
                {
                    AccountId = 14,
                    Username = "mf_player13",
                    Password = "$2a$11$xbwxiTTmueuiy4HF2i9kR.O8GkzWH64SyZdkTB6n0tuf87UCtgLb6",
                    Avatar = "player.jpg",
                    Email = "nguyenvantoan.12@gmail.com",
                    Fullname = "Nguyen B",
                    Gender = "male"
                },
                new Account
                {
                    AccountId = 15,
                    Username = "mf_player14",
                    Password = "$2a$11$xbwxiTTmueuiy4HF2i9kR.O8GkzWH64SyZdkTB6n0tuf87UCtgLb6",
                    Avatar = "player.jpg",
                    Email = "nguyenvantoan.13@gmail.com",
                    Fullname = "Nguyen C",
                    Gender = "male"
                },
                new Account
                {
                    AccountId = 16,
                    Username = "mf_player15",
                    Password = "$2a$11$xbwxiTTmueuiy4HF2i9kR.O8GkzWH64SyZdkTB6n0tuf87UCtgLb6",
                    Avatar = "player.jpg",
                    Email = "nguyenvantoan.14@gmail.com",
                    Fullname = "Tran Anh",
                    Gender = "female"
                },
                new Account
                {
                    AccountId = 17,
                    Username = "mf_player16",
                    Password = "$2a$11$xbwxiTTmueuiy4HF2i9kR.O8GkzWH64SyZdkTB6n0tuf87UCtgLb6",
                    Avatar = "player.jpg",
                    Email = "nguyenvantoan.15@gmail.com",
                    Fullname = "Tran Bach",
                    Gender = "female"
                },
                new Account
                {
                    AccountId = 18,
                    Username = "mf_player17",
                    Password = "$2a$11$xbwxiTTmueuiy4HF2i9kR.O8GkzWH64SyZdkTB6n0tuf87UCtgLb6",
                    Avatar = "player.jpg",
                    Email = "nguyenvantoan.16@gmail.com",
                    Fullname = "Tran Ca",
                    Gender = "female"
                },
                new Account
                {
                    AccountId = 19,
                    Username = "mf_player18",
                    Password = "$2a$11$xbwxiTTmueuiy4HF2i9kR.O8GkzWH64SyZdkTB6n0tuf87UCtgLb6",
                    Avatar = "player.jpg",
                    Email = "nguyenvantoan.17@gmail.com",
                    Fullname = "Tran Dy",
                    Gender = "female"
                },
                new Account
                {
                    AccountId = 20,
                    Username = "mf_player19",
                    Password = "$2a$11$xbwxiTTmueuiy4HF2i9kR.O8GkzWH64SyZdkTB6n0tuf87UCtgLb6",
                    Avatar = "player.jpg",
                    Email = "nguyenvantoan.18@gmail.com",
                    Fullname = "Tran Binh",
                    Gender = "male"
                },
                new Account
                {
                    AccountId = 21,
                    Username = "mf_player20",
                    Password = "$2a$11$xbwxiTTmueuiy4HF2i9kR.O8GkzWH64SyZdkTB6n0tuf87UCtgLb6",
                    Avatar = "player.jpg",
                    Email = "nguyenvantoan.19@gmail.com",
                    Fullname = "Tran Bieu",
                    Gender = "male"
                },
                new Account
                {
                    AccountId = 22,
                    Username = "mf_player21",
                    Password = "$2a$11$xbwxiTTmueuiy4HF2i9kR.O8GkzWH64SyZdkTB6n0tuf87UCtgLb6",
                    Avatar = "player.jpg",
                    Email = "mplkingofworld.20@gmail.com",
                    Fullname = "Nguyen Van Hao",
                    Gender = "female"
                },
                new Account
                {
                    AccountId = 23,
                    Username = "mf_player22",
                    Password = "$2a$11$xbwxiTTmueuiy4HF2i9kR.O8GkzWH64SyZdkTB6n0tuf87UCtgLb6",
                    Avatar = "player.jpg",
                    Email = "nguyenvantoan.21@gmail.com",
                    Fullname = "Nguyen An",
                    Gender = "male"
                },
                new Account
                {
                    AccountId = 24,
                    Username = "mf_player23",
                    Password = "$2a$11$xbwxiTTmueuiy4HF2i9kR.O8GkzWH64SyZdkTB6n0tuf87UCtgLb6",
                    Avatar = "player.jpg",
                    Email = "nguyenvantoan.22@gmail.com",
                    Fullname = "Nguyen Bao",
                    Gender = "male"
                },
                new Account
                {
                    AccountId = 25,
                    Username = "mf_player24",
                    Password = "$2a$11$xbwxiTTmueuiy4HF2i9kR.O8GkzWH64SyZdkTB6n0tuf87UCtgLb6",
                    Avatar = "player.jpg",
                    Email = "nguyenvantoan.23@gmail.com",
                    Fullname = "Nguyen Canh",
                    Gender = "male"
                },
                new Account
                {
                    AccountId = 26,
                    Username = "mf_player25",
                    Password = "$2a$11$xbwxiTTmueuiy4HF2i9kR.O8GkzWH64SyZdkTB6n0tuf87UCtgLb6",
                    Avatar = "player.jpg",
                    Email = "nguyenvantoan.24@gmail.com",
                    Fullname = "Tran Anh Vy",
                    Gender = "female"
                },
                new Account
                {
                    AccountId = 27,
                    Username = "mf_player26",
                    Password = "$2a$11$xbwxiTTmueuiy4HF2i9kR.O8GkzWH64SyZdkTB6n0tuf87UCtgLb6",
                    Avatar = "player.jpg",
                    Email = "nguyenvantoan.25@gmail.com",
                    Fullname = "Tran Van My Bich",
                    Gender = "female"
                },
                new Account
                {
                    AccountId = 28,
                    Username = "mf_player27",
                    Password = "$2a$11$xbwxiTTmueuiy4HF2i9kR.O8GkzWH64SyZdkTB6n0tuf87UCtgLb6",
                    Avatar = "player.jpg",
                    Email = "nguyenvantoan.26@gmail.com",
                    Fullname = "Tran Cao",
                    Gender = "female"
                },
                new Account
                {
                    AccountId = 29,
                    Username = "mf_player28",
                    Password = "$2a$11$xbwxiTTmueuiy4HF2i9kR.O8GkzWH64SyZdkTB6n0tuf87UCtgLb6",
                    Avatar = "player.jpg",
                    Email = "nguyenvantoan.27@gmail.com",
                    Fullname = "Tran Ai Vy",
                    Gender = "female"
                },
                new Account
                {
                    AccountId = 30,
                    Username = "mf_player29",
                    Password = "$2a$11$xbwxiTTmueuiy4HF2i9kR.O8GkzWH64SyZdkTB6n0tuf87UCtgLb6",
                    Avatar = "player.jpg",
                    Email = "nguyenvantoan.28@gmail.com",
                    Fullname = "Tran Binh An",
                    Gender = "male"
                },
                new Account
                {
                    AccountId = 31,
                    Username = "mf_player30",
                    Password = "$2a$11$xbwxiTTmueuiy4HF2i9kR.O8GkzWH64SyZdkTB6n0tuf87UCtgLb6",
                    Avatar = "player.jpg",
                    Email = "nguyenvantoan.39@gmail.com",
                    Fullname = "Tran Van Binh",
                    Gender = "male"
                }

                );
            //sect data
            modelBuilder.Entity<Sect>().HasData(
                new Sect { SectId = 1, SectName = "Beggars", Description = "The Beggars' Sect, founded by Zhang Sanfeng (also known as Zhang Chunren), originates from the novel by Jin Yong (Louis Cha) called The Smiling, Proud Wanderer. In the story, Zhang Sanfeng, as a young boy, worked as a servant in a Shaolin temple. Through a fortuitous encounter, he discovered and practiced a portion of the supreme martial arts skill called the Nine Yang Divine Skill - one of the highest martial arts techniques of that time. Due to his exceptional talent in martial arts, Zhang Sanfeng created a new martial arts style called the Nine Yang Divine Skill of the Beggars' Sect and established the Beggars' Sect. The Beggars' Sect focuses on the operation of the Tai Chi principle, emphasizing the balance between softness and hardness. Some renowned techniques of the Beggars' Sect mentioned in the novel include the Cloud Confining Palm, Tai Chi Fist, Tai Chi Sword Technique, and Extreme Clarity Sword Formation.", ImagePath = "Beggars.png" },
                new Sect { SectId = 2, SectName = "Ming Cult", Description = "The Ming Cult Sect, also known as the Evil Sect, is considered one of the most dominant factions in the martial arts world. With a vast number of followers spanning across Trung Nguyen, their influence is extensive. Although the sect's origins are not in Trung Nguyen, it stemmed from Persia (ancient Iran) and later established as an independent sect after operating in the region for three centuries. Due to their secretive and often arrogant practices, the martial arts community refers to them as the Evil Sect or the Heretical Sect, to be eliminated as they engage in dark and unorthodox teachings. Among the Four Great Protectorates, one person in the sect possesses the divine weapon, the Dragon Saber. The sect's unique martial arts skill is the Jin Yong's Great Hero Na Di, handed down by successive sect leaders. Prominent techniques listed in their martial arts manual include the Eagle Shooting, Green Willow, Roaring Lion, and Poison Dragon.", ImagePath = "MingCult.png" },
                new Sect { SectId = 3, SectName = "Five Poison", Description = "The Five Poison Sect is a martial arts faction founded by Quach Tuong Ai, the daughter of Quach Tinh. The history of this sect is closely related to the Beggars' Sect. The sect's master had a fortuitous encounter and learned a portion of the Nine Yang Divine Skill. After successfully cultivating this skill, they took along the divine weapon, the Heavenly Sword, and established the Five Poison Sect on Five Poison Mountain.The Five Poison Sect exclusively accepts female disciples and focuses primarily on sword techniques, emphasizing speed, precision, and the balance between softness and hardness. Some notable techniques of the Five Poison Sect include the Flying Snow Pierces, Fascinated Fairy's Moon, Nine Yin White Bone Claw, and Undying Indestructible.", ImagePath = "FivePoison.png" },
                new Sect { SectId = 4, SectName = "Shaolin", Description = "The Shaolin Sect is considered the foremost faction with a long-standing history. According to legend, the founder, Bodhidharma (also known as Damo), traveled through various countries and crossed the Yangtze River to reach the Shaolin Temple. He meditated there for a long time and began transmitting martial arts techniques such as the Yi Jin Jing (Muscle and Tendon Changing Classic) and other martial arts skills to the monks. The sect exclusively accepts male disciples. Despite being regarded as the top sect, the Shaolin monks usually participate in worldly affairs sparingly, choosing to mainly reside within the confines of the temple. Some renowned techniques of the Shaolin Sect include: Feathered Hanging Dragon, Dragon Taming Hand, Still Static King, and Golden Evil Slaying Spear", ImagePath = "Shaolin.png" },
                new Sect { SectId = 5, SectName = "Unknown", Description = "Unknown", ImagePath = "UnKnown.png" }
            );

            //character data
            modelBuilder.Entity<Character>().HasData(
                new Character { CharacterId = 1, CharacterName = "Neil", Gender = Gender.Male, Description = "Neil, of the Beggars' Sect, a Taoist with martial arts that has been trained and perfected over the years. He has a steadfast and determined personality, always seeking perfection in his skills.", ImagePath = "Neil.png", AttackValue = 8, DefenseValue = 6, SpeedValue = 7, IntellectValue = 10, PhysicalValue = 7, SectId = 1 },
                new Character { CharacterId = 2, CharacterName = "Kelsey", Gender = Gender.Female, Description = "Kelsey, of the Beggars' Sect with extremely advanced martial arts techniques. She has a strong and determined personality, always ready to face any situation.", ImagePath = "Kelsey.png", AttackValue = 9, DefenseValue = 4, SpeedValue = 6, IntellectValue = 10, PhysicalValue = 6, SectId = 1 },
                new Character { CharacterId = 3, CharacterName = "Waldo", Gender = Gender.Male, Description = "Waldo, a one-man Ming Cult sect with many dangerous skills with unparalleled power and power. With a ruthless and cruel personality, always seeking power and domination.", ImagePath = "Waldo.png", AttackValue = 10, DefenseValue = 5, SpeedValue = 8, IntellectValue = 6, PhysicalValue = 6, SectId = 2 },
                new Character { CharacterId = 4, CharacterName = "Ciara", Gender = Gender.Female, Description = "Ciara, of the Ming Cult sect with an assassin with incredible strength. She has a cold personality and hides from the crowd.", ImagePath = "Ciara.png", AttackValue = 10, DefenseValue = 4, SpeedValue = 9, IntellectValue = 7, PhysicalValue = 5, SectId = 2 },
                new Character { CharacterId = 5, CharacterName = "Eirlys", Gender = Gender.Female, Description = "Eirlys, of the Five Poison sect, a nun with sharp fighting techniques with swordsmanship. She has a persistent and tough personality, always ready to fight for what is right.", ImagePath = "Eirlys.png", AttackValue = 7, DefenseValue = 5, SpeedValue = 10, IntellectValue = 9, PhysicalValue = 6, SectId = 3 },
                new Character { CharacterId = 6, CharacterName = "Osmund", Gender = Gender.Male, Description = "Osmund, of the Shaolin sect with a reclusive monk with supernatural powers and unique Buddhist fighting techniques. He has a gentle and calm personality, always ready to help others and seek balance in life.", ImagePath = "Osmund.png", AttackValue = 6, DefenseValue = 9, SpeedValue = 5, IntellectValue = 6, PhysicalValue = 10, SectId = 4 }
            );

            //skill data
            modelBuilder.Entity<Skill>().HasData(
                new Skill { SkillId = 1, SkillName = "Nine Yang Divine Skill", ImagePath = "NineYangDivineSkill.png", BriefDescription = "Mana Regen +10%, Defense +10%", DetailDescription = "Increases mana regeneration rate by 10-20% (per level by 1%) and increases defense by 10-20% (per level by 1%).", Cooldown = 0, Type = false },
                new Skill { SkillId = 2, SkillName = "Tai Chi Fist", ImagePath = "TaiChiFist.png", BriefDescription = "Attack +50%, Speed +25%", DetailDescription = "Take the hard way, at the feet of the character appear the extreme pattern for 2s, during the defense skill increase by 25%-75% (each level increases by 1%) and the damage dealt plus 50%-100 %(every level increases by 1%).", Cooldown = 7, Type = true },
                new Skill { SkillId = 3, SkillName = "Cloud Confining Palm", ImagePath = "CloudConfiningPalm.png", BriefDescription = "Speed +60%", DetailDescription = "Movement speed increased, around the character's feet appears a cloud of movement speed that increases by 50-150% (increase by 2% each level) for 5s.", Cooldown = 10, Type = true },
                new Skill { SkillId = 4, SkillName = "Tai Chi Sword Technique", ImagePath = "TaiChiSwordTechnique.png", BriefDescription = "Attack +75%", DetailDescription = "Slash out a circular project with the center of the character, then grow bigger in 2s, dealing 75-125% damage (increase by 1% each level).", Cooldown = 12, Type = true },
                new Skill { SkillId = 5, SkillName = "Extreme Clarity Sword Formation", ImagePath = "ExtremeClaritySwordFormation.png", BriefDescription = "Attack +200%", DetailDescription = "Slashes a straight sword, followed by a Tai Chi project, dealing 200-300% damage (10% increase each level).", Cooldown = 30, Type = true },
                new Skill { SkillId = 6, SkillName = "Jin Yong's Great Hero Na Di", ImagePath = "JinYongGreatHeroNaDi.png", BriefDescription = "Attack +10%, Defense +10%", DetailDescription = "Increases attack damage by 10-20% (1% each level) and increases defense by 10-20% (1% each level).", Cooldown = 0, Type = false },
                new Skill { SkillId = 7, SkillName = "Eagle Shooting", ImagePath = "EagleShooting.png", BriefDescription = "Attack +60%, Speed +25%", DetailDescription = "Take the hard way, at the feet of the character appear the extreme pattern for 2s, during the defense skill increase by 25%-50% (each level increases by 0.5%) and the damage dealt plus 60%-160 %(every level increases by 2%).", Cooldown = 11, Type = true },
                new Skill { SkillId = 8, SkillName = "Green Willow", ImagePath = "GreenWillow.png", BriefDescription = "Speed +70%", DetailDescription = "Character grows wings, movement speed increases from 70-120% (1% per level) for 10s.", Cooldown = 17, Type = true },
                new Skill { SkillId = 9, SkillName = "Roaring Lion", ImagePath = "RoaringLion.png", BriefDescription = "Attack +95%", DetailDescription = "The character screams out a lion project and extends a distance for a certain amount of time, then grow bigger in 2s, dealing 95-145% damage (increase by 1% each level).", Cooldown = 14, Type = true },
                new Skill { SkillId = 10, SkillName = "Poison Dragon", ImagePath = "PoisonDragon.png", BriefDescription = "Attack +250%", DetailDescription = "Casts a dragon animation that moves straight forward and deals massive damage from 250-350% (10% increase per level).", Cooldown = 45, Type = true },
                new Skill { SkillId = 11, SkillName = "Nine Yin Manual", ImagePath = "NineYinManual.png", BriefDescription = "Attack +10%, Mana Regen +10%", DetailDescription = "Increases mana regeneration rate by 10-20% (per level by 1%) and increases attack by 10-20% (per level by 1%).", Cooldown = 0, Type = false },
                new Skill { SkillId = 12, SkillName = "Nine Yin White Bone Claw", ImagePath = "NineYinWhiteBoneClaw.png", BriefDescription = "Attack +65%", DetailDescription = "Hit the bony hand, capture the bait to deal damage dealing a certain amount of damage from 65-165% (increase by 2% each level).", Cooldown = 11, Type = true },
                new Skill { SkillId = 13, SkillName = "Flying Snow Pierces", ImagePath = "FlyingSnowPierces.png", BriefDescription = "Attack +55%", DetailDescription = "Cast a hand shape, from bottom to top dealing damage dealing a certain amount of damage from 55-155% (increase by 2% each level).", Cooldown = 10, Type = true },
                new Skill { SkillId = 14, SkillName = "Fascinated Fairy's Moon", ImagePath = "FascinatedFairyMoon.png", BriefDescription = "Attack +85%", DetailDescription = "The sword slashes out a red semicircle dealing damage from 85-185% (increase by 2% per level).", Cooldown = 14, Type = true },
                new Skill { SkillId = 15, SkillName = "Undying Indestructible", ImagePath = "UndyingIndestructible.png", BriefDescription = "Attack +150%", DetailDescription = "The combo slashes multiple sword shapes around the character dealing 150-300% damage (increasing by 15% each level).", Cooldown = 35, Type = true },
                new Skill { SkillId = 16, SkillName = "Yi Jin Jing", ImagePath = "YiJinJing.png", BriefDescription = "Defense +20%", DetailDescription = "Increases character's defense on a large scale by 20-30% (per level increases by 1%).", Cooldown = 0, Type = false },
                new Skill { SkillId = 17, SkillName = "Dragon Taming Hand", ImagePath = "DragonTamingHand.png", BriefDescription = "Attack +95%", DetailDescription = "Hit the golden dragon five-clawed dragon claw, dealing high damage from 95-195% (increase by 2% each level).", Cooldown = 12, Type = true },
                new Skill { SkillId = 18, SkillName = "Feathered Hanging Dragon", ImagePath = "FeatheredHangingDragon.png", BriefDescription = "Speed +65%", DetailDescription = "Animated a small dragon underfoot to increase movement speed from 65-165% (2% per level).", Cooldown = 13, Type = true },
                new Skill { SkillId = 19, SkillName = "Still Static King", ImagePath = "StillStaticKing.png", BriefDescription = "Defense +70%", DetailDescription = "Casting spells gives the character the ability to increase the area from 70-170% (increase by 2% each level).", Cooldown = 12, Type = true },
                new Skill { SkillId = 20, SkillName = "Golden Evil Slaying Spear", ImagePath = "GoldenEvilSlayingSpear.png", BriefDescription = "Attack +250%", DetailDescription = "Summons a golden humanoid that appears over the character's head and knocks down 1 punch towards the enemy dealing high damage from 250-350% (increasing by 10% each level).", Cooldown = 45, Type = true }
            );

            //character skill data
            modelBuilder.Entity<CharacterSkill>().HasData(
                new CharacterSkill { CharacterSkillId = 1, CharacterId = 1, SkillId = 1 },
                new CharacterSkill { CharacterSkillId = 2, CharacterId = 1, SkillId = 2 },
                new CharacterSkill { CharacterSkillId = 3, CharacterId = 1, SkillId = 3 },
                new CharacterSkill { CharacterSkillId = 4, CharacterId = 1, SkillId = 4 },
                new CharacterSkill { CharacterSkillId = 5, CharacterId = 1, SkillId = 5 },
                new CharacterSkill { CharacterSkillId = 6, CharacterId = 2, SkillId = 1 },
                new CharacterSkill { CharacterSkillId = 7, CharacterId = 2, SkillId = 2 },
                new CharacterSkill { CharacterSkillId = 8, CharacterId = 2, SkillId = 3 },
                new CharacterSkill { CharacterSkillId = 9, CharacterId = 2, SkillId = 4 },
                new CharacterSkill { CharacterSkillId = 10, CharacterId = 2, SkillId = 5 },
                new CharacterSkill { CharacterSkillId = 11, CharacterId = 3, SkillId = 6 },
                new CharacterSkill { CharacterSkillId = 12, CharacterId = 3, SkillId = 7 },
                new CharacterSkill { CharacterSkillId = 13, CharacterId = 3, SkillId = 8 },
                new CharacterSkill { CharacterSkillId = 14, CharacterId = 3, SkillId = 9 },
                new CharacterSkill { CharacterSkillId = 15, CharacterId = 3, SkillId = 10 },
                new CharacterSkill { CharacterSkillId = 16, CharacterId = 4, SkillId = 6 },
                new CharacterSkill { CharacterSkillId = 17, CharacterId = 4, SkillId = 7 },
                new CharacterSkill { CharacterSkillId = 18, CharacterId = 4, SkillId = 8 },
                new CharacterSkill { CharacterSkillId = 19, CharacterId = 4, SkillId = 9 },
                new CharacterSkill { CharacterSkillId = 20, CharacterId = 4, SkillId = 10 },
                new CharacterSkill { CharacterSkillId = 21, CharacterId = 5, SkillId = 11 },
                new CharacterSkill { CharacterSkillId = 22, CharacterId = 5, SkillId = 12 },
                new CharacterSkill { CharacterSkillId = 23, CharacterId = 5, SkillId = 13 },
                new CharacterSkill { CharacterSkillId = 24, CharacterId = 5, SkillId = 14 },
                new CharacterSkill { CharacterSkillId = 25, CharacterId = 5, SkillId = 15 },
                new CharacterSkill { CharacterSkillId = 26, CharacterId = 6, SkillId = 16 },
                new CharacterSkill { CharacterSkillId = 27, CharacterId = 6, SkillId = 17 },
                new CharacterSkill { CharacterSkillId = 28, CharacterId = 6, SkillId = 18 },
                new CharacterSkill { CharacterSkillId = 29, CharacterId = 6, SkillId = 19 },
                new CharacterSkill { CharacterSkillId = 30, CharacterId = 6, SkillId = 20 }
                );

            //Player attribute data
            modelBuilder.Entity<PlayerAttribute>().HasData(
                new PlayerAttribute { PlayerAttributeId = 1, AccountId = 31, PlayerName = "Player 1", Silver = 5000, Gold = 1, Level = 1, SkillMainCount = 1, Exp = 0, ScorePvP = 10, NumberOfMaps = 1, CharacterId = 1, AttackValue = 10, DefenseValue = 10, SpeedValue = 10, IntellectValue = 10, PhysicalValue = 10, LevelSkill0 = 1, LevelSkill1 = 1, LevelSkill2 = 1, LevelSkill3 = 1, LevelSkill4 = 1, SettingSoundValue = 1, SettingBrightnessValue = 100 },
                new PlayerAttribute { PlayerAttributeId = 2, AccountId = 2, PlayerName = "Player 2", Silver = 5000, Gold = 1, Level = 3, SkillMainCount = 3, Exp = 0, ScorePvP = 20, NumberOfMaps = 3, CharacterId = 2, AttackValue = 10, DefenseValue = 10, SpeedValue = 10, IntellectValue = 10, PhysicalValue = 10, LevelSkill0 = 1, LevelSkill1 = 1, LevelSkill2 = 1, LevelSkill3 = 1, LevelSkill4 = 1, SettingSoundValue = 1, SettingBrightnessValue = 100 },
                new PlayerAttribute { PlayerAttributeId = 3, AccountId = 3, PlayerName = "Player 3", Silver = 5000, Gold = 1, Level = 5, SkillMainCount = 5, Exp = 0, ScorePvP = 30, NumberOfMaps = 5, CharacterId = 3, AttackValue = 10, DefenseValue = 10, SpeedValue = 10, IntellectValue = 10, PhysicalValue = 10, LevelSkill0 = 1, LevelSkill1 = 1, LevelSkill2 = 1, LevelSkill3 = 1, LevelSkill4 = 1, SettingSoundValue = 1, SettingBrightnessValue = 100 },
                new PlayerAttribute { PlayerAttributeId = 4, AccountId = 4, PlayerName = "Player 4", Silver = 5000, Gold = 1, Level = 7, SkillMainCount = 7, Exp = 0, ScorePvP = 40, NumberOfMaps = 7, CharacterId = 4, AttackValue = 10, DefenseValue = 10, SpeedValue = 10, IntellectValue = 10, PhysicalValue = 10, LevelSkill0 = 1, LevelSkill1 = 1, LevelSkill2 = 1, LevelSkill3 = 1, LevelSkill4 = 1, SettingSoundValue = 1, SettingBrightnessValue = 100 },
                new PlayerAttribute { PlayerAttributeId = 5, AccountId = 5, PlayerName = "Player 5", Silver = 5000, Gold = 1, Level = 9, SkillMainCount = 9, Exp = 0, ScorePvP = 50, NumberOfMaps = 9, CharacterId = 5, AttackValue = 10, DefenseValue = 10, SpeedValue = 10, IntellectValue = 10, PhysicalValue = 10, LevelSkill0 = 1, LevelSkill1 = 1, LevelSkill2 = 1, LevelSkill3 = 1, LevelSkill4 = 1, SettingSoundValue = 1, SettingBrightnessValue = 100 },
                new PlayerAttribute { PlayerAttributeId = 6, AccountId = 6, PlayerName = "Player 6", Silver = 5000, Gold = 1, Level = 2, SkillMainCount = 2, Exp = 0, ScorePvP = 60, NumberOfMaps = 2, CharacterId = 6, AttackValue = 10, DefenseValue = 10, SpeedValue = 10, IntellectValue = 10, PhysicalValue = 10, LevelSkill0 = 1, LevelSkill1 = 1, LevelSkill2 = 1, LevelSkill3 = 1, LevelSkill4 = 1, SettingSoundValue = 1, SettingBrightnessValue = 100 },
                new PlayerAttribute { PlayerAttributeId = 7, AccountId = 7, PlayerName = "Player 7", Silver = 5000, Gold = 1, Level = 4, SkillMainCount = 4, Exp = 0, ScorePvP = 70, NumberOfMaps = 4, CharacterId = 1, AttackValue = 10, DefenseValue = 10, SpeedValue = 10, IntellectValue = 10, PhysicalValue = 10, LevelSkill0 = 1, LevelSkill1 = 1, LevelSkill2 = 1, LevelSkill3 = 1, LevelSkill4 = 1, SettingSoundValue = 1, SettingBrightnessValue = 100 },
                new PlayerAttribute { PlayerAttributeId = 8, AccountId = 8, PlayerName = "Player 8", Silver = 5000, Gold = 1, Level = 6, SkillMainCount = 6, Exp = 0, ScorePvP = 80, NumberOfMaps = 6, CharacterId = 2, AttackValue = 10, DefenseValue = 10, SpeedValue = 10, IntellectValue = 10, PhysicalValue = 10, LevelSkill0 = 1, LevelSkill1 = 1, LevelSkill2 = 1, LevelSkill3 = 1, LevelSkill4 = 1, SettingSoundValue = 1, SettingBrightnessValue = 100 },
                new PlayerAttribute { PlayerAttributeId = 9, AccountId = 9, PlayerName = "Player 9", Silver = 5000, Gold = 1, Level = 8, SkillMainCount = 8, Exp = 0, ScorePvP = 90, NumberOfMaps = 8, CharacterId = 3, AttackValue = 10, DefenseValue = 10, SpeedValue = 10, IntellectValue = 10, PhysicalValue = 10, LevelSkill0 = 1, LevelSkill1 = 1, LevelSkill2 = 1, LevelSkill3 = 1, LevelSkill4 = 1, SettingSoundValue = 1, SettingBrightnessValue = 100 },
                new PlayerAttribute { PlayerAttributeId = 10, AccountId = 10, PlayerName = "Player 10", Silver = 5000, Gold = 1, Level = 10, SkillMainCount = 10, Exp = 0, ScorePvP = 100, NumberOfMaps = 10, CharacterId = 4, AttackValue = 10, DefenseValue = 10, SpeedValue = 10, IntellectValue = 10, PhysicalValue = 10, LevelSkill0 = 1, LevelSkill1 = 1, LevelSkill2 = 1, LevelSkill3 = 1, LevelSkill4 = 1, SettingSoundValue = 1, SettingBrightnessValue = 100 },
                new PlayerAttribute { PlayerAttributeId = 11, AccountId = 11, PlayerName = "Player 11", Silver = 5000, Gold = 1, Level = 30, SkillMainCount = 30, Exp = 0, ScorePvP = 200, NumberOfMaps = 1, CharacterId = 5, AttackValue = 10, DefenseValue = 10, SpeedValue = 10, IntellectValue = 10, PhysicalValue = 10, LevelSkill0 = 1, LevelSkill1 = 1, LevelSkill2 = 1, LevelSkill3 = 1, LevelSkill4 = 1, SettingSoundValue = 1, SettingBrightnessValue = 100 },
                new PlayerAttribute { PlayerAttributeId = 12, AccountId = 12, PlayerName = "Player 12", Silver = 5000, Gold = 1, Level = 50, SkillMainCount = 50, Exp = 0, ScorePvP = 300, NumberOfMaps = 3, CharacterId = 6, AttackValue = 10, DefenseValue = 10, SpeedValue = 10, IntellectValue = 10, PhysicalValue = 10, LevelSkill0 = 1, LevelSkill1 = 1, LevelSkill2 = 1, LevelSkill3 = 1, LevelSkill4 = 1, SettingSoundValue = 1, SettingBrightnessValue = 100 },
                new PlayerAttribute { PlayerAttributeId = 13, AccountId = 13, PlayerName = "Player 13", Silver = 5000, Gold = 1, Level = 70, SkillMainCount = 70, Exp = 0, ScorePvP = 400, NumberOfMaps = 2, CharacterId = 6, AttackValue = 10, DefenseValue = 10, SpeedValue = 10, IntellectValue = 10, PhysicalValue = 10, LevelSkill0 = 1, LevelSkill1 = 1, LevelSkill2 = 1, LevelSkill3 = 1, LevelSkill4 = 1, SettingSoundValue = 1, SettingBrightnessValue = 100 },
                new PlayerAttribute { PlayerAttributeId = 14, AccountId = 14, PlayerName = "Player 14", Silver = 5000, Gold = 1, Level = 90, SkillMainCount = 90, Exp = 0, ScorePvP = 500, NumberOfMaps = 1, CharacterId = 5, AttackValue = 10, DefenseValue = 10, SpeedValue = 10, IntellectValue = 10, PhysicalValue = 10, LevelSkill0 = 1, LevelSkill1 = 1, LevelSkill2 = 1, LevelSkill3 = 1, LevelSkill4 = 1, SettingSoundValue = 1, SettingBrightnessValue = 100 },
                new PlayerAttribute { PlayerAttributeId = 15, AccountId = 15, PlayerName = "Player 15", Silver = 5000, Gold = 1, Level = 100, SkillMainCount = 100, Exp = 0, ScorePvP = 600, NumberOfMaps = 8, CharacterId = 4, AttackValue = 10, DefenseValue = 10, SpeedValue = 10, IntellectValue = 10, PhysicalValue = 10, LevelSkill0 = 1, LevelSkill1 = 1, LevelSkill2 = 1, LevelSkill3 = 1, LevelSkill4 = 1, SettingSoundValue = 1, SettingBrightnessValue = 100 },
                new PlayerAttribute { PlayerAttributeId = 16, AccountId = 16, PlayerName = "Player 16", Silver = 5000, Gold = 1, Level = 20, SkillMainCount = 20, Exp = 0, ScorePvP = 700, NumberOfMaps = 9, CharacterId = 3, AttackValue = 10, DefenseValue = 10, SpeedValue = 10, IntellectValue = 10, PhysicalValue = 10, LevelSkill0 = 1, LevelSkill1 = 1, LevelSkill2 = 1, LevelSkill3 = 1, LevelSkill4 = 1, SettingSoundValue = 1, SettingBrightnessValue = 100 },
                new PlayerAttribute { PlayerAttributeId = 17, AccountId = 17, PlayerName = "Player 17", Silver = 5000, Gold = 1, Level = 40, SkillMainCount = 40, Exp = 0, ScorePvP = 800, NumberOfMaps = 10, CharacterId = 2, AttackValue = 10, DefenseValue = 10, SpeedValue = 10, IntellectValue = 10, PhysicalValue = 10, LevelSkill0 = 1, LevelSkill1 = 1, LevelSkill2 = 1, LevelSkill3 = 1, LevelSkill4 = 1, SettingSoundValue = 1, SettingBrightnessValue = 100 },
                new PlayerAttribute { PlayerAttributeId = 18, AccountId = 18, PlayerName = "Player 18", Silver = 5000, Gold = 1, Level = 60, SkillMainCount = 60, Exp = 0, ScorePvP = 900, NumberOfMaps = 1, CharacterId = 1, AttackValue = 10, DefenseValue = 10, SpeedValue = 10, IntellectValue = 10, PhysicalValue = 10, LevelSkill0 = 1, LevelSkill1 = 1, LevelSkill2 = 1, LevelSkill3 = 1, LevelSkill4 = 1, SettingSoundValue = 1, SettingBrightnessValue = 100 },
                new PlayerAttribute { PlayerAttributeId = 19, AccountId = 19, PlayerName = "Player 19", Silver = 5000, Gold = 1, Level = 80, SkillMainCount = 80, Exp = 0, ScorePvP = 1000, NumberOfMaps = 2, CharacterId = 2, AttackValue = 10, DefenseValue = 10, SpeedValue = 10, IntellectValue = 10, PhysicalValue = 10, LevelSkill0 = 1, LevelSkill1 = 1, LevelSkill2 = 1, LevelSkill3 = 1, LevelSkill4 = 1, SettingSoundValue = 1, SettingBrightnessValue = 100 },
                new PlayerAttribute { PlayerAttributeId = 20, AccountId = 20, PlayerName = "Player 20", Silver = 5000, Gold = 1, Level = 100, SkillMainCount = 100, Exp = 0, ScorePvP = 150, NumberOfMaps = 3, CharacterId = 3, AttackValue = 10, DefenseValue = 10, SpeedValue = 10, IntellectValue = 10, PhysicalValue = 10, LevelSkill0 = 1, LevelSkill1 = 1, LevelSkill2 = 1, LevelSkill3 = 1, LevelSkill4 = 1, SettingSoundValue = 1, SettingBrightnessValue = 100 },
                new PlayerAttribute { PlayerAttributeId = 21, AccountId = 21, PlayerName = "Player 21", Silver = 5000, Gold = 1, Level = 25, SkillMainCount = 25, Exp = 0, ScorePvP = 250, NumberOfMaps = 4, CharacterId = 4, AttackValue = 10, DefenseValue = 10, SpeedValue = 10, IntellectValue = 10, PhysicalValue = 10, LevelSkill0 = 1, LevelSkill1 = 1, LevelSkill2 = 1, LevelSkill3 = 1, LevelSkill4 = 1, SettingSoundValue = 1, SettingBrightnessValue = 100 },
                new PlayerAttribute { PlayerAttributeId = 22, AccountId = 22, PlayerName = "Player 22", Silver = 5000, Gold = 1, Level = 35, SkillMainCount = 35, Exp = 0, ScorePvP = 350, NumberOfMaps = 5, CharacterId = 5, AttackValue = 10, DefenseValue = 10, SpeedValue = 10, IntellectValue = 10, PhysicalValue = 10, LevelSkill0 = 1, LevelSkill1 = 1, LevelSkill2 = 1, LevelSkill3 = 1, LevelSkill4 = 1, SettingSoundValue = 1, SettingBrightnessValue = 100 },
                new PlayerAttribute { PlayerAttributeId = 23, AccountId = 23, PlayerName = "Player 23", Silver = 5000, Gold = 1, Level = 45, SkillMainCount = 45, Exp = 0, ScorePvP = 450, NumberOfMaps = 6, CharacterId = 6, AttackValue = 10, DefenseValue = 10, SpeedValue = 10, IntellectValue = 10, PhysicalValue = 10, LevelSkill0 = 1, LevelSkill1 = 1, LevelSkill2 = 1, LevelSkill3 = 1, LevelSkill4 = 1, SettingSoundValue = 1, SettingBrightnessValue = 100 },
                new PlayerAttribute { PlayerAttributeId = 24, AccountId = 24, PlayerName = "Player 24", Silver = 5000, Gold = 1, Level = 55, SkillMainCount = 55, Exp = 0, ScorePvP = 550, NumberOfMaps = 7, CharacterId = 5, AttackValue = 10, DefenseValue = 10, SpeedValue = 10, IntellectValue = 10, PhysicalValue = 10, LevelSkill0 = 1, LevelSkill1 = 1, LevelSkill2 = 1, LevelSkill3 = 1, LevelSkill4 = 1, SettingSoundValue = 1, SettingBrightnessValue = 100 },
                new PlayerAttribute { PlayerAttributeId = 25, AccountId = 25, PlayerName = "Player 25", Silver = 5000, Gold = 1, Level = 65, SkillMainCount = 65, Exp = 0, ScorePvP = 650, NumberOfMaps = 8, CharacterId = 4, AttackValue = 10, DefenseValue = 10, SpeedValue = 10, IntellectValue = 10, PhysicalValue = 10, LevelSkill0 = 1, LevelSkill1 = 1, LevelSkill2 = 1, LevelSkill3 = 1, LevelSkill4 = 1, SettingSoundValue = 1, SettingBrightnessValue = 100 },
                new PlayerAttribute { PlayerAttributeId = 26, AccountId = 26, PlayerName = "Player 26", Silver = 5000, Gold = 1, Level = 75, SkillMainCount = 75, Exp = 0, ScorePvP = 750, NumberOfMaps = 9, CharacterId = 3, AttackValue = 10, DefenseValue = 10, SpeedValue = 10, IntellectValue = 10, PhysicalValue = 10, LevelSkill0 = 1, LevelSkill1 = 1, LevelSkill2 = 1, LevelSkill3 = 1, LevelSkill4 = 1, SettingSoundValue = 1, SettingBrightnessValue = 100 },
                new PlayerAttribute { PlayerAttributeId = 27, AccountId = 27, PlayerName = "Player 27", Silver = 5000, Gold = 1, Level = 85, SkillMainCount = 85, Exp = 0, ScorePvP = 850, NumberOfMaps = 10, CharacterId = 2, AttackValue = 10, DefenseValue = 10, SpeedValue = 10, IntellectValue = 10, PhysicalValue = 10, LevelSkill0 = 1, LevelSkill1 = 1, LevelSkill2 = 1, LevelSkill3 = 1, LevelSkill4 = 1, SettingSoundValue = 1, SettingBrightnessValue = 100 },
                new PlayerAttribute { PlayerAttributeId = 28, AccountId = 28, PlayerName = "Player 28", Silver = 5000, Gold = 1, Level = 95, SkillMainCount = 95, Exp = 0, ScorePvP = 950, NumberOfMaps = 2, CharacterId = 1, AttackValue = 10, DefenseValue = 10, SpeedValue = 10, IntellectValue = 10, PhysicalValue = 10, LevelSkill0 = 1, LevelSkill1 = 1, LevelSkill2 = 1, LevelSkill3 = 1, LevelSkill4 = 1, SettingSoundValue = 1, SettingBrightnessValue = 100 },
                new PlayerAttribute { PlayerAttributeId = 29, AccountId = 29, PlayerName = "Player 29", Silver = 5000, Gold = 1, Level = 100, SkillMainCount = 100, Exp = 0, ScorePvP = 1100, NumberOfMaps = 4, CharacterId = 2, AttackValue = 10, DefenseValue = 10, SpeedValue = 10, IntellectValue = 10, PhysicalValue = 10, LevelSkill0 = 1, LevelSkill1 = 1, LevelSkill2 = 1, LevelSkill3 = 1, LevelSkill4 = 1, SettingSoundValue = 1, SettingBrightnessValue = 100 },
                new PlayerAttribute { PlayerAttributeId = 30, AccountId = 30, PlayerName = "Player 30", Silver = 5000, Gold = 1, Level = 100, SkillMainCount = 1, Exp = 0, ScorePvP = 1500, NumberOfMaps = 8, CharacterId = 4, AttackValue = 10, DefenseValue = 10, SpeedValue = 10, IntellectValue = 10, PhysicalValue = 10, LevelSkill0 = 1, LevelSkill1 = 1, LevelSkill2 = 1, LevelSkill3 = 1, LevelSkill4 = 1, SettingSoundValue = 1, SettingBrightnessValue = 100 }
            );

            //category item data
            modelBuilder.Entity<CategoryItem>().HasData(
               new CategoryItem { CategoryId = 1, CategoryName = "Consumables", Description = "Consumable items, after use will disappear.", ImagePath = "Consumable.png" },
               new CategoryItem { CategoryId = 2, CategoryName = "Equipment", Description = "Equipment items, after using the equipment will be worn on the character and increase certain stats.", ImagePath = "Equipment.png" },
               new CategoryItem { CategoryId = 3, CategoryName = "Chest", Description = "Chest items, once opened, will receive random equipment or consumables.", ImagePath = "Chest.png" },
               new CategoryItem { CategoryId = 4, CategoryName = "Individual", Description = "Individual items, items that can affect the player e.g. renaming cards.", ImagePath = "Individual.png" }
           );

            //item data
            modelBuilder.Entity<Item>().HasData(
               new Item { ItemId = 1, SectId = 1, CategoryId = 1, ItemName = "Small Health Potion", Description = "Prepared from many different herbs that restore a certain amount of blood.", ImagePath = "SmallHealthPotion.png", Silver = 100, Type = 1, Equipped = false, HealthValue = 100, ManaValue = 0, AttackValue = 0, DefenseValue = 0, SpeedValue = 0, IntellectValue = 0, PhysicalValue = 0 },
               new Item { ItemId = 2, SectId = 1, CategoryId = 1, ItemName = "Medium Health Potion", Description = "Prepared from many different herbs that restore a certain amount of blood", ImagePath = "MediumHealthPotion.png", Silver = 500, Type = 2, Equipped = false, HealthValue = 500, ManaValue = 0, AttackValue = 0, DefenseValue = 0, SpeedValue = 0, IntellectValue = 0, PhysicalValue = 0 },
               new Item { ItemId = 3, SectId = 1, CategoryId = 1, ItemName = "Big Health Potion", Description = "Prepared from many different herbs that restore a certain amount of blood", ImagePath = "BigHealthPotion.png", Silver = 1000, Type = 3, Equipped = false, HealthValue = 1000, ManaValue = 0, AttackValue = 0, DefenseValue = 0, SpeedValue = 0, IntellectValue = 0, PhysicalValue = 0 },
               new Item { ItemId = 4, SectId = 1, CategoryId = 1, ItemName = "Small Mana Potion", Description = "Made from many herbs combined with magic that restores a certain amount of energy", ImagePath = "SmallManaPotion.png", Silver = 100, Type = 1, Equipped = false, HealthValue = 0, ManaValue = 50, AttackValue = 0, DefenseValue = 0, SpeedValue = 0, IntellectValue = 0, PhysicalValue = 0 },
               new Item { ItemId = 5, SectId = 1, CategoryId = 1, ItemName = "Medium Mana Potion", Description = "Made from many herbs combined with magic that restores a certain amount of energy", ImagePath = "MediumManaPotion.png", Silver = 500, Type = 2, Equipped = false, HealthValue = 0, ManaValue = 250, AttackValue = 0, DefenseValue = 0, SpeedValue = 0, IntellectValue = 0, PhysicalValue = 0 },
               new Item { ItemId = 6, SectId = 2, CategoryId = 1, ItemName = "Big Mana Potion", Description = "Made from many herbs combined with magic that restores a certain amount of energy", ImagePath = "BigManaPotion.png", Silver = 1000, Type = 3, Equipped = false, HealthValue = 0, ManaValue = 500, AttackValue = 0, DefenseValue = 0, SpeedValue = 0, IntellectValue = 0, PhysicalValue = 0 },
               new Item { ItemId = 7, SectId = 2, CategoryId = 1, ItemName = "Damage Boost Card", Description = "The card can temporarily increase damage to the character", ImagePath = "DamageBoostCard.png", Silver = 2000, Type = 0, Equipped = false, HealthValue = 0, ManaValue = 0, AttackValue = 110, DefenseValue = 0, SpeedValue = 0, IntellectValue = 0, PhysicalValue = 0 },
               new Item { ItemId = 8, SectId = 2, CategoryId = 1, ItemName = "Defense Boost Card", Description = "The card can temporarily increase the character's defense", ImagePath = "DefenseBoostCard.png", Silver = 2000, Type = 0, Equipped = false, HealthValue = 0, ManaValue = 0, AttackValue = 0, DefenseValue = 110, SpeedValue = 0, IntellectValue = 0, PhysicalValue = 0 },
               new Item { ItemId = 9, SectId = 2, CategoryId = 1, ItemName = "Speed Boost Card", Description = "The card can temporarily increase the speed of the character", ImagePath = "SpeedBoostCard.png", Silver = 2000, Type = 0, Equipped = false, HealthValue = 0, ManaValue = 0, AttackValue = 0, DefenseValue = 0, SpeedValue = 110, IntellectValue = 0, PhysicalValue = 0 },
               new Item { ItemId = 10, SectId = 2, CategoryId = 1, ItemName = "Physical Boost Card", Description = "Cards that can temporarily increase a character's physical strength", ImagePath = "PhysicalBoostCard.png", Silver = 2000, Type = 0, Equipped = false, HealthValue = 0, ManaValue = 0, AttackValue = 0, DefenseValue = 0, SpeedValue = 0, IntellectValue = 0, PhysicalValue = 110 },
               new Item { ItemId = 11, SectId = 2, CategoryId = 1, ItemName = "Intellect Boost Card", Description = "Cards that can temporarily increase the character's intelligence", ImagePath = "IntellectBoostCard.png", Silver = 2000, Type = 0, Equipped = false, HealthValue = 0, ManaValue = 0, AttackValue = 0, DefenseValue = 0, SpeedValue = 0, IntellectValue = 110, PhysicalValue = 0 },
               new Item { ItemId = 12, SectId = 2, CategoryId = 1, ItemName = "All Attribute Boost Card", Description = "The card can completely increase the character's temporary attributes", ImagePath = "AllAttributeBoostCard.png", Silver = 5000, Type = 0, Equipped = false, HealthValue = 110, ManaValue = 110, AttackValue = 110, DefenseValue = 110, SpeedValue = 110, IntellectValue = 110, PhysicalValue = 110 },
               new Item { ItemId = 13, SectId = 1, CategoryId = 2, ItemName = "Normal Wooden Sword", Description = "Forged from an ordinary blacksmith by the side of the road, the numbers are countless, the damage is slightly increased", ImagePath = "NormalWoodenSword.png", Silver = 5000, Type = 1, Equipped = true, HealthValue = 0, ManaValue = 0, AttackValue = 110, DefenseValue = 0, SpeedValue = 0, IntellectValue = 0, PhysicalValue = 0 },
               new Item { ItemId = 14, SectId = 1, CategoryId = 2, ItemName = "Advanced Wooden Sword", Description = "Forged from reputable blacksmiths in big cities, limited quantity, increased damage to a large area", ImagePath = "AdvancedWoodenSword.png", Silver = 10000, Type = 2, Equipped = true, HealthValue = 0, ManaValue = 0, AttackValue = 120, DefenseValue = 0, SpeedValue = 0, IntellectValue = 0, PhysicalValue = 0 },
               new Item { ItemId = 15, SectId = 1, CategoryId = 2, ItemName = "Legend Wooden Sword", Description = "Forged from top blacksmiths combined with rare materials, extremely scarce quantities, higher damage than usual", ImagePath = "LegendWoodenSword.png", Silver = 20000, Type = 3, Equipped = true, HealthValue = 0, ManaValue = 0, AttackValue = 135, DefenseValue = 0, SpeedValue = 0, IntellectValue = 0, PhysicalValue = 0 },
               new Item { ItemId = 16, SectId = 2, CategoryId = 2, ItemName = "Normal Sword", Description = "Forged from an ordinary blacksmith by the side of the road, the numbers are countless, the damage is slightly increased", ImagePath = "NormalSword.png", Silver = 5000, Type = 1, Equipped = true, HealthValue = 0, ManaValue = 0, AttackValue = 110, DefenseValue = 0, SpeedValue = 0, IntellectValue = 0, PhysicalValue = 0 },
               new Item { ItemId = 17, SectId = 2, CategoryId = 2, ItemName = "Advanced Sword", Description = "Forged from reputable blacksmiths in big cities, limited quantity, increased damage to a large area", ImagePath = "AdvancedSword.png", Silver = 10000, Type = 2, Equipped = true, HealthValue = 0, ManaValue = 0, AttackValue = 120, DefenseValue = 0, SpeedValue = 0, IntellectValue = 0, PhysicalValue = 0 },
               new Item { ItemId = 18, SectId = 2, CategoryId = 2, ItemName = "Heavenly Sword", Description = "Forged from the top blacksmiths combined with the harmony between heaven and earth, only 1 equipment, the damage is greatly increased", ImagePath = "HeavenlySword.png", Silver = 30000, Type = 4, Equipped = true, HealthValue = 0, ManaValue = 0, AttackValue = 150, DefenseValue = 0, SpeedValue = 0, IntellectValue = 0, PhysicalValue = 0 },
               new Item { ItemId = 19, SectId = 3, CategoryId = 2, ItemName = "Normal Sabre", Description = "Forged from an ordinary blacksmith by the side of the road, the numbers are countless, the damage is slightly increased", ImagePath = "NormalSabre.png", Silver = 5000, Type = 1, Equipped = true, HealthValue = 0, ManaValue = 0, AttackValue = 110, DefenseValue = 0, SpeedValue = 0, IntellectValue = 0, PhysicalValue = 0 },
               new Item { ItemId = 20, SectId = 3, CategoryId = 2, ItemName = "Advanced Sabre", Description = "Forged from reputable blacksmiths in big cities, limited quantity, increased damage to a large area", ImagePath = "AdvancedSabre.png", Silver = 10000, Type = 2, Equipped = true, HealthValue = 0, ManaValue = 0, AttackValue = 120, DefenseValue = 0, SpeedValue = 0, IntellectValue = 0, PhysicalValue = 0 },
               new Item { ItemId = 21, SectId = 3, CategoryId = 2, ItemName = "Dragon Slaying Sabre", Description = "Forged from the top blacksmiths combined with the harmony between heaven and earth, only 1 equipment, the damage is greatly increased", ImagePath = "DragonSlayingSabre.png", Silver = 30000, Type = 4, Equipped = true, HealthValue = 0, ManaValue = 0, AttackValue = 150, DefenseValue = 0, SpeedValue = 0, IntellectValue = 0, PhysicalValue = 0 },
               new Item { ItemId = 22, SectId = 4, CategoryId = 2, ItemName = "Normal Bo Saff", Description = "Forged from an ordinary blacksmith by the side of the road, the numbers are countless, the damage is slightly increased", ImagePath = "NormalBoSaff.png", Silver = 5000, Type = 1, Equipped = true, HealthValue = 0, ManaValue = 0, AttackValue = 110, DefenseValue = 0, SpeedValue = 0, IntellectValue = 0, PhysicalValue = 0 },
               new Item { ItemId = 23, SectId = 4, CategoryId = 2, ItemName = "Advanced Bo Saff", Description = "Forged from reputable blacksmiths in big cities, limited quantity, increased damage to a large area", ImagePath = "AdvancedBoSaff.png", Silver = 10000, Type = 2, Equipped = true, HealthValue = 0, ManaValue = 0, AttackValue = 120, DefenseValue = 0, SpeedValue = 0, IntellectValue = 0, PhysicalValue = 0 },
               new Item { ItemId = 24, SectId = 4, CategoryId = 2, ItemName = "Legend Bo Saff", Description = "Forged from top blacksmiths combined with rare materials, extremely scarce quantities, higher damage than usual", ImagePath = "LegendBoSaff.png", Silver = 20000, Type = 3, Equipped = true, HealthValue = 0, ManaValue = 0, AttackValue = 135, DefenseValue = 0, SpeedValue = 0, IntellectValue = 0, PhysicalValue = 0 },
               new Item { ItemId = 25, SectId = 3, CategoryId = 2, ItemName = "Normal Helmet", Description = "Forged from an ordinary blacksmith by the side of the road, the numbers are countless, the defense is slightly increased", ImagePath = "NormalHelmet.png", Silver = 5000, Type = 1, Equipped = true, HealthValue = 0, ManaValue = 0, AttackValue = 0, DefenseValue = 110, SpeedValue = 0, IntellectValue = 102, PhysicalValue = 0 },
               new Item { ItemId = 26, SectId = 3, CategoryId = 2, ItemName = "Advanced Helmet", Description = "Forged from reputable blacksmiths in big cities, limited quantity, increased defense to a large area", ImagePath = "AdvancedHelmet.png", Silver = 10000, Type = 2, Equipped = true, HealthValue = 0, ManaValue = 0, AttackValue = 0, DefenseValue = 120, SpeedValue = 0, IntellectValue = 105, PhysicalValue = 0 },
               new Item { ItemId = 27, SectId = 3, CategoryId = 2, ItemName = "Legend Helmet", Description = "Forged from top blacksmiths combined with rare materials, extremely scarce quantities, higher defense than usual", ImagePath = "LegendHelmet.png", Silver = 20000, Type = 3, Equipped = true, HealthValue = 0, ManaValue = 0, AttackValue = 0, DefenseValue = 130, SpeedValue = 0, IntellectValue = 110, PhysicalValue = 0 },
               new Item { ItemId = 28, SectId = 3, CategoryId = 2, ItemName = "Normal Armor", Description = "Forged from an ordinary blacksmith by the side of the road, the numbers are countless, the defense is slightly increased", ImagePath = "NormalArmor.png", Silver = 5000, Type = 1, Equipped = true, HealthValue = 0, ManaValue = 0, AttackValue = 0, DefenseValue = 110, SpeedValue = 0, IntellectValue = 0, PhysicalValue = 102 },
               new Item { ItemId = 29, SectId = 3, CategoryId = 2, ItemName = "Advanced Armor", Description = "Forged from reputable blacksmiths in big cities, limited quantity, increased defense to a large area", ImagePath = "AdvancedArmor.png", Silver = 10000, Type = 2, Equipped = true, HealthValue = 0, ManaValue = 0, AttackValue = 0, DefenseValue = 120, SpeedValue = 0, IntellectValue = 0, PhysicalValue = 105 },
               new Item { ItemId = 30, SectId = 3, CategoryId = 2, ItemName = "Legend Armor", Description = "Forged from top blacksmiths combined with rare materials, extremely scarce quantities, higher defense than usual", ImagePath = "LegendArmor.png", Silver = 20000, Type = 3, Equipped = true, HealthValue = 0, ManaValue = 0, AttackValue = 0, DefenseValue = 130, SpeedValue = 0, IntellectValue = 0, PhysicalValue = 110 },
               new Item { ItemId = 31, SectId = 3, CategoryId = 2, ItemName = "Normal Gloves", Description = "Forged from an ordinary blacksmith by the side of the road, the numbers are countless, the defense is slightly increased", ImagePath = "NormalGloves.png", Silver = 5000, Type = 1, Equipped = true, HealthValue = 0, ManaValue = 0, AttackValue = 105, DefenseValue = 105, SpeedValue = 105, IntellectValue = 0, PhysicalValue = 0 },
               new Item { ItemId = 32, SectId = 3, CategoryId = 2, ItemName = "Advanced Gloves", Description = "Forged from reputable blacksmiths in big cities, limited quantity, increased defense to a large area", ImagePath = "AdvancedGloves.png", Silver = 10000, Type = 2, Equipped = true, HealthValue = 0, ManaValue = 0, AttackValue = 110, DefenseValue = 110, SpeedValue = 110, IntellectValue = 0, PhysicalValue = 0 },
               new Item { ItemId = 33, SectId = 3, CategoryId = 2, ItemName = "Legend Gloves", Description = "Forged from top blacksmiths combined with rare materials, extremely scarce quantities, higher defense than usual", ImagePath = "LegendGloves.png", Silver = 20000, Type = 3, Equipped = true, HealthValue = 0, ManaValue = 0, AttackValue = 120, DefenseValue = 120, SpeedValue = 120, IntellectValue = 0, PhysicalValue = 0 },
               new Item { ItemId = 34, SectId = 4, CategoryId = 2, ItemName = "Normal Leggings", Description = "Forged from an ordinary blacksmith by the side of the road, the numbers are countless, the defense slightly increased", ImagePath = "NormalLeggings.png", Silver = 5000, Type = 1, Equipped = true, HealthValue = 0, ManaValue = 0, AttackValue = 0, DefenseValue = 105, SpeedValue = 110, IntellectValue = 0, PhysicalValue = 0 },
               new Item { ItemId = 35, SectId = 4, CategoryId = 2, ItemName = "Advanced Leggings", Description = "Forged from reputable blacksmiths in big cities, limited quantity, increased defense to a large area", ImagePath = "AdvancedLeggings.png", Silver = 10000, Type = 2, Equipped = true, HealthValue = 0, ManaValue = 0, AttackValue = 0, DefenseValue = 110, SpeedValue = 120, IntellectValue = 0, PhysicalValue = 0 },
               new Item { ItemId = 36, SectId = 4, CategoryId = 2, ItemName = "Legend Leggings", Description = "Forged from top blacksmiths combined with rare materials, extremely scarce quantities, higher defense than usual", ImagePath = "LegendLeggings.png", Silver = 20000, Type = 3, Equipped = true, HealthValue = 0, ManaValue = 0, AttackValue = 0, DefenseValue = 115, SpeedValue = 130, IntellectValue = 0, PhysicalValue = 0 },
               new Item { ItemId = 37, SectId = 4, CategoryId = 2, ItemName = "Normal Boots", Description = "Forged from an ordinary blacksmith by the side of the road, the numbers are countless, the defense slightly increased", ImagePath = "NormalBoots.png", Silver = 5000, Type = 1, Equipped = true, HealthValue = 0, ManaValue = 0, AttackValue = 0, DefenseValue = 105, SpeedValue = 110, IntellectValue = 0, PhysicalValue = 0 },
               new Item { ItemId = 38, SectId = 4, CategoryId = 2, ItemName = "Advanced Boots", Description = "Forged from reputable blacksmiths in big cities, limited quantity, increased defense to a large area", ImagePath = "AdvancedBoots.png", Silver = 10000, Type = 2, Equipped = true, HealthValue = 0, ManaValue = 0, AttackValue = 0, DefenseValue = 110, SpeedValue = 120, IntellectValue = 0, PhysicalValue = 0 },
               new Item { ItemId = 39, SectId = 4, CategoryId = 2, ItemName = "Legend Boots", Description = "Forged from top blacksmiths combined with rare materials, extremely scarce quantities, higher defense than usual", ImagePath = "LegendBoots.png", Silver = 20000, Type = 3, Equipped = true, HealthValue = 0, ManaValue = 0, AttackValue = 0, DefenseValue = 115, SpeedValue = 130, IntellectValue = 0, PhysicalValue = 0 },
               new Item { ItemId = 40, SectId = 4, CategoryId = 3, ItemName = "Chest Consumables", Description = "Crafted by pharmacist magicians, open to obtain consumable items", ImagePath = "ChestConsumables.png", Silver = 750, Type = 0, Equipped = false, HealthValue = 0, ManaValue = 0, AttackValue = 0, DefenseValue = 0, SpeedValue = 0, IntellectValue = 0, PhysicalValue = 0 },
               new Item { ItemId = 41, SectId = 3, CategoryId = 3, ItemName = "Chest Equipments", Description = "Crafted from rune mage, unlocking can grant random equipment", ImagePath = "ChestEquipments.png", Silver = 10000, Type = 0, Equipped = false, HealthValue = 0, ManaValue = 0, AttackValue = 0, DefenseValue = 0, SpeedValue = 0, IntellectValue = 0, PhysicalValue = 0 },
               new Item { ItemId = 42, SectId = 4, CategoryId = 3, ItemName = "Chest Items", Description = "Crafted from supreme mages, opening can obtain various equipment and consumables depending on luck", ImagePath = "ChestItems.png", Silver = 15000, Type = 0, Equipped = false, HealthValue = 0, ManaValue = 0, AttackValue = 0, DefenseValue = 0, SpeedValue = 0, IntellectValue = 0, PhysicalValue = 0 }
            );

            //map data
            modelBuilder.Entity<Map>().HasData(
                new Map { MapId = 1, TranformX = -228, TranformY = -71, Type = 1, Level = 1, LevelRequirement = "Level: 1-5", MapName = "Mount Beggars", Description = "Mount Beggars in the Little Snowy Peak is one of the highlights in the classic novel by writer Kim Dung - The Heaven Sword and Dragon Saber. Located in a pristine area, Mount Beggars is covered in smooth white snow all year round. When arriving here, one feels as if entering a world of incredibly beautiful ice. The far-reaching view is surrounded by overlapping mountain peaks, snowy meadows, and waterfalls that flow down like delicate silk ribbons.", ImagePath = "MountBeggars.png", Silver = 50, Exp = 100, ItemId = 41, AmountItem = 1 },
                new Map { MapId = 2, TranformX = 192, TranformY = -160, Type = 1, Level = 2, LevelRequirement = "Level: 15-20", MapName = "Hua Mountain", Description = "Hua Mountain is where martial artists in the novel train their martial arts, hone their strength, and perseverance. The high mountain covered in white snow creates a peaceful and tranquil space that allows people to relax and calm their minds. Moreover, Hua Mountain is also where the main characters in the story seek maturity and self-improvement. ", ImagePath = "HuaMountain.png", Silver = 700, Exp = 700, ItemId = 42, AmountItem = 1 },
                new Map { MapId = 3, TranformX = 448, TranformY = -254, Type = 2, Level = 1, LevelRequirement = "Level: 10-15", MapName = "Five Poison Mountain", Description = "Five Poison Mountain is also where the main characters in the story undergo harsh challenges to improve themselves and mature. The scene of Five Poison Mountain with its snow-covered landscape, large rocks, and overlapping mountain peaks creates a dark and mysterious atmosphere that arouses the curiosity of readers.", ImagePath = "FivePoisonMountain.png", Silver = 500, Exp = 500, ItemId = 42, AmountItem = 1 },
                new Map { MapId = 4, TranformX = -314, TranformY = 167, Type = 3, Level = 3, LevelRequirement = "Level: 10-15", MapName = "Sunrise Light Peak", Description = "Sunrise Light Peak is one of the special locations in the novel The Heaven Sword and Dragon Saber by writer Kim Dung. Located in a pristine area, this towering mountain peak is covered in smooth white snow all year round. When arriving here, one feels as if being transported to another world, where the air is pure, fresh, and peaceful. ", ImagePath = "SunriseLightPeak.png", Silver = 500, Exp = 500, ItemId = 41, AmountItem = 1 },
                new Map { MapId = 5, TranformX = 408, TranformY = -70, Type = 3, Level = 2, LevelRequirement = "Level: 5-10", MapName = "Shaolin Mountain", Description = "Shaolin Mountain is not only a place for martial arts training and strength improvement but also a place to preserve and protect the secret martial arts of the sect. On the top of the high mountain, there is a tower that houses the secret martial arts of the Shaolin sect, which only those who are honored can know.", ImagePath = "ShaolinMountain.png", Silver = 100, Exp = 100, ItemId = 42, AmountItem = 1 },
                new Map { MapId = 6, TranformX = 269, TranformY = 161, Type = 4, Level = 1, LevelRequirement = "Level: 25-30", MapName = "Ice Fire Island", Description = "Ice Fire Island is where martial artists in the novel train their martial arts, hone their strength, and perseverance. What is special here is the diverse and rich natural landscape, from snow-covered mountain peaks to lush green valleys and clear streams. However, being located between two volcanoes, Ice Fire Island also carries danger and harshness.", ImagePath = "IceFireIsland.png", Silver = 1000, Exp = 1000, ItemId = 42, AmountItem = 1 }
            );
        }
    }
}
