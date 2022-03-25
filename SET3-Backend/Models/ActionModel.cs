using System.ComponentModel.DataAnnotations;

namespace SET3_Backend.Models
{
    public enum ActionModel
    {
        // TODO: Napisite ostale akcije koje radi admin / korisnik koje vam trebaju
        [Display(Name = "SignedUp")]
        SignedUp = 0,
        [Display(Name = "DeletedUser")]
        DeletedUser = 1

    }
}
