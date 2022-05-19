#nullable disable

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SET3_Backend.Database;
using SET3_Backend.Models;
using System.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Text.Json;

namespace SET3_Backend.Controllers
{
    [Route("[controller]")]
    [EnableCors("CorsPolicy")]
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

        // GET: ShopModels
        [HttpGet, Authorize(Roles = "ShopAdmin,Admin,StockAdmin")]
        public async Task<ActionResult<IEnumerable<ShopModel>>> GetShopModel()
        {
            var token = Request.Headers["Authorization"];
            token = token.ToString().Substring(token.ToString().IndexOf(" ") + 1);

            if(ValidateToken(token) != null)
            {

                var nesto =  await _context.ShopModels.ToListAsync();
                return nesto;
            }
            return BadRequest("Bad token.");
        }

        [HttpGet("notDeletedShops")]
        public async Task<ActionResult<IEnumerable<ShopModel>>> GetNotDeletedShops()
        {
            return await _context.ShopModels.Where(shop => !shop.Deleted).ToListAsync();
        }

        // GET: ShopModels/5
        [HttpGet("{id}"), Authorize(Roles = "ShopAdmin,Admin")]
        public async Task<ActionResult<ShopModel>> GetShopModel(int id)
        {
            var token = Request.Headers["Authorization"];
            token = token.ToString().Substring(token.ToString().IndexOf(" ") + 1);

            if (ValidateToken(token) != null)
            {
                var shopModel = await _context.ShopModels.FindAsync(id);

                if (shopModel == null)
                {
                    return NotFound();
                }

                return shopModel;
            }
            return BadRequest("Bad token");
        }

        [HttpGet("hrvatskaFiskalizacija/{id}")]
        public async Task<bool> HratskaFiskalizacija(int id)
        {
                var shopModel = await _context.ShopModels.FindAsync(id);

                if (shopModel == null)
                {
                    return false;
                }

                return shopModel.ReceiptType.Equals("Hrvatski");
        }

        // PUT: ShopModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}"), Authorize(Roles = "ShopAdmin,Admin")]
        public async Task<IActionResult> PutShopModel(int id, [FromBody] ShopModel shopModel)
        {
            var token = Request.Headers["Authorization"];
            token = token.ToString().Substring(token.ToString().IndexOf(" ") + 1);
            if (ValidateToken(token) != null)
            {
                if (id != shopModel.Id)
                    return BadRequest("Url id and body id do not match");
                if (_context.StockModels.Where(s => s.Id == shopModel.StockId).Count() == 0)
                    return BadRequest("Selected wearhouse does not exist.");

                _context.ShopModels.Update(shopModel);

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

                return Ok();
            }
            return BadRequest("Bad token.");
        }

        // POST: ShopModels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost, Authorize(Roles = "ShopAdmin,Admin")]
        public async Task<ActionResult<ShopModel>> PostShopModel(ShopModel shopModel)
        {
            var token = Request.Headers["Authorization"];
            token = token.ToString().Substring(token.ToString().IndexOf(" ") + 1);
            if (ValidateToken(token) != null)
            {
                _context.ShopModels.Add(shopModel);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetShopModel", new { id = shopModel.Id }, shopModel);
            }
            return BadRequest("Bad token.");
        }

        // DELETE: ShopModels/5
        [HttpDelete("{id}"), Authorize(Roles = "ShopAdmin,Admin")]
        public async Task<IActionResult> DeleteShopModel(int id)
        {
            var token = Request.Headers["Authorization"];
            token = token.ToString().Substring(token.ToString().IndexOf(" ") + 1);

            if (ValidateToken(token) != null)
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
            return BadRequest("Bad token.");
        }

        public class ZaBrisanjePoslovnice
        {
            public int Id { get; set; }
        }

        [HttpPost("deleteShop/{id}"), Authorize(Roles = "ShopAdmin,Admin")] //
        public async Task<ActionResult<ShopModel>> TagAsDeleted(int id)
        {


            var token = Request.Headers["Authorization"];
            token = token.ToString().Substring(token.ToString().IndexOf(" ") + 1);


            if (ValidateToken(token) != null)
            {
                string proba;
                using (var reader = new StreamReader(Request.Body))
                {
                    proba = await reader.ReadToEndAsync();

                    // Do something
                }

                ZaBrisanjePoslovnice unos = JsonSerializer.Deserialize<ZaBrisanjePoslovnice>(proba);

                var deletedShop = await _context.ShopModels.Where(x=>x.Id == unos.Id).FirstAsync();
                if (deletedShop == null)
                {
                    return deletedShop;
                }
                else
                {

                    var deletedCashRegister = await _context.CashRegisterModels.Where(x => x.ShopId == unos.Id).ToListAsync<CashRegisterModel>();
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
            else return BadRequest();
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
