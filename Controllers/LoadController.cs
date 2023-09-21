using DevExtreme.AspNet.Data;
using Microsoft.AspNetCore.Mvc;
using LoadTracker.Data;
using DevExtreme.AspNet.Mvc;
using DevExtreme.AspNet.Data.ResponseModel;
using LoadTracker.DTOs;
using LoadTracker.Services;

namespace LoadTracker.Controllers
{
    [Route("api/loads")]
    [ApiController]
    public class LoadController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly LoadService _loadService;

        public LoadController(DataContext context, LoadService loadService)
        {
            _context = context;
            _loadService = loadService;
        }

        // Utilizing DevExtreme.AspNet.MVC for the backend processing of the LoadAPI.
        // Since pagination, searching and filtering are too complicated given the short time,
        // it made sense to utlize this feature
        [HttpPost]
        public Task<LoadResult> GetLoads(DataSourceLoadOptions loadOptions)
        {
            return DataSourceLoader.LoadAsync(_context.Loads, loadOptions);
        }

        [HttpPost("assignDriver")]
        public async Task<IActionResult> AssignDriverToLoad([FromBody] AssignDriverToLoadDTO assignDto)
        {
            bool success = await _loadService.AssignDriverToLoadAsync(assignDto);

            if (!success)
            {
                return NotFound(new { error = "Load or driver not found/an internal server error occurred." });
            }

            return Ok(new { message = "Driver assigned to load successfully" });
        }
    }
}

