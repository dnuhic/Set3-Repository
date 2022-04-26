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
    public class ProductUserOrderIntertablesController : ControllerBase
    {
        private readonly Context _context;

        public ProductUserOrderIntertablesController(Context context)
        {
            _context = context;
        }

        // GET: api/ProductUserOrderIntertables
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductUserOrderIntertable>>> GetProductUserOrderIntertables()
        {
            return await _context.ProductUserOrderIntertables.ToListAsync();
        }

        // GET: api/ProductUserOrderIntertables/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductUserOrderIntertable>> GetProductUserOrderIntertable(int id)
        {
            var productUserOrderIntertable = await _context.ProductUserOrderIntertables.FindAsync(id);

            if (productUserOrderIntertable == null)
            {
                return NotFound();
            }

            return productUserOrderIntertable;
        }

        // PUT: api/ProductUserOrderIntertables/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductUserOrderIntertable(int id, ProductUserOrderIntertable productUserOrderIntertable)
        {
            if (id != productUserOrderIntertable.Id)
            {
                return BadRequest();
            }

            _context.Entry(productUserOrderIntertable).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductUserOrderIntertableExists(id))
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

        // POST: api/ProductUserOrderIntertables
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductUserOrderIntertable>> PostProductUserOrderIntertable(ProductUserOrderIntertable productUserOrderIntertable)
        {
            _context.ProductUserOrderIntertables.Add(productUserOrderIntertable);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductUserOrderIntertable", new { id = productUserOrderIntertable.Id }, productUserOrderIntertable);
        }

        // DELETE: api/ProductUserOrderIntertables/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductUserOrderIntertable(int id)
        {
            var productUserOrderIntertable = await _context.ProductUserOrderIntertables.FindAsync(id);
            if (productUserOrderIntertable == null)
            {
                return NotFound();
            }

            _context.ProductUserOrderIntertables.Remove(productUserOrderIntertable);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/ProductUserOrderIntertables/bill
        [HttpPost("bill")]
        public async Task<ActionResult<BillModel>> GetBill(BillGetData billGetData)
        {
            UserOrderModel model = await _context.UserOrderModels.FindAsync(billGetData.UserOrderId);
            UserModel userModel = await _context.UserModels.FindAsync(billGetData.CurrentUserId);
            ShopModel shopModel = await _context.ShopModels.FindAsync(billGetData.ShopId);
            CashRegisterModel cashRegisterModel = await _context.CashRegisterModels.FindAsync(billGetData.CashRegisterId);
            List<ProductModel> allProductModels = await _context.ProductModels.ToListAsync();

            List<BillItem> billItems = new List<BillItem>();
            List<ProductUserOrderIntertable> productUserOrderIntertables = await _context.ProductUserOrderIntertables.ToListAsync();
            productUserOrderIntertables = productUserOrderIntertables.FindAll(x => x.UserOrderId == billGetData.UserOrderId);
            foreach(var productUserOrderIntertable in productUserOrderIntertables)
            {
                var product = allProductModels.Find(p => p.Id == productUserOrderIntertable.ProductId);
                billItems.Add(new BillItem(product.Name, product.Quantity, "OVO PROMIJENITI KAD SE MERGA", 0.17, product.Price));

            }

            BillInfo billInfo = new BillInfo(model.Id.ToString(), model.UpdatedDate.ToString(), shopModel.Name,shopModel.Adress, cashRegisterModel.Name);
            BillSupplier billSupplier = new BillSupplier(userModel.FirstName, userModel.LastName, userModel.Email);

            return new BillModel(billInfo, billItems, billSupplier);

            

        }

        private bool ProductUserOrderIntertableExists(int id)
        {
            return _context.ProductUserOrderIntertables.Any(e => e.Id == id);
        }
    }
}
