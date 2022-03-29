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
    public class SecurityQuestionModelsController : ControllerBase
    {
        private readonly Context _context;

        public SecurityQuestionModelsController(Context context)
        {
            _context = context;
        }

        // GET: api/SecurityQuestionModels // ovo ce se koristiti u check list-i da onaj ko pravi racun izabere security pitanje
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SecurityQuestionModel>>> GetSecurityQuestionModels()
        {
            return await _context.SecurityQuestionModels.ToListAsync();
        }

        // GET: api/SecurityQuestionModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SecurityQuestionModel>> GetSecurityQuestionModel(int id)
        {
            var securityQuestionModel = await _context.SecurityQuestionModels.FindAsync(id);

            if (securityQuestionModel == null)
            {
                return NotFound();
            }

            return securityQuestionModel;
        }

        // PUT: api/SecurityQuestionModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSecurityQuestionModel(int id, SecurityQuestionModel securityQuestionModel)
        {
            if (id != securityQuestionModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(securityQuestionModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SecurityQuestionModelExists(id))
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

        // POST: api/SecurityQuestionModels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SecurityQuestionModel>> PostSecurityQuestionModel(SecurityQuestionModel securityQuestionModel)
        {
            _context.SecurityQuestionModels.Add(securityQuestionModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSecurityQuestionModel", new { id = securityQuestionModel.Id }, securityQuestionModel);
        }

        // DELETE: api/SecurityQuestionModels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSecurityQuestionModel(int id)
        {
            var securityQuestionModel = await _context.SecurityQuestionModels.FindAsync(id);
            if (securityQuestionModel == null)
            {
                return NotFound();
            }

            _context.SecurityQuestionModels.Remove(securityQuestionModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("{id}")]
        [Route("forgotPassword")] //provjeriti ovo lol
        public async Task<ActionResult<SecurityQuestionModel>> GetSecQuestionOfUser(UserModel user) //ovo je da se nadje security pitanje usera
        {
            var securityQuestion = await _context.UserModels.FindAsync(user.QuestionId);
            if(securityQuestion == null)
            {
                return BadRequest("Nije pronađeno pitanje.");
            }
            return Ok(securityQuestion);
        
        }

        [HttpGet("{answer}")]
        [Route("checkingAnswer")] // da projeri je li se odudara odgovor sa onim u bazi
        public async Task<bool> IsAnswerCorrect(UserModel user, string answer)
        {
            var trazeniKorisni = await _context.UserModels.FindAsync(user);
            if(trazeniKorisni == null)
            {
                BadRequest("Ne postoji traženi user");
                return false;
            }

            if (string.Equals(user.Answer, answer)) return true;

            return false;
        }


        private bool SecurityQuestionModelExists(int id)
        {
            return _context.SecurityQuestionModels.Any(e => e.Id == id);
        }

    }
}
