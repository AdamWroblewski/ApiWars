﻿using System.Collections.Generic;
using System.Threading.Tasks;
using apiwars.Models;

namespace apiwars.Repository
{
    public interface IPlanetVoteRepository
    {
        public Task<PlanetVotesModel> AddAsync(PlanetVotesModel model);
        public Task<Dictionary<string, int>> GetAllAsync();
        public Task<int> SaveChangesAsync();
    }
}