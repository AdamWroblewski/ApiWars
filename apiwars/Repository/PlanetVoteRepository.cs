using System.Collections.Generic;
using System.Threading.Tasks;
using apiwars.Context;
using apiwars.Models;
using Microsoft.EntityFrameworkCore;

namespace apiwars.Repository
{
    public class PlanetVoteRepository : IPlanetVoteRepository
    {
        private readonly ApiwarsContext _context;

        public PlanetVoteRepository(ApiwarsContext context)
        {
            _context = context;
        }

        public async Task<PlanetVotesModel> AddAsync(PlanetVotesModel model)
        {
            await _context.PlanetVotes.AddAsync(model);
            return model;
        }

        public async Task<Dictionary<string, int>> GetAllAsync()
        {
            var result = await _context.PlanetVotes.ToListAsync();
            Dictionary<string, int> planetVotes = new Dictionary<string, int>();
            foreach (var planetVote in result)
            {
                if (!planetVotes.ContainsKey(planetVote.PlanetName.ToString()))
                {
                    planetVotes.Add(planetVote.PlanetName, 1);
                }
                else
                {
                    planetVotes[planetVote.PlanetName] = planetVotes[planetVote.PlanetName] + 1;
                }
            }

            return planetVotes;
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }
    }
}