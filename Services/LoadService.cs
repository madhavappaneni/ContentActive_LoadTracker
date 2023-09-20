using LoadTracker.Data;
using LoadTracker.DTOs;

namespace LoadTracker.Services
{
    public class LoadService
    {
        private readonly DataContext _context;

        public LoadService(DataContext context)
        {
            _context = context;
        }

        public async Task<bool> AssignDriverToLoadAsync(AssignDriverToLoadDTO assignDto)
        {
            try
            {
                var load = _context.Loads.Find(assignDto.LoadId);
                var driver = _context.Drivers.Find(assignDto.DriverId);

                if (load == null || driver == null)
                {
                    return false;
                }

                load.DriverId = assignDto.DriverId;
                load.ModifiedDateTime = DateTime.Now;

                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                // Can handle exception
                return false;
            }
        }
    }
}
