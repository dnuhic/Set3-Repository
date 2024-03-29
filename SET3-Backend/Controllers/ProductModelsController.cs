﻿#nullable disable
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
using Net.ConnectCode.Barcode;
using SET3_Backend.Database;
using SET3_Backend.Models;

namespace SET3_Backend.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    [ApiController]
    public class ProductModelsController : ControllerBase
    {
        private readonly Context _context;
        private readonly IConfiguration _configuration;

        public ProductModelsController(Context context, IConfiguration configuration)
        {
            _configuration = configuration;
            _context = context;
            _configuration = configuration;
        }

        // GET: api/ProductModels
        [HttpGet, Authorize(Roles = "StockAdmin,Admin")]
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

        [HttpGet("{id}"), Authorize(Roles = "StockAdmin,Admin")]

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

        // ova metoda se koristi za update/edit proizvoda kao i za brisanje 
        // na formi za brisanje se salje taj proizvod samo sa promijenjenim atributom deleted na true
        // i ovdje se to update
        // provjeriti autorizaciju je li samo admin skladista ovo moze??
        // metodu sam testirao bez autorizacije i tokena i radi, kada se poveze sa frontendom bice sve ok
        [HttpPost("{id}"), Authorize(Roles = "StockAdmin,Admin")] 
        public async Task<IActionResult> PostUpdateProductModel(int id, ProductModel productModel)
        {

            var token = Request.Headers["Authorization"];
            token = token.ToString().Substring(token.ToString().IndexOf(" ") + 1);


            if (ValidateToken(token) != null)
            {
                if (id != productModel.Id)
                {
                    return BadRequest();
                }

                
                _context.Update(productModel);

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (Exception e)
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
            else return NoContent();


            return NoContent();
        }

        // PUT: api/ProductModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754

        [HttpPut("{id}"), Authorize(Roles = "StockAdmin,Admin")]

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

        [HttpPost, Authorize(Roles = "StockAdmin,Admin")]

        public async Task<ActionResult<ProductModel>> PostProductModel(ProductModel productModel)
        {

            var token = Request.Headers["Authorization"];
            token = token.ToString().Substring(token.ToString().IndexOf(" ") + 1);

            if (ValidateToken(token) != null)
            {
               
                
                //await _context.SaveChangesAsync();
                productModel = await InsertBarcode(productModel);
                _context.ProductModels.Add(productModel);
                //await Task.Run(() => _context.ProductModels.Update(productModel));
                //_context.ProductModels.Update(productModel);
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


        //BARCODE generating
        public async Task<ProductModel> InsertBarcode(ProductModel model)
        {
            string modelId = model.Id.ToString();
            modelId = modelId.PadLeft(7 - modelId.Length, '0');
            var category = model.CategoryName.ToUpper().ToCharArray();
            int sum = 0;
            foreach (char c in category)
                sum += ((int)c) - 65;
            string sumStr = sum.ToString();
            sumStr = sumStr.PadLeft(7 - sumStr.Length, '0');
            BarcodeFonts bec = new BarcodeFonts();
            bec.BarcodeType = BarcodeFonts.BarcodeEnum.Code128Auto;
            int num = await numberOfBarcodes(modelId + sumStr);
            bec.Data = modelId + sumStr + num.ToString();
            bec.encode();

            model.Barcode = bec.EncodedData;
            model.BarcodeText = bec.HumanText;
            return model;
        }

        private async Task<int> numberOfBarcodes(string barcode)
        {
            var bar = barcode.Substring(0, barcode.Length - 2);
            return await _context.ProductModels.CountAsync(t => t.Barcode.Substring(0, barcode.Length - 2) == bar);
        }
    }
    }
