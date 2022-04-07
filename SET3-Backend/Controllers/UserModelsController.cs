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
using System.Text.Json;
using System.Security.Cryptography;

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
        [HttpGet(Name = "usermodels"), Authorize(Roles = "Admin,User,StockAdmin,ShopAdmin")]
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
        [HttpGet("{id}"), Authorize(Roles = "Admin,User,StockAdmin,ShopAdmin")]
        public async Task<ActionResult<UserModel>> GetUserModel(int id)
        {
            var token = Request.Headers["Authorization"];
            token = token.ToString().Substring(token.ToString().IndexOf(" ") + 1);

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

            return NoContent();

        }

        // POST: api/UserModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("{id}"), Authorize(Roles = "Admin,User,StockAdmin,ShopAdmin")]
        public async Task<IActionResult> PutUserModel(int id, UserModel userModel)
        {


            var token = Request.Headers["Authorization"];
            token = token.ToString().Substring(token.ToString().IndexOf(" ") + 1);

      
                    if (ValidateToken(token) != null)
                    {
                        if (id != userModel.Id)
                        {
                            return BadRequest();
                        }

                        //_context.Entry(userModel).State = EntityState.Modified;
                        _context.Update(userModel);

                        try
                        {
                            await _context.SaveChangesAsync();
                        }
                        catch (Exception e)
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
                
        
            return NoContent();
        }

        // POST: api/UserModels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost, Authorize(Roles = "Admin")]
        public async Task<ActionResult<UserModel>> PostUserModel(UserModel userModel)
        {
            
            try
            {
                var token = Request.Headers["Authorization"];
                token = token.ToString().Substring(token.ToString().IndexOf(" ") + 1);
                var sha = SHA256.Create();
                userModel.Password = Encoding.ASCII.GetString(sha.ComputeHash(Encoding.ASCII.GetBytes(userModel.Password)));
                if (ValidateToken(token) != null)
                  {
                        _context.UserModels.Add(userModel);
                        await _context.SaveChangesAsync();
                        return CreatedAtAction("GetUserModel", new { id = userModel.Id }, userModel);
                 }
                  else
                    return NoContent();
                
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

            var sha = SHA256.Create();
            var passwordHash = Encoding.ASCII.GetString(sha.ComputeHash(Encoding.ASCII.GetBytes(unos.NewPassword)));

            var user = await _context.UserModels.FindAsync(unos.Id);
            if (user == null)
            {
                return BadRequest();
            }
            user.Password = passwordHash;
            await _context.SaveChangesAsync();
            return Ok(user);
        }
    }
}
