#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;
using SET3_Backend.Database;
using SET3_Backend.Models;
using SET3_Backend.Controllers;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authorization;

namespace SET3_Backend.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("[controller]")]
    [ApiController]
    public class UserModelsController : ControllerBase
    {

        private readonly Context _context;
        private readonly IConfiguration _configuration;
        private readonly ILogger<UserModelsController> _logger;

        //public UserModelsController(Context context, IConfiguration configuration, ILogger<UserModelsController> logger)

        public UserModelsController(Context context, IConfiguration configuration)
        {
            _configuration = configuration;
            _context = context;
        }

        // GET: /userModels
        [HttpGet(Name = "usermodels"), Authorize(Roles = "Admin, User")]
        public IEnumerable<UserModel> GetUserModels()
        {

            //treba uzet token i pozvati ValidateToken, ako je validan nastaviti, a ako ne samo nek preskoci da vrati bad result
            var token = Request.Headers["Authorization"];
            token = token.ToString().Substring(token.ToString().IndexOf(" ")+1);

            if (ValidateToken(token) != null)
            {
                var data = _context.UserModels.AsNoTracking().ToArray();
                Console.WriteLine("OVO POGLEDAJ" + data);
                return data;
            }
            
            return Enumerable.Empty<UserModel>();
            
            
        }

        // GET: /usermodels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserModel>> GetUserModel(int id)
        {
            try
            {
                String token = Request.Cookies.Where(c => c.Key == "jwt").Select(c => c.Value).First();

                if (token != null)
                {
                    if (ValidateToken(token) != null)
                    {
                        var userModel = await _context.UserModels.FindAsync(id);
                        if (userModel == null)
                        {
                            return NotFound();
                        }

                            return userModel;
                    }
                    else
                        return NoContent();
                }
            }
            catch (Exception ex)
            {
                return NoContent();
            }
            return NoContent();

        }

        // PUT: api/UserModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserModel(int id, UserModel userModel)
        {
            

            try
            {
                
                    String token = Request.Cookies.Where(c => c.Key == "jwt").Select(c => c.Value).First();

                if (token != null)
                {
                    if (ValidateToken(token) != null)
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
                    }
                    else return NoContent();
                }
            }

            catch (Exception ex)
            {
                return NoContent();
            }
            return NoContent();
        }

        // POST: api/UserModels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UserModel>> PostUserModel(UserModel userModel)
        {
            
            try
            {
                String token = Request.Cookies.Where(c => c.Key == "jwt").Select(c => c.Value).First();

                if (token != null)
                {
                    if (ValidateToken(token) != null)
                    {
                        _context.UserModels.Add(userModel);
                        await _context.SaveChangesAsync();
                        return CreatedAtAction("GetUserModel", new { id = userModel.Id }, userModel);
                    }
                    else
                        return NoContent();
                }
            }
            catch (Exception ex)
            {
                return NoContent();
            }
            return NoContent();
        }

        // DELETE: api/UserModels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserModel(int id)
        {
            
                try
                {
                 
                    String token = Request.Cookies.Where(c => c.Key == "jwt").Select(c => c.Value).First();

                if (token != null)
                {
                    if (ValidateToken(token) != null)
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
                else
                    return NoContent();
                }
            }
            catch (Exception ex)
            {
                return NoContent();
            }
            return NoContent();


}

private bool UserModelExists(int id)
        {
            return _context.UserModels.Any(e => e.Id == id);
        }
        public JwtSecurityToken ValidateToken(string token)
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
