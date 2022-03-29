#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SET3_Backend.Database;
using SET3_Backend.Models;

namespace SET3_Backend.Controllers
{
    [Route("[controller]")]
    [EnableCors("CorsPolicy")]
    [ApiController]
    public class UserModelsController : ControllerBase
    {
        private readonly Context _context;
        private readonly ILogger<UserModelsController> _logger;

        public UserModelsController(Context context, ILogger<UserModelsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: /userModels
        [HttpGet(Name = "usermodels")]
        public IEnumerable<UserModel> GetUserModels()
        {
            var data = _context.UserModels.AsNoTracking().ToArray();
            return data;
        }

        // GET: /usermodels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserModel>> GetUserModel(int id)
        {
            _logger.LogInformation("Fetching UserModel started");
            var userModel = await _context.UserModels.FindAsync(id);

            if (userModel == null)
            {
                return NotFound();
            }
            _logger.LogInformation("Fetching UserModel ended");
            return userModel;
        }

        // PUT: api/UserModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserModel(int id, UserModel userModel)
        {
            _logger.LogInformation("Put UserModel started");
            if (id != userModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(userModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            _logger.LogInformation("Put UserModel ended");
            return NoContent();
        }

        // POST: api/UserModels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UserModel>> PostUserModel(UserModel userModel)
        {
            _context.UserModels.Add(userModel);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Succesfully added new UserModel");
            return CreatedAtAction("GetUserModel", new { id = userModel.Id }, userModel);
        }

        // DELETE: api/UserModels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserModel(int id)
        {
            var userModel = await _context.UserModels.FindAsync(id);
            if (userModel == null)
            {
                return NotFound();
            }

            _context.UserModels.Remove(userModel);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Succesfully deleted UserModel");
            return NoContent();
        }

        private bool UserModelExists(int id)
        {
            return _context.UserModels.Any(e => e.Id == id);
        }

        public string DecryptString(string encrString)
        {
            byte[] b;
            string decrypted;
            try
            {
                b = Convert.FromBase64String(encrString);
                decrypted = System.Text.ASCIIEncoding.ASCII.GetString(b);
            }
            catch (FormatException fe)
            {
                decrypted = "";
            }
            return decrypted;
        }

        public string EnryptString(string strEncrypted)
        {
            byte[] b = System.Text.ASCIIEncoding.ASCII.GetBytes(strEncrypted);
            string encrypted = Convert.ToBase64String(b);
            return encrypted;
        }
    }
}
