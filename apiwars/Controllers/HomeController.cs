using System;
using System.Diagnostics;
using System.Threading.Tasks;
using apiwars.Models;
using apiwars.Repository;
using apiwars.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace apiwars.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IPlanetVoteRepository _planetVoteRepository;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;

        public HomeController(ILogger<HomeController> logger,
            IPlanetVoteRepository planetVoteRepository,
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager)
        {
            _logger = logger;
            _planetVoteRepository = planetVoteRepository;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> VoteToPlanet([FromQuery] int planetId, [FromQuery] string planetName)
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

        public async Task<IActionResult> GetPlanetVotes()
        {
            var planetVotes = await _planetVoteRepository.GetAllAsync();
            return Json(planetVotes);
        }
        [HttpPost]
        public async Task<IActionResult> RegisterUser(RegisterViewModel viewModel)
        {
            if (ModelState.IsValid)
            {
                var user = new IdentityUser
                    {UserName = viewModel.UserName, Email = viewModel.EmailAddress, EmailConfirmed = true};
                IdentityResult result = null;

                try
                {
                    result = await _userManager.CreateAsync(user, viewModel.Password);
                }
                catch (SqlException exception)
                {
                    _logger.LogCritical(exception.Message);
                    ModelState.AddModelError("", "Db connection problem!");
                }
                catch (DbUpdateException exception)
                {
                    _logger.LogCritical(exception.Message);
                    ModelState.AddModelError("", "Record creation problem!");
                }

                foreach (var error in result.Errors)
                {
                    _logger.LogWarning(error.Description);
                    ModelState.AddModelError("", error.Description);
                }
            }

            return RedirectToAction("Index");
        }

        public async Task<IActionResult> Login(LoginViewModel viewModel)
        {
            if (ModelState.IsValid)
            {
                IdentityUser user = null;

                try
                {
                    user = await _userManager.FindByNameAsync(viewModel.UserName);
                }
                catch (SqlException exception)
                {
                    _logger.LogCritical(exception.Message);
                    ModelState.AddModelError("", "Db connection problem!");
                }

                if (user != null && await _userManager.CheckPasswordAsync(user, viewModel.Password))
                {
                    await _signInManager.SignInAsync(user, isPersistent: false);

                    return RedirectToAction("Index");
                }
            }

            return RedirectToAction("Index");
        }

        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return RedirectToAction("Index");
        }

        public async Task<IActionResult> IsUserLogged()
        {
            if (await _userManager.GetUserAsync(User) != null)
            {
                return Ok();
            }
            return NoContent();
        }

        public async Task<IActionResult> GetPlanetStatisticVotes()
        {
            PlanetVotesViewModel viewModel = new PlanetVotesViewModel();
            try
            {
                viewModel.PlanetVotes = await _planetVoteRepository.GetAllAsync();
            }
            catch (SqlException exception)
            {
                _logger.LogCritical(exception.Message);
                ModelState.AddModelError("", "Db connection problem!");
            }

            return Json(viewModel);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel {RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier});
        }
    }
}