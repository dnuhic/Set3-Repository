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

        private bool ProductUserOrderIntertableExists(int id)
        {
            return _context.ProductUserOrderIntertables.Any(e => e.Id == id);
        }
    }
}
