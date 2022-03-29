using System.ComponentModel.DataAnnotations;

namespace SET3_Backend.Models
{
    public class RoleModel {
        
        [Key]
        public int Id { get; set; }
        public string RoleName { get; set; }
        public Boolean ReadAccess  { get; set; }   
        public Boolean WriteAccess  { get; set; } 
        public Boolean DeleteAccess  { get; set; } 

    }    
}
