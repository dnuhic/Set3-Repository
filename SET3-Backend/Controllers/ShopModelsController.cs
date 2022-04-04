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
    public class ShopModelsController : ControllerBase
    {
        private readonly Context _context;

        public ShopModelsController(Context context)
        {
            _context = context;
        }

        // GET: api/ShopModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ShopModel>>> GetShopModel()
        {
            return await _context.ShopModels.ToListAsync();
        }

        // GET: api/ShopModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ShopModel>> GetShopModel(int id)
        {
            var shopModel = await _context.ShopModels.FindAsync(id);

            if (shopModel == null)
            {
                return NotFound();
            }

            return shopModel;
        }

        // PUT: api/ShopModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutShopModel(int id,[FromBody] ShopModel shopModel)
        {
            if (id != shopModel.Id)
                return BadRequest("Url id and body id do not match");
            if(_context.StockModel.Where(s => s.Id == shopModel.StockId).Count() == 0)
                return BadRequest("Selected wearhouse does not exist.");

            _context.ShopModel.Update(shopModel);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShopModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }

        // POST: api/ShopModels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ShopModel>> PostShopModel(ShopModel shopModel)
        {
            _context.ShopModels.Add(shopModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetShopModel", new { id = shopModel.Id }, shopModel);
        }

        // DELETE: api/ShopModels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShopModel(int id)
        {
            var shopModel = await _context.ShopModels.FindAsync(id);
            if (shopModel == null)
            {
                return NotFound();
            }

            _context.ShopModels.Remove(shopModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ShopModelExists(int id)
        {
            return _context.ShopModels.Any(e => e.Id == id);
        }
    }
}
