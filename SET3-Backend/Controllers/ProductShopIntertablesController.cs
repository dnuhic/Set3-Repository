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
    public class ProductShopIntertablesController : ControllerBase
    {
        private readonly Context _context;

        public ProductShopIntertablesController(Context context)
        {
            _context = context;
        }

        // GET: api/ProductShopIntertables
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductShopIntertable>>> GetProductShopIntertables()
        {
            return await _context.ProductShopIntertables.ToListAsync();
        }

        // GET: api/ProductShopIntertables/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductShopIntertable>> GetProductShopIntertable(int id)
        {
            var productShopIntertable = await _context.ProductShopIntertables.FindAsync(id);

            if (productShopIntertable == null)
            {
                return NotFound();
            }

            return productShopIntertable;
        }

        // PUT: api/ProductShopIntertables/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductShopIntertable(int id, ProductShopIntertable productShopIntertable)
        {
            if (id != productShopIntertable.Id)
            {
                return BadRequest();
            }

            _context.Entry(productShopIntertable).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductShopIntertableExists(id))
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

        // POST: api/ProductShopIntertables
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductShopIntertable>> PostProductShopIntertable(ProductShopIntertable productShopIntertable)
        {
            _context.ProductShopIntertables.Add(productShopIntertable);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductShopIntertable", new { id = productShopIntertable.Id }, productShopIntertable);
        }

        // DELETE: api/ProductShopIntertables/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductShopIntertable(int id)
        {
            var productShopIntertable = await _context.ProductShopIntertables.FindAsync(id);
            if (productShopIntertable == null)
            {
                return NotFound();
            }

            _context.ProductShopIntertables.Remove(productShopIntertable);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductShopIntertableExists(int id)
        {
            return _context.ProductShopIntertables.Any(e => e.Id == id);
        }
    }
}
