#nullable disable

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SET3_Backend.Database;
using SET3_Backend.Models;
using System.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace SET3_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShopModelsController : ControllerBase
    {
        private readonly Context _context;
        private readonly IConfiguration _configuration;


        public ShopModelsController(Context context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // GET: api/ShopModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ShopModel>>> GetShopModel()
        {
            return await _context.ShopModels.ToListAsync();
        }

        // GET: api/ShopModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ShopModel>> GetShopModel(int id)
        {
            var shopModel = await _context.ShopModels.FindAsync(id);

            if (shopModel == null)
            {
                return NotFound();
            }

            return shopModel;
        }

        // PUT: api/ShopModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutShopModel(int id, ShopModel shopModel)
        {
            if (id != shopModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(shopModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShopModelExists(id))
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

        // POST: api/ShopModels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ShopModel>> PostShopModel(ShopModel shopModel)
        {
            _context.ShopModels.Add(shopModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetShopModel", new { id = shopModel.Id }, shopModel);
        }

        // DELETE: api/ShopModels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShopModel(int id)
        {
            var shopModel = await _context.ShopModels.FindAsync(id);
            if (shopModel == null)
            {
                return NotFound();
            }

            _context.ShopModels.Remove(shopModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("/deleteShop/{id}"), Authorize(Roles = "ShopAdmin")]
        public async Task<ActionResult<ShopModel>> TagAsDeleted(int id)
        {

            var token = Request.Headers["Authorization"];
            token = token.ToString().Substring(token.ToString().IndexOf(" ") + 1);


            if (ValidateToken(token) != null)
            {
                var deletedShop = await _context.ShopModels.FindAsync(id);
                if (deletedShop == null)
                {
                    return deletedShop;
                }
                else
                {
                    //deletedShop.Deleted = true;
                    var deletedCashRegister = await _context.CashRegisterModels.Where(x => x.ShopId == id).ToListAsync<CashRegisterModel>();
                    foreach (var k in deletedCashRegister)
                    {
                        k.Deleted = true;
                        _context.CashRegisterModels.Update(k);

                    }
                    deletedShop.Deleted = true;
                    _context.ShopModels.Update(deletedShop);
                    await _context.SaveChangesAsync();
                }
                    return deletedShop;
     
            }
            else return NoContent();
        }



        private bool ShopModelExists(int id)
        {
            return _context.ShopModels.Any(e => e.Id == id);
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
