#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SET3_Backend.Database;
using SET3_Backend.Models;

namespace SET3_Backend.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    [ApiController]
    public class RoleModelsController : ControllerBase
    {
        private readonly Context _context;

        public RoleModelsController(Context context)
        {
            _context = context;
        }

        // GET: api/RoleModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoleModel>>> GetRoleModels()
        {
            return await _context.RoleModels.ToListAsync();
        }

        // GET: api/RoleModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RoleModel>> GetRoleModel(int id)
        {
            var roleModel = await _context.RoleModels.FindAsync(id);

            if (roleModel == null)
            {
                return NotFound();
            }

            return roleModel;
        }

        // PUT: api/RoleModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRoleModel(int id, RoleModel roleModel)
        {
            if (id != roleModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(roleModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoleModelExists(id))
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

        // POST: api/RoleModels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RoleModel>> PostRoleModel(RoleModel roleModel)
        {
            _context.RoleModels.Add(roleModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRoleModel", new { id = roleModel.Id }, roleModel);
        }

        // DELETE: api/RoleModels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoleModel(int id)
        {
            var roleModel = await _context.RoleModels.FindAsync(id);
            if (roleModel == null)
            {
                return NotFound();
            }

            _context.RoleModels.Remove(roleModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RoleModelExists(int id)
        {
            return _context.RoleModels.Any(e => e.Id == id);
        }
    }
}
