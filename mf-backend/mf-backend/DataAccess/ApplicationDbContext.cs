using mf_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace mf_backend.DataAccess
{
    public class ApplicationDbContext : DbContext
    {
        private static readonly string SQL_CONNECTION = "Server=(local);uid=sa;pwd=123456;Database=Martial_Fight;Trusted_Connection=true;Encrypt=false";

        public ApplicationDbContext() { }

        public DbSet<Account> Accounts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
            optionsBuilder.UseSqlServer(SQL_CONNECTION);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>().HasKey(a => a.AccountID);
            modelBuilder.Entity<Account>().HasData(
                new Account
                {
                    AccountID = 1,
                    Username = "mf_admin",
                    NameInGame = "",
                    Password = "12345@6",
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
                    NameInGame = "",
                    Password = "123456@",
                    AvatarUrl = "player.jpg",
                    Email = "mplkingofworld@gmail.com",
                    Fullname = "Nguyen Van Toan Player",
                    Gender = "female"
                }); ; ;
        }
    }
}
