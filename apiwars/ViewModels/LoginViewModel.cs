using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace apiwars.ViewModels
{
    public class LoginViewModel
    {
        [Required]
        [DisplayName("User name")]
        public string UserName { get; set; }
        
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}