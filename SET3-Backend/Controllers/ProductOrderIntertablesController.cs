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
    public class ProductOrderIntertablesController : ControllerBase
    {
        private readonly Context _context;

        public ProductOrderIntertablesController(Context context)
        {
            _context = context;
        }

        // GET: api/ProductOrderIntertables
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductOrderIntertable>>> GetProductOrderIntertables()
        {
            return await _context.ProductOrderIntertables.ToListAsync();
        }

        // GET: api/ProductOrderIntertables/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductOrderIntertable>> GetProductOrderIntertable(int id)
        {
            var productOrderIntertable = await _context.ProductOrderIntertables.FindAsync(id);

            if (productOrderIntertable == null)
            {
                return NotFound();
            }

            return productOrderIntertable;
        }

        // PUT: api/ProductOrderIntertables/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductOrderIntertable(int id, ProductOrderIntertable productOrderIntertable)
        {
            if (id != productOrderIntertable.Id)
            {
                return BadRequest();
            }

            _context.Entry(productOrderIntertable).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductOrderIntertableExists(id))
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

        // POST: api/ProductOrderIntertables
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductOrderIntertable>> PostProductOrderIntertable(ProductOrderIntertable productOrderIntertable)
        {
            _context.ProductOrderIntertables.Add(productOrderIntertable);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductOrderIntertable", new { id = productOrderIntertable.Id }, productOrderIntertable);
        }

        // DELETE: api/ProductOrderIntertables/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductOrderIntertable(int id)
        {
            var productOrderIntertable = await _context.ProductOrderIntertables.FindAsync(id);
            if (productOrderIntertable == null)
            {
                return NotFound();
            }

            _context.ProductOrderIntertables.Remove(productOrderIntertable);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductOrderIntertableExists(int id)
        {
            return _context.ProductOrderIntertables.Any(e => e.Id == id);
        }
    }
}
