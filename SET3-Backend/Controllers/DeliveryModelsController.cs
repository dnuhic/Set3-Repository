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
    public class DeliveryModelsController : ControllerBase
    {
        private readonly Context _context;

        public DeliveryModelsController(Context context)
        {
            _context = context;
        }

        // GET: api/DeliveryModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DeliveryModel>>> GetDeliveryModels()
        {
            return await _context.DeliveryModels.ToListAsync();
        }

        // GET: api/DeliveryModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DeliveryModel>> GetDeliveryModel(int id)
        {
            var deliveryModel = await _context.DeliveryModels.FindAsync(id);

            if (deliveryModel == null)
            {
                return NotFound();
            }

            return deliveryModel;
        }

        // PUT: api/DeliveryModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDeliveryModel(int id, DeliveryModel deliveryModel)
        {
            if (id != deliveryModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(deliveryModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DeliveryModelExists(id))
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

        // POST: api/DeliveryModels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DeliveryModel>> PostDeliveryModel(DeliveryModel deliveryModel)
        {
            _context.DeliveryModels.Add(deliveryModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDeliveryModel", new { id = deliveryModel.Id }, deliveryModel);
        }

        // DELETE: api/DeliveryModels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDeliveryModel(int id)
        {
            var deliveryModel = await _context.DeliveryModels.FindAsync(id);
            if (deliveryModel == null)
            {
                return NotFound();
            }

            _context.DeliveryModels.Remove(deliveryModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DeliveryModelExists(int id)
        {
            return _context.DeliveryModels.Any(e => e.Id == id);
        }
    }
}
