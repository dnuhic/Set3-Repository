using System.ComponentModel.DataAnnotations;

namespace SET3_Backend.Models
{
    public class RoleModel {
        
        [Key]
        public int Id { get; set; }
        public RoleType roleType { get; set; }
    }
    public enum RoleType
    {
        Admin = 0,
        User=1
    }
}
