using mf_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace mf_backend.DataAccess
{
    public class ApplicationDbContext : DbContext
    {
        private static readonly string SQL_CONNECTION = "Server=(local);uid=sa;pwd=123456;Database=MF_V9;Trusted_Connection=true;Encrypt=false";

        public ApplicationDbContext() { }

        public DbSet<Account> Accounts { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<Sect> Sects { get; set; }
        public DbSet<Map> Maps { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<Character> Characters { get; set; }
        public DbSet<VerifyCode> VerifyCodes { get; set; }
        public DbSet<Player> Player { get; set; }
        public DbSet<CategoryItem> CategoryItems { get; set; }
        public DbSet<Item> Items { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
            optionsBuilder.UseSqlServer(SQL_CONNECTION);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>().HasKey(a => a.AccountID);
            modelBuilder.Entity<News>().HasKey(a => a.NewsID);
            modelBuilder.Entity<Sect>().HasKey(a => a.SectID);
            modelBuilder.Entity<Map>().HasKey(a => a.MapID);
            modelBuilder.Entity<Skill>().HasKey(a => a.SkillID);
            modelBuilder.Entity<Character>().HasKey(a => a.CharacterID);
            modelBuilder.Entity<CategoryItem>().HasKey(a => a.CategoryID);
            modelBuilder.Entity<Item>().HasKey(a => a.ItemID);

            modelBuilder.Entity<Character>()
                .HasOne(c => c.CharacterSect)
                .WithMany(s => s.SectCharacters)
                .HasForeignKey(c => c.SectID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Item>()
                .HasOne(i => i.ItemSect)
                .WithMany()
                .HasForeignKey(i => i.SectID)
                .OnDelete(DeleteBehavior.Cascade); 

            modelBuilder.Entity<Item>()
                .HasOne(i => i.ItemCategory)
                .WithMany()
                .HasForeignKey(i => i.CategoryID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Account>().HasData(
                new Account
                {
                    AccountID = 1,
                    Username = "mf_admin",
                    Password = "$2a$11$Zq2mQ3no7qbNtEV8lX76EOuB3T91sdYjVlFAPPSurjD.1UoKuzsqq",
                    AvatarUrl = "player.jpg",
                    Email = "toannvce150811@fpt.edu.vn",
                    Fullname = "Nguyen Van Toan Admin",
                    Gender = "male",
                    Role = 1
                },
                new Account
                {
                    AccountID = 2,
                    Username = "mf_player1",
                    Password = "$2a$11$xbwxiTTmueuiy4HF2i9kR.O8GkzWH64SyZdkTB6n0tuf87UCtgLb6",
                    AvatarUrl = "player.jpg",
                    Email = "mplkingofworld@gmail.com",
                    Fullname = "Nguyen Van Toan Player",
                    Gender = "female"
                });
        }
    }
}
