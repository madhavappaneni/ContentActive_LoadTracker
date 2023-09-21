using Microsoft.AspNetCore.Mvc;
using LoadTracker.Models;
using LoadTracker.Services;

namespace LoadTracker.Controllers
{
    [Route("api/drivers")]
    [ApiController]
    public class DriverController : ControllerBase
    {
        private readonly DriverService _driverService;

        public DriverController(DriverService driverService)
        {
            _driverService = driverService;
        }

        public ActionResult<IEnumerable<Driver>> GetDrivers(string name = "")
        {
            var filteredDrivers = _driverService.GetFilteredDrivers(name);
            return Ok(filteredDrivers);
        }
    }

}
