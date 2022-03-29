using System.ComponentModel.DataAnnotations;

namespace SET3_Backend.Models
{
    public class RoleModel {
        
        [Key]
        public int Id { get; set; }
        public RoleType RoleType { get; set; }

        public RoleModel() { }
        public RoleModel(RoleType roleType)
        {
            this.RoleType = roleType;
        }
    }
    public enum RoleType
    {
        Admin = 0,
        User = 1
    }
}
