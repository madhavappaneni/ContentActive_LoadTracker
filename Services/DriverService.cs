using System;
using LoadTracker.Data;
using LoadTracker.Models;
using Microsoft.EntityFrameworkCore;

namespace LoadTracker.Services
{
    public class DriverService
    {
        private readonly DataContext _context;

        public DriverService(DataContext context)
        {
            _context = context;
        }


        public List<Driver> GetFilteredDrivers(string name)
        {
            var query = _context.Drivers.AsQueryable();
            var filteredDrivers = query
                .Where(driver => driver.Name.ToLower().Contains(name.ToLower()))
                .Take(3)
                .ToList();
            return filteredDrivers;
        }
    }
}




