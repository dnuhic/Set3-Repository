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
    [ApiController]
    public class ProductModelsController : ControllerBase
    {
        private readonly Context _context;
        private readonly IConfiguration _configuration;
        public ProductModelsController(Context context, IConfiguration configuration)
        {
            _configuration = configuration;
            _context = context;
        }

        // GET: api/ProductModels
        [HttpGet, Authorize(Roles = "StockAdmin")]
        public async Task<ActionResult<IEnumerable<ProductModel>>> GetProductModel()
        {
            var token = Request.Headers["Authorization"];
            token = token.ToString().Substring(token.ToString().IndexOf(" ") + 1);

            if (ValidateToken(token) != null)
            {
                return await _context.ProductModels.ToListAsync();
            }

            return NoContent();
        }

        // GET: api/ProductModels/5
        [HttpGet("{id}"), Authorize(Roles = "StockAdmin")]
        public async Task<ActionResult<ProductModel>> GetProductModel(int id)
        {
            var token = Request.Headers["Authorization"];
            token = token.ToString().Substring(token.ToString().IndexOf(" ") + 1);

            if (ValidateToken(token) != null)
            {
                var productModel = await _context.ProductModels.FindAsync(id);

                if (productModel == null)
                {
                    return NotFound();
                }

                return productModel;
            }
            return NoContent();
        }

        // PUT: api/ProductModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}"), Authorize(Roles = "StockAdmin")]
        public async Task<IActionResult> PutProductModel(int id, ProductModel productModel)
        {
            var token = Request.Headers["Authorization"];
            token = token.ToString().Substring(token.ToString().IndexOf(" ") + 1);

            if (ValidateToken(token) != null)
            {
                if (id != productModel.Id)
                {
                    return BadRequest();
                }

                _context.Entry(productModel).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ProductModelExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            }
            
            return NoContent();
            
        }

        // POST: api/ProductModels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost, Authorize(Roles = "StockAdmin")]
        public async Task<ActionResult<ProductModel>> PostProductModel(ProductModel productModel)
        {
            var token = Request.Headers["Authorization"];
            token = token.ToString().Substring(token.ToString().IndexOf(" ") + 1);

            if (ValidateToken(token) != null)
            {
                _context.ProductModels.Add(productModel);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetProductModel", new { id = productModel.Id }, productModel);
            }

            return NoContent();
        }

        // DELETE: api/ProductModels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductModel(int id)
        {
            var productModel = await _context.ProductModels.FindAsync(id);
            if (productModel == null)
            {
                return NotFound();
            }

            _context.ProductModels.Remove(productModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductModelExists(int id)
        {
            return _context.ProductModels.Any(e => e.Id == id);
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
