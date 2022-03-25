using System.ComponentModel.DataAnnotations;

namespace SET3_Backend.Models
{
    public class ActionModel
    {
        // TODO: Napisite ostale akcije koje radi admin / korisnik koje vam trebaju
        [Key]
        public int id { get; set; }
        public ActionType actionType { get; set; }
    }

    public enum ActionType { 
        SignedUp = 0,
        DeletedUser = 1
    }
}
