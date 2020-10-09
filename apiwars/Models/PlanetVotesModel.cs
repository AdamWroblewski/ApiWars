using System;
using Microsoft.AspNetCore.Identity;

namespace apiwars.Models
{
    public class PlanetVotesModel
    {
        public int Id { get; set; }
        public int PlanetId { get; set; }
        public string PlanetName { get; set; }
        public IdentityUser User { get; set; }
        public DateTime Date { get; set; }
    }
}