﻿using System.ComponentModel.DataAnnotations;

namespace SET3_Backend.Models
{
    public class CategoryModel
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        public int PDV { get; set; }


        public CategoryModel(string name, int pdv)
        {
            Name = name;
            PDV = pdv;
        }
    }

    public enum CategoryType
    {
        Food = 0,
        Hygiene = 1,
        Clothes = 2,
        Other = 3   
    }
}
