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

        public async Task<IEnumerable<PlanetVotesModel>> GetAllAsync()
        {
            return await _context.PlanetVotes.ToListAsync();
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }
    }
}