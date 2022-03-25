using System.ComponentModel.DataAnnotations;

namespace SET3_Backend.Models
{
    public enum RoleModel
    {
        [Display(Name="Admin")]
        Admin = 0,
        [Display(Name ="User")]
        User=1
    }
}
