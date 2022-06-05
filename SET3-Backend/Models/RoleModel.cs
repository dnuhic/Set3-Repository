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

        public RoleModel(string roleName, bool readAccess, bool writeAccess, bool deleteAccess)
        {
            RoleName = roleName;
            ReadAccess = readAccess;
            WriteAccess = writeAccess;
            DeleteAccess = deleteAccess;
        }

        public RoleModel(int id, string roleName, bool readAccess, bool writeAccess, bool deleteAccess) : this(roleName, readAccess, writeAccess, deleteAccess)
        {
            Id = id;
        }
    }

    public enum RoleType
    {
        Admin = 0,
        User = 1,
        ShopAdmin = 2, // admin poslovnica
        StockAdmin = 3 //admin skladista

    }
}
