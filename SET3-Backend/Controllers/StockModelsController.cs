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
    public class StockModelsController : ControllerBase
    {
        private readonly Context _context;

        public StockModelsController(Context context)
        {
            _context = context;
        }

        // GET: api/StockModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StockModel>>> GetStockModel()
        {
            return await _context.StockModels.ToListAsync();
        }

        // GET: api/StockModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StockModel>> GetStockModel(int id)
        {
            var stockModel = await _context.StockModels.FindAsync(id);

            if (stockModel == null)
            {
                return NotFound();
            }

            return stockModel;
        }

        // PUT: api/StockModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStockModel(int id, StockModel stockModel)
        {
            if (id != stockModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(stockModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StockModelExists(id))
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

        // POST: api/StockModels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<StockModel>> PostStockModel(StockModel stockModel)
        {
            _context.StockModels.Add(stockModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStockModel", new { id = stockModel.Id }, stockModel);
        }

        // DELETE: api/StockModels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStockModel(int id)
        {
            var stockModel = await _context.StockModels.FindAsync(id);
            if (stockModel == null)
            {
                return NotFound();
            }

            _context.StockModels.Remove(stockModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StockModelExists(int id)
        {
            return _context.StockModels.Any(e => e.Id == id);
        }
    }
}
