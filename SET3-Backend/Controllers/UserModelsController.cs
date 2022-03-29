#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SET3_Backend.Database;
using SET3_Backend.Models;

namespace SET3_Backend.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("[controller]")]
    [ApiController]
    public class UserModelsController : ControllerBase
    {
        private readonly Context _context;

        public UserModelsController(Context context)
        {
            _context = context;
        }

        // GET: /userModels
        [HttpGet(Name = "usermodels")]
        public IEnumerable<UserModel> GetUserModels()
        {
            var data = _context.UserModels.AsNoTracking().ToArray();
            Console.WriteLine("OVO POGLEDAJ" + data);
            return data;
        }

        // GET: /usermodels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserModel>> GetUserModel(int id)
        {
            var userModel = await _context.UserModels.FindAsync(id);

            if (userModel == null)
            {
                return NotFound();
            }

            return userModel;
        }

        // PUT: api/UserModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserModel(int id, UserModel userModel)
        {
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

            return NoContent();
        }

        // POST: api/UserModels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UserModel>> PostUserModel(UserModel userModel)
        {
            _context.UserModels.Add(userModel);
            await _context.SaveChangesAsync();

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

            return NoContent();
        }

        public class ZaPromjenuSifre
        {
            public int Id { get; set; }
            public string NewPassword { get; set; }
        }

        [HttpPost(("changePassword"))] //mijenja sifru usera u bazi
        public async Task<ActionResult<UserModel>> changePassword()
        {
            string proba;

            Console.WriteLine("USJE LI OVDJE??");

            using (var reader = new StreamReader(Request.Body))
            {
                proba = await reader.ReadToEndAsync();

                // Do something
            }

            ZaPromjenuSifre unos = JsonSerializer.Deserialize<ZaPromjenuSifre>(proba);

            Console.WriteLine(unos.Id);
            Console.WriteLine(unos.NewPassword);

            var user = await _context.UserModels.FindAsync(unos.Id);
            if (user == null)
            {
                return BadRequest();
            }
            user.Password = unos.NewPassword;
            await _context.SaveChangesAsync();
            return Ok(user);
        }

        private bool UserModelExists(int id)
        {
            return _context.UserModels.Any(e => e.Id == id);
        }
    }
}
