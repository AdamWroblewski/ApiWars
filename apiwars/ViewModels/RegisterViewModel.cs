using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace apiwars.ViewModels
{
    public class RegisterViewModel
    {
        [Required]
        [RegularExpression("^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$",
            ErrorMessage = "{0} can contain only letters and numbers")]
        [DisplayName("User name")]
        [Remote("IsUserNameUnique", "Home")]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [StringLength(100, ErrorMessage = "{0} musi mieć przynajmniej {2} znaków.", MinimumLength = 8)]
        [RegularExpression("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
            ErrorMessage =
                "Password must:<br />-contain one capital letter (A-Z)<br />-contain one lowercase letter (a-z)<br />-one number (0-9) <br />-contain one special symbol (np. !@#$%^&*)")]
        [DisplayName("Confirm password")]
        public string Password { get; set; }

        [Required]
        [Compare("Password", ErrorMessage = "Passwords has to be the same")]
        [DataType(DataType.Password)]
        [DisplayName("Confirm password")]
        public string ConfirmPassword { get; set; }
    }
}