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
    [Route("[controller]")]
    [EnableCors("CorsPolicy")]
    [ApiController]
    public class SecurityQuestionModelsController : ControllerBase
    {
        private readonly Context _context;
        private readonly ILogger<SecurityQuestionModelsController> _logger;

        public SecurityQuestionModelsController(Context context, ILogger<SecurityQuestionModelsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/SecurityQuestionModels // ovo ce se koristiti u check list-i da onaj ko pravi racun izabere security pitanje
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SecurityQuestionModel>>> GetSecurityQuestionModels()
        {
            _logger.LogInformation("Fetching Security Questions");
            return await _context.SecurityQuestionModels.ToListAsync();
        }

        // GET: api/SecurityQuestionModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SecurityQuestionModel>> GetSecurityQuestionModel(int id)
        {
            _logger.LogInformation("Fetching Security Questions for model");
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
            _logger.LogInformation("Putting Security Question model");
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
            _logger.LogInformation("posting Security Question model");
            _context.SecurityQuestionModels.Add(securityQuestionModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSecurityQuestionModel", new { id = securityQuestionModel.Id }, securityQuestionModel);
        }

        // DELETE: api/SecurityQuestionModels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSecurityQuestionModel(int id)
        {
            _logger.LogInformation("Deleting Security Question with id:"+id);
            var securityQuestionModel = await _context.SecurityQuestionModels.FindAsync(id);
            if (securityQuestionModel == null)
            {
                return NotFound();
            }

            _context.SecurityQuestionModels.Remove(securityQuestionModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("{id}/forgotPassword")]//ovo radi jeej
        public async Task<ActionResult<SecurityQuestionModel>> GetSecQuestionOfUser(int id) //ovo je da se nadje security pitanje usera
        {
            _logger.LogInformation("Fetching Security Question for user with id:"+id);
            //return await _context.SecurityQuestionModels.ToListAsync();
            var user = await _context.UserModels.FindAsync(id);
            if(user == null)
            {
                return BadRequest("Nije pronađeno pitanje.");
            }
            Console.WriteLine("JE LI USLO");

            var secQuestion = await _context.SecurityQuestionModels.FindAsync(user.QuestionId);
            return secQuestion;
        
        }

        public class Unos
        {
            public int Id { get; set; }
            public string Answer { get; set; }
        }

        [HttpPost("checkAnswer")]// da projeri je li se odudara odgovor sa onim u bazi
        public async Task<bool> IsAnswerCorrect()
        {
            _logger.LogInformation("Checking answer");
            string proba;

            using (var reader = new StreamReader(Request.Body))
            {
                proba = await reader.ReadToEndAsync();

                // Do something
            } 

            Unos unos = JsonSerializer.Deserialize<Unos>(proba);

            Console.WriteLine(unos.Id);
            Console.WriteLine(unos.Answer);


            var trazeniKorisnik = await _context.UserModels.FindAsync(unos.Id);
            if (trazeniKorisnik == null)
            {
                BadRequest("Ne postoji traženi user");
                return false;
            }

            if (string.Equals(trazeniKorisnik.Answer, unos.Answer)) return true;

            return false;
        }


        private bool SecurityQuestionModelExists(int id)
        {
            return _context.SecurityQuestionModels.Any(e => e.Id == id);
        }

    }
}
