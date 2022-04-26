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
    public class MeasuringUnitsController : ControllerBase
    {
        private readonly Context _context;

        public MeasuringUnitsController(Context context)
        {
            _context = context;
        }

        // GET: api/MeasuringUnits
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MeasuringUnit>>> GetMeasuringUnits()
        {
            return await _context.MeasuringUnits.ToListAsync();
        }

        // GET: api/MeasuringUnits/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MeasuringUnit>> GetMeasuringUnit(int id)
        {
            var measuringUnit = await _context.MeasuringUnits.FindAsync(id);

            if (measuringUnit == null)
            {
                return NotFound();
            }

            return measuringUnit;
        }

        // PUT: api/MeasuringUnits/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMeasuringUnit(int id, MeasuringUnit measuringUnit)
        {
            if (id != measuringUnit.Id)
            {
                return BadRequest();
            }

            _context.Entry(measuringUnit).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MeasuringUnitExists(id))
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

        // POST: api/MeasuringUnits
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MeasuringUnit>> PostMeasuringUnit(MeasuringUnit measuringUnit)
        {
            _context.MeasuringUnits.Add(measuringUnit);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMeasuringUnit", new { id = measuringUnit.Id }, measuringUnit);
        }

        // DELETE: api/MeasuringUnits/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMeasuringUnit(int id)
        {
            var measuringUnit = await _context.MeasuringUnits.FindAsync(id);
            if (measuringUnit == null)
            {
                return NotFound();
            }

            _context.MeasuringUnits.Remove(measuringUnit);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MeasuringUnitExists(int id)
        {
            return _context.MeasuringUnits.Any(e => e.Id == id);
        }
    }
}
