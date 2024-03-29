﻿using System.ComponentModel.DataAnnotations;

namespace SET3_Backend.Models
{
    public class OrderModel
    {

        [Key]
        public int Id { get; set; }
        public int ShopId { get; set; }
        public DateTime Date { get; set; }
        public double Quantity { get; set; }
        public int ProductId { get; set; }

        public OrderModel(int shopId, DateTime date, double quantity, int productId)
        {
            ShopId = shopId;
            Date = date;
            Quantity = quantity;
            ProductId = productId;
        }
    }
}
