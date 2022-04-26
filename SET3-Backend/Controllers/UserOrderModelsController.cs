#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SET3_Backend.Database;
using SET3_Backend.Models;

namespace SET3_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserOrderModelsController : ControllerBase
    {
        private readonly Context _context;
        private readonly IConfiguration _configuration;

        public UserOrderModelsController(Context context, IConfiguration configuration)
        {
            _configuration = configuration;
            _context = context;
        }


        #region DataTransferObjects
        public class ProductWithShopQuantityDto {
            public int ProductId { get; set; }
            public string Name { get; set; }
            public string CategoryName { get; set; }
            public double Quantity { get; set; }
            public string Barcode { get; set; }
            public string BarcodeText { get; set; }
            public float Price { get; set; }

            public ProductWithShopQuantityDto(int productId, string name, string categoryName,
                double quantity, string barcode, string barcodeText, float price)
            {
                ProductId = productId;
                Name = name;
                CategoryName = categoryName;
                Quantity = quantity;
                Barcode = barcode;
                BarcodeText = barcodeText;
                Price = price;
            }
        }

        public class ProductQuantityDto
        {
            public int ProductId { get; set; }
            public double Quantity { get; set; }

            public ProductQuantityDto()
            {
            }

            public ProductQuantityDto(int productId, double quantity)
            {
                ProductId = productId;
                Quantity = quantity;
            }
        }

        public class UserOrderDto
        {
            public int ShopId { get; set; }
            public int UserId { get; set; }
            public List<ProductQuantityDto> ProductQuantitys { get; set; }

            public UserOrderDto()
            {
            }

            public UserOrderDto(int shopId, int userId, List<ProductQuantityDto> productQuantitys)
            {
                ShopId = shopId;
                UserId = userId;
                this.ProductQuantitys = productQuantitys;
            }
        }

        #endregion


        [HttpGet("productsFromShop/{id}")]
        public async Task<ActionResult<IEnumerable<ProductWithShopQuantityDto>>> GetProductsFromShop(int id)
        {
            //treba dodati neke provjere ako je lose kreirano u bazi, da nema nesto u tabeli
            List<ProductWithShopQuantityDto> productsDto = new List<ProductWithShopQuantityDto>();

            List<ProductShopIntertable> productShops = await _context.ProductShopIntertables.Where(productShop => productShop.ShopId == id).ToListAsync();
            IEnumerable<Tuple<int, double>> productIds = productShops.Select(productShop => new Tuple<int, double>(productShop.ProductId, productShop.Quantity));

            List<ProductModel> products = await _context.ProductModels.ToListAsync();

            products = products.Where(product => productIds.Where(productId => productId.Item1 == product.Id).Count() > 0).ToList();
            try
            {
                products.ForEach(product =>
                {
                    Tuple<int, double> quantityTuple = productIds.Where(productId => productId.Item1 == product.Id).FirstOrDefault();
                    if (quantityTuple == null)
                        throw new ArgumentException("Greska (Placeholder)");
                    productsDto.Add(new ProductWithShopQuantityDto(product.Id, product.Name, product.CategoryName, quantityTuple.Item2, product.Barcode, product.BarcodeText, product.Price));
                });
            } catch (Exception ex)
            {
                return BadRequest("Greska");
            }

            return productsDto;
        }

        [HttpPost("save")]
        public async Task<ActionResult<UserOrderModel>> SaveUserOrder([FromBody] UserOrderDto userOrderDto)
        {
            //treba dodati provjere za quantity
            UserOrderModel userOrder = new UserOrderModel(DateTime.Now, false, userOrderDto.ShopId, userOrderDto.UserId);
            _context.UserOrderModels.Add(userOrder);
            await _context.SaveChangesAsync();

            List<ProductUserOrderIntertable> products = new List<ProductUserOrderIntertable>();
            userOrderDto.ProductQuantitys.ForEach(productQuantity =>
            {
                products.Add(new ProductUserOrderIntertable(userOrder.Id, productQuantity.ProductId, productQuantity.Quantity));
            });

            await _context.ProductUserOrderIntertables.AddRangeAsync(products);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserOrderModel", new { id = userOrder.Id }, userOrder);
        }

        [HttpPost("finish")]
        public async Task<IActionResult> FinishUserOrder([FromBody] UserOrderDto userOrderDto)
        {
            //treba dodati provjere za quantity
            UserOrderModel userOrder = new UserOrderModel(DateTime.Now, true, userOrderDto.ShopId, userOrderDto.UserId);
            _context.UserOrderModels.Add(userOrder);
            await _context.SaveChangesAsync();

            List<ProductUserOrderIntertable> products = new List<ProductUserOrderIntertable>();
            userOrderDto.ProductQuantitys.ForEach(productQuantity =>
            {
                products.Add(new ProductUserOrderIntertable(userOrder.Id, productQuantity.ProductId, productQuantity.Quantity));
            });

            await _context.ProductUserOrderIntertables.AddRangeAsync(products);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserOrderModel", new { id = userOrder.Id }, userOrder);
        }

        // GET: api/UserOrderModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserOrderModel>>> GetUserOrderModels()
        {
            return await _context.UserOrderModels.ToListAsync();
        }

        // GET: api/UserOrderModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserOrderModel>> GetUserOrderModel(int id)
        {
            var userOrderModel = await _context.UserOrderModels.FindAsync(id);

            if (userOrderModel == null)
            {
                return NotFound();
            }

            return userOrderModel;
        }

        // PUT: api/UserOrderModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserOrderModel(int id, UserOrderModel userOrderModel)
        {
            if (id != userOrderModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(userOrderModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserOrderModelExists(id))
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

        //// POST: api/UserOrderModels
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost]
        //public async Task<ActionResult<UserOrderModel>> PostUserOrderModel(UserOrderModel userOrderModel)
        //{
        //    _context.UserOrderModels.Add(userOrderModel);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetUserOrderModel", new { id = userOrderModel.Id }, userOrderModel);
        //}

        // DELETE: api/UserOrderModels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserOrderModel(int id)
        {
            var userOrderModel = await _context.UserOrderModels.FindAsync(id);
            if (userOrderModel == null)
            {
                return NotFound();
            }

            _context.UserOrderModels.Remove(userOrderModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserOrderModelExists(int id)
        {
            return _context.UserOrderModels.Any(e => e.Id == id);
        }
    }
}
