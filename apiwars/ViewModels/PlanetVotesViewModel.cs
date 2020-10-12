using System.Collections.Generic;
using apiwars.Models;

namespace apiwars.ViewModels
{
    public class PlanetVotesViewModel
    {
        public IEnumerable<PlanetVotesModel> PlanetVotes { get; set; }
    }
}