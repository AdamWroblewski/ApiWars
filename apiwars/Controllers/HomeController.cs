using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using apiwars.Models;
using apiwars.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Routing;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace apiwars.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IPlanetVoteRepository _planetVoteRepository;
        private readonly UserManager<IdentityUser> _userManager;

        public HomeController(ILogger<HomeController> logger,
            IPlanetVoteRepository planetVoteRepository,
            UserManager<IdentityUser> userManager)
        {
            _logger = logger;
            _planetVoteRepository = planetVoteRepository;
            _userManager = userManager;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> VoteToPlanet([FromQuery]int planetId, [FromQuery]string planetName)
        {
            IdentityUser user = await _userManager.GetUserAsync(User);
            PlanetVotesModel planetVote = new PlanetVotesModel()
            {
                PlanetId = planetId,
                PlanetName = planetName,
                User = user,
                Date = DateTime.Now
            };
            if (await _planetVoteRepository.AddAsync(planetVote) != null)
            {
                try
                {
                    await _planetVoteRepository.SaveChangesAsync();
                }
                catch (SqlException e)
                {
                    return NotFound();
                }
                catch (DbUpdateException e)
                {
                    return NotFound();
                }
                
                return Ok();
            }

            return NotFound();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel {RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier});
        }
    }
}