#nullable disable
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SET3_Backend.Database;
using SET3_Backend.Models;

namespace SET3_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderModelsController : ControllerBase
    {
        private readonly Context _context;
        private readonly IConfiguration _configuration;

        public OrderModelsController(Context context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // GET: api/OrderModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderModel>>> GetOrderModels()
        {
            return await _context.OrderModels.ToListAsync();
        }

        // GET: api/OrderModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderModel>> GetOrderModel(int id)
        {
            var orderModel = await _context.OrderModels.FindAsync(id);

            if (orderModel == null)
            {
                return NotFound();
            }

            return orderModel;
        }

        // PUT: api/OrderModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrderModel(int id, OrderModel orderModel)
        {
            if (id != orderModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(orderModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/OrderModels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<OrderModel>> PostOrderModel(OrderModel orderModel)
        {
            _context.OrderModels.Add(orderModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrderModel", new { id = orderModel.Id }, orderModel);
        }

        public class ForAddingNewOrder
        {
            public int ShopId { get; set; }
            public List<int> ProductIds { get; set; }
            public List<int> Quantities { get; set; }
        }

        //POST: api/order/{shopId}
        [HttpPost("order/{shopId}")] //, Authorize(Roles = "StockAdmin,Admin")
        public async Task<ActionResult<List<OrderModel>>> createOrder()
        {
            string proba;
            using (var reader = new StreamReader(Request.Body))
            {
                proba = await reader.ReadToEndAsync();

                // Do something
            }

            ForAddingNewOrder unos = JsonSerializer.Deserialize<ForAddingNewOrder>(proba);

            var products = unos.ProductIds;
            var quantities = unos.Quantities;
            var shopId = unos.ShopId;

            OrderModel badRequest = new OrderModel(-1, DateTime.Now, -1, -1); // da se naznaci da je nevalidno?
            if (products.Count != quantities.Count)
            {
                return BadRequest(badRequest);

                //ovo mora biti ispunjeno jer za Order treba nam za svaki proizvod njegova kolicina bez obzira je li to 0 ili !=0
            }

            List<OrderModel> orderModels = new List<OrderModel>();

            for(int i = 0; i < quantities.Count; i++)
            {
                //validacija: je li kolicina u skladistu manja od kolicine koja se trazi
                if(_context.ProductModels.Find(products[i]).Quantity < quantities[i])
                {
                    return BadRequest(badRequest); 
                }
                var product = await _context.ProductModels.FindAsync(products[i]);
                product.Quantity = product.Quantity - quantities[i];
                _context.ProductModels.Update(product); // prepravka kolicine u skladistu 

                // product shop intertable pravljenje ovdje pada
                try
                {
                    var productInShop = await _context.ProductShopIntertables.Where(x => x.ShopId == shopId && x.ProductId == products[i]).FirstAsync();
                    productInShop.Quantity = productInShop.Quantity + quantities[i];
                    _context.ProductShopIntertables.Update(productInShop);
                }
                catch (Exception ex)
                {
                    _context.ProductShopIntertables.Add(new ProductShopIntertable(shopId, products[i], quantities[i]));
                }
                
                //var productInShop = await _context.ProductShopIntertables

                

                var newOrder = new OrderModel(shopId, DateTime.Now, quantities[i], products[i]);

                _context.OrderModels.Add(newOrder);
                orderModels.Add(newOrder);
               
            }
            await _context.SaveChangesAsync();
            return orderModels;
        }

        // DELETE: api/OrderModels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderModel(int id)
        {
            var orderModel = await _context.OrderModels.FindAsync(id);
            if (orderModel == null)
            {
                return NotFound();
            }

            _context.OrderModels.Remove(orderModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        

        private bool OrderModelExists(int id)
        {
            return _context.OrderModels.Any(e => e.Id == id);
        }

        protected JwtSecurityToken ValidateToken(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            TokenValidationParameters validationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value)),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            };
            try
            {
                handler.ValidateToken(token, validationParameters, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                return jwtToken;
            }
            catch
            {
                return null;
            }
        }
    }
}
