﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SET3_Backend.Models
{
    public class UserModel
    {

        
        [Key]
        public int Id { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public int QuestionId { get; set; }
        public string Answer { get; set; }
        public bool Deleted { get; set; }
        public string RoleName { get; set; }
        public string TFA { get; set; }

        public UserModel(string email, string firstName, string lastName, string password, int questionId, string answer, bool deleted, string roleName, string tFA)
        {
            Email = email;
            FirstName = firstName;
            LastName = lastName;
            Password = password;
            QuestionId = questionId;
            Answer = answer;
            Deleted = deleted;
            RoleName = roleName;
            TFA = tFA;
        }
    }
}
        
