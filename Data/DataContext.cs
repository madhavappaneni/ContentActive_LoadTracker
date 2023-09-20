using System;
using Microsoft.EntityFrameworkCore;
using LoadTracker.Models;

namespace LoadTracker.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer("Server=localhost;Database=ContentActive;Trusted_Connection=False;TrustServerCertificate=true;User=sa;Password=Mhe@34000");

        }

        public DbSet<Customer> Customers { get; set; }

        public DbSet<Load> Loads { get; set; }

        public DbSet<Driver> Drivers { get; set; }

        public DbSet<Carrier> Carriers { get; set; }


    }
}

