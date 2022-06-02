#nullable disable
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SET3_Backend.Database;
using SET3_Backend.Models;

namespace SET3_Backend.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    [ApiController]
    public class CashRegisterModelsController : ControllerBase
    {
        private readonly Context _context;
        private readonly IConfiguration _configuration;

        public CashRegisterModelsController(Context context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // GET: api/CashRegisterModels
        [HttpGet, Authorize(Roles = "ShopAdmin,Admin")]
        public async Task<ActionResult<IEnumerable<CashRegisterModel>>> GetCashRegisterModel()
        {
            var token = Request.Headers["Authorization"];
            token = token.ToString().Substring(token.ToString().IndexOf(" ") + 1);

            if(ValidateToken(token) != null) 
                return await _context.CashRegisterModels.ToListAsync();
            return BadRequest("Bad token.");
        }

        [HttpGet("cashRegisterFromShop/{id}")]
        public async Task<ActionResult<IEnumerable<CashRegisterModel>>> GetCashRegisterFromShop(int id)
        {
            return await _context.CashRegisterModels.Where(cashRegister => cashRegister.ShopId == id).ToListAsync();
        }

        [HttpGet("notInstalledRegistersForShop/{id}")]
        public async Task<ActionResult<IEnumerable<CashRegisterModel>>> GetNotInstalledCashRegisterFromShop(int id)
        {
            return await _context.CashRegisterModels.Where(cashRegister => cashRegister.ShopId == id && !cashRegister.Installed).ToListAsync();
        }

        // GET: api/CashRegisterModels/5
        [HttpGet("{id}"), Authorize(Roles = "ShopAdmin,Admin")]
        public async Task<ActionResult<CashRegisterModel>> GetCashRegisterModel(int id)
        {
            var token = Request.Headers["Authorization"];
            token = token.ToString().Substring(token.ToString().IndexOf(" ") + 1);

            if (ValidateToken(token) != null)
            {

                var cashRegisterModel = await _context.CashRegisterModels.FindAsync(id);

                if (cashRegisterModel == null)
                {
                    return NotFound();
                }

                return cashRegisterModel;
            }
            return BadRequest("Bad token.");
        }

        // PUT: api/CashRegisterModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}"), Authorize(Roles = "ShopAdmin,Admin")]
        public async Task<IActionResult> PutCashRegisterModel(int id,[FromBody] CashRegisterModel cashRegisterModel)
        {
            var token = Request.Headers["Authorization"];
            token = token.ToString().Substring(token.ToString().IndexOf(" ") + 1);

            if (ValidateToken(token) != null)
            {

                if (id != cashRegisterModel.Id)
                    return BadRequest("Url id and body id do not match");
                if (_context.ShopModels.Where(s => s.Id == cashRegisterModel.ShopId).Count() == 0)
                    return BadRequest("Selected shop does not exist.");

                _context.CashRegisterModels.Update(cashRegisterModel);

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

                return Ok();
            }
            return BadRequest("Bad token.");
        }



        // POST: api/CashRegisterModels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost, Authorize(Roles = "ShopAdmin,Admin")]
        public async Task<ActionResult<CashRegisterModel>> PostCashRegisterModel(CashRegisterModel cashRegisterModel)
        {
            var token = Request.Headers["Authorization"];
            token = token.ToString().Substring(token.ToString().IndexOf(" ") + 1);

            if (ValidateToken(token) != null)
            {
                _context.CashRegisterModels.Add(cashRegisterModel);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetCashRegisterModel", new { id = cashRegisterModel.Id }, cashRegisterModel);
            }
            return BadRequest("Bad token.");
        }

        // DELETE: api/CashRegisterModels/5
        [HttpDelete("{id}"), Authorize(Roles = "ShopAdmin,Admin")]
        public async Task<IActionResult> DeleteCashRegisterModel(int id)
        {
            var token = Request.Headers["Authorization"];
            token = token.ToString().Substring(token.ToString().IndexOf(" ") + 1);

            if (ValidateToken(token) != null)
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
            return BadRequest("Bad token.");
        }

        private bool CashRegisterModelExists(int id)
        {
            return _context.CashRegisterModels.Any(e => e.Id == id);
        }

        protected JwtSecurityToken ValidateToken(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            TokenValidationParameters validationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value)),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            };
            try
            {
                handler.ValidateToken(token, validationParameters, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                return jwtToken;
            }
            catch
            {
                return null;
            }
        }
    }
}
