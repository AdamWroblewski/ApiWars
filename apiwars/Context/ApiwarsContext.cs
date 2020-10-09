using apiwars.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace apiwars.Context
{
    public class ApiwarsContext : IdentityDbContext
    {
        public DbSet<PlanetVotesModel> PlanetVotes { get; set; }
        
        public ApiwarsContext(DbContextOptions<ApiwarsContext> options) : base(options)
        {
        }
    }
}