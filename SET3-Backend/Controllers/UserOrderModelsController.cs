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
    public class UserOrderModelsController : ControllerBase
    {
        private readonly Context _context;

        public UserOrderModelsController(Context context)
        {
            _context = context;
        }

        // GET: api/UserOrderModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserOrderModel>>> GetUserOrderModels()
        {
            return await _context.UserOrderModels.ToListAsync();
        }

        // GET: api/UserOrderModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserOrderModel>> GetUserOrderModel(int id)
        {
            var userOrderModel = await _context.UserOrderModels.FindAsync(id);

            if (userOrderModel == null)
            {
                return NotFound();
            }

            return userOrderModel;
        }

        // PUT: api/UserOrderModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserOrderModel(int id, UserOrderModel userOrderModel)
        {
            if (id != userOrderModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(userOrderModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserOrderModelExists(id))
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

        // POST: api/UserOrderModels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UserOrderModel>> PostUserOrderModel(UserOrderModel userOrderModel)
        {
            _context.UserOrderModels.Add(userOrderModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserOrderModel", new { id = userOrderModel.Id }, userOrderModel);
        }

        // DELETE: api/UserOrderModels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserOrderModel(int id)
        {
            var userOrderModel = await _context.UserOrderModels.FindAsync(id);
            if (userOrderModel == null)
            {
                return NotFound();
            }

            _context.UserOrderModels.Remove(userOrderModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserOrderModelExists(int id)
        {
            return _context.UserOrderModels.Any(e => e.Id == id);
        }
    }
}
