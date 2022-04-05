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
    public class CashRegisterModelsController : ControllerBase
    {
        private readonly Context _context;

        public CashRegisterModelsController(Context context)
        {
            _context = context;
        }

        // GET: api/CashRegisterModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CashRegisterModel>>> GetCashRegisterModel()
        {
            return await _context.CashRegisterModels.ToListAsync();
        }

        // GET: api/CashRegisterModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CashRegisterModel>> GetCashRegisterModel(int id)
        {
            var cashRegisterModel = await _context.CashRegisterModels.FindAsync(id);

            if (cashRegisterModel == null)
            {
                return NotFound();
            }

            return cashRegisterModel;
        }

        // PUT: api/CashRegisterModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}"),Authorize(Roles="StockAdmin,ShopAdmin")]
        public async Task<IActionResult> PutCashRegisterModel(int id, CashRegisterModel cashRegisterModel)
        {
            if (id != cashRegisterModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(cashRegisterModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CashRegisterModelExists(id))
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

        // POST: api/CashRegisterModels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CashRegisterModel>> PostCashRegisterModel(CashRegisterModel cashRegisterModel)
        {
            _context.CashRegisterModels.Add(cashRegisterModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCashRegisterModel", new { id = cashRegisterModel.Id }, cashRegisterModel);
        }

        // DELETE: api/CashRegisterModels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCashRegisterModel(int id)
        {
            var cashRegisterModel = await _context.CashRegisterModels.FindAsync(id);
            if (cashRegisterModel == null)
            {
                return NotFound();
            }

            _context.CashRegisterModels.Remove(cashRegisterModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CashRegisterModelExists(int id)
        {
            return _context.CashRegisterModels.Any(e => e.Id == id);
        }
    }
}
