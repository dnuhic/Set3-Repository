using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Net.ConnectCode.Barcode;
using SET3_Backend.Database;
using SET3_Backend.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace SET3_Backend.Controllers
{
    
    [Route("[controller]")]
    [EnableCors("CorsPolicy")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly Context _context;
        private readonly IConfiguration _configuration;

        public class UserToken
        {
            public string Role { get; set; }

            public UserToken(string role)
            {
                Role = role;
            }

        }
        public AuthenticationController(Context context, IConfiguration configuration)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpGet("createFirstData")]
        public async Task<ActionResult<UserModel>> CreateFirstData()
        {
            if (!_context.RoleModels.Any())
            {
                RoleModel user = new RoleModel(RoleType.User.ToString(), true, false, false);
                _context.RoleModels.Add(user);

                RoleModel admin = new RoleModel(RoleType.Admin.ToString(), true, true, true);
                _context.RoleModels.Add(admin);

                RoleModel shopAdmin = new RoleModel(RoleType.ShopAdmin.ToString(), true, true, true);
                _context.RoleModels.Add(shopAdmin);

                RoleModel stockAdmin = new RoleModel(RoleType.StockAdmin.ToString(), true, true, true);
                _context.RoleModels.Add(stockAdmin);


            }

            if (!_context.SecurityQuestionModels.Any())
            {
                _context.SecurityQuestionModels.Add(new SecurityQuestionModel("What is your favourite animal?"));
                _context.SecurityQuestionModels.Add(new SecurityQuestionModel("What is your favourite color?"));
                _context.SecurityQuestionModels.Add(new SecurityQuestionModel("What is your mothers name?"));
                _context.SecurityQuestionModels.Add(new SecurityQuestionModel("What is your dream destination?"));
                _context.SecurityQuestionModels.Add(new SecurityQuestionModel("What is your dream car?"));
            }

            if (!_context.CategoryModels.Any())
            {
                _context.CategoryModels.Add(new CategoryModel(CategoryType.Food.ToString(), 0.17));
                _context.CategoryModels.Add(new CategoryModel(CategoryType.Hygiene.ToString(), 0.17));
                _context.CategoryModels.Add(new CategoryModel(CategoryType.Clothes.ToString(), 0.17));
                
            }

            if (!_context.StockModels.Any())
            {
                _context.StockModels.Add(new StockModel("Warehouse"));
            }

            if (!_context.MeasuringUnits.Any())
            {
                MeasuringUnit units = new MeasuringUnit(MeasuringUnitName.Units.ToString());
                _context.MeasuringUnits.Add(units);
                MeasuringUnit grams = new MeasuringUnit(MeasuringUnitName.Grams.ToString());
                _context.MeasuringUnits.Add(grams);
                MeasuringUnit kilograms = new MeasuringUnit(MeasuringUnitName.Kilograms.ToString());
                _context.MeasuringUnits.Add(kilograms);
                MeasuringUnit milliliters = new MeasuringUnit(MeasuringUnitName.Milliliters.ToString());
                _context.MeasuringUnits.Add(milliliters);
                MeasuringUnit liters = new MeasuringUnit(MeasuringUnitName.Liters.ToString());
                _context.MeasuringUnits.Add(liters);
                MeasuringUnit jars = new MeasuringUnit(MeasuringUnitName.Jars.ToString());
                _context.MeasuringUnits.Add(jars);

            }

            if(!_context.ShopModels.Any())
            {
                ShopModel shop1 = new ShopModel("Bingo", "Dzemala Bijedica St 160 71000 Sarajevo ", 1, false, "Bosanski");
                _context.ShopModels.Add(shop1);

                ShopModel shop2 = new ShopModel("Konzum", "Hercegovacka ul. 78 21000 Split Croatia", 1, false, "Hrvatski");
                _context.ShopModels.Add(shop2);
            }

            if(!_context.CashRegisterModels.Any())
            {
                CashRegisterModel cashRegister1 = new CashRegisterModel(1, false, "Register 1", "Description", false);
                _context.CashRegisterModels.Add(cashRegister1);

                CashRegisterModel cashRegister2 = new CashRegisterModel(1, false, "Register 2", "Description", false);
                _context.CashRegisterModels.Add(cashRegister2);

                CashRegisterModel cashRegister3 = new CashRegisterModel(1, false, "Register 3", "Description", false);
                _context.CashRegisterModels.Add(cashRegister3);

                CashRegisterModel cashRegister4 = new CashRegisterModel(1, false, "Register 4", "Description", false);
                _context.CashRegisterModels.Add(cashRegister4);

                CashRegisterModel cashRegister5 = new CashRegisterModel(1, false, "Register 5", "Description", false);
                _context.CashRegisterModels.Add(cashRegister5);

                CashRegisterModel cashRegister6 = new CashRegisterModel(2, false, "Register 1", "Description", false);
                _context.CashRegisterModels.Add(cashRegister6);

                CashRegisterModel cashRegister7 = new CashRegisterModel(2, false, "Register 2", "Description", false);
                _context.CashRegisterModels.Add(cashRegister7);

                CashRegisterModel cashRegister8 = new CashRegisterModel(2, false, "Register 3", "Description", false);
                _context.CashRegisterModels.Add(cashRegister8);

                CashRegisterModel cashRegister9 = new CashRegisterModel(2, false, "Register 4", "Description", false);
                _context.CashRegisterModels.Add(cashRegister9);

            }

            if(!_context.TableModels.Any())
            {
                TableModel table1 = new TableModel("Unit 1", 1, false);
                _context.TableModels.Add(table1);

                TableModel table2 = new TableModel("Unit 2", 1, false);
                _context.TableModels.Add(table2);

                TableModel table3 = new TableModel("Unit 3", 1, false);
                _context.TableModels.Add(table3);

                TableModel table4 = new TableModel("Unit 4", 1, false);
                _context.TableModels.Add(table4);

                TableModel table5 = new TableModel("Unit 5", 1, false);
                _context.TableModels.Add(table5);

                TableModel table6 = new TableModel("Unit 1", 2, false);
                _context.TableModels.Add(table6);

                TableModel table7 = new TableModel("Unit 2", 2, false);
                _context.TableModels.Add(table7);

                TableModel table8 = new TableModel("Unit 3", 2, false);
                _context.TableModels.Add(table8);

                TableModel table9 = new TableModel("Unit 4", 2, false);
                _context.TableModels.Add(table9);

            }

            if(!_context.ProductModels.Any())
            {
                ProductModel product1 = new ProductModel(1, "Banana", CategoryType.Food.ToString(), false, 0, "", "", 2.5f, MeasuringUnitName.Kilograms.ToString());
                product1 = await InsertBarcode(product1);
                _context.ProductModels.Add(product1);

                ProductModel product2 = new ProductModel(1, "Tide", CategoryType.Hygiene.ToString(), false, 0, "", "", 5f, MeasuringUnitName.Liters.ToString());
                product1 = await InsertBarcode(product2);
                _context.ProductModels.Add(product2);

                ProductModel product3 = new ProductModel(1, "White shirt", CategoryType.Clothes.ToString(), false, 0, "", "", 15f, MeasuringUnitName.Units.ToString());
                product1 = await InsertBarcode(product3);
                _context.ProductModels.Add(product3);

                ProductModel product4 = new ProductModel(1, "Chocolate", CategoryType.Food.ToString(), false, 0, "", "", 2f, MeasuringUnitName.Units.ToString());
                product1 = await InsertBarcode(product4);
                _context.ProductModels.Add(product4);

                ProductModel product5 = new ProductModel(1, "Soap", CategoryType.Hygiene.ToString(), false, 0, "", "", 3f, MeasuringUnitName.Units.ToString());
                product1 = await InsertBarcode(product5);
                _context.ProductModels.Add(product5);
            }

            await _context.SaveChangesAsync();
            return Ok();
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

        //metoda napravljena samo za svrhu testiranja!!!
        [HttpGet ("add")]
        public async Task<ActionResult<List<UserModel>>> CreateUserTestMethod()
        {
            if (_context.RoleModels.Any() && _context.SecurityQuestionModels.Any())
            {
                SecurityQuestionModel question = await _context.SecurityQuestionModels.FirstOrDefaultAsync();
                List<UserModel> users = new List<UserModel>();
                var sha = SHA256.Create();
                var passwordHash = Encoding.ASCII.GetString(sha.ComputeHash(Encoding.ASCII.GetBytes("password")));

                users.Add(new UserModel("admin@gmail.com", "Admin", "Admin", passwordHash, question!.Id, "Odgovor", false, RoleType.Admin.ToString(), ""));
                users.Add(new UserModel("shopAdmin@gmail.com", "Shop", "Admin", passwordHash, question!.Id, "Odgovor", false, RoleType.ShopAdmin.ToString(), ""));
                users.Add(new UserModel("stockAdmin@gmail.com", "Stock", "Admin", passwordHash, question!.Id, "Odgovor", false, RoleType.StockAdmin.ToString(), ""));
                _context.UserModels.AddRange(users);
                await _context.SaveChangesAsync();
                return users;
            }

            // AKO VRATI BAD REQUEST POZOVITE SLIJEDECI GET PRIJE:
            return BadRequest();
                
            
        }

        [EnableCors("CorsPolicy")]
        [HttpPost]
        public async Task<ActionResult<TFAModel>> Login(UserDto userDto)
        {
            List<UserModel> lista = await _context.UserModels.ToListAsync();
            if (lista.Count == 0)
            {
                SecurityQuestionModel question = await _context.SecurityQuestionModels.FirstOrDefaultAsync();
                var sha1 = SHA256.Create();
                var passwordHash1 = Encoding.ASCII.GetString(sha1.ComputeHash(Encoding.ASCII.GetBytes("password")));
                lista.Add(new UserModel("admin@gmail.com", "Admin", "Admin", passwordHash1, question!.Id, "Odgovor", false, RoleType.Admin.ToString(), ""));
                _context.UserModels.AddRange(lista);
                await _context.SaveChangesAsync();
            }
            Console.WriteLine("inside post");
            if (userDto == null) new TFAModel("ERROR");
            UserModel user = await _context.UserModels.Where(u => u.Email.Equals(userDto.Email)).FirstOrDefaultAsync();
            var sha = SHA256.Create();
            var passwordHash = Encoding.ASCII.GetString(sha.ComputeHash(Encoding.ASCII.GetBytes(userDto.Password)));
            Console.WriteLine(passwordHash);
            Console.WriteLine(userDto.Password);
            if (user == null || !passwordHash.Equals(user.Password))
            {
                return new TFAModel("ERROR");
            }
            //user.Question = await _context.SecurityQuestionModels.FindAsync(user.QuestionId);
            string token = CreateToken(user);

            CookieOptions cookieOptions = new CookieOptions();
            cookieOptions.Secure = false;
            cookieOptions.HttpOnly = false;
            cookieOptions.Expires = DateTime.UtcNow.AddMinutes(30);
            cookieOptions.SameSite = SameSiteMode.None;
            Response.Cookies.Append("jwt", token, cookieOptions);

            return new TFAModel(token);
        }

        [EnableCors("CorsPolicy")]
        [HttpPost("mobile")]
        public async Task<ActionResult<TFAModel>> LoginForMobile(UserDto userDto)
        {

            Console.WriteLine("inside post");
            if (userDto == null) new TFAModel("ERROR");
            UserModel user = await _context.UserModels.Where(u => u.Email.Equals(userDto.Email)).FirstOrDefaultAsync();
            var sha = SHA256.Create();
            var passwordHash = Encoding.ASCII.GetString(sha.ComputeHash(Encoding.ASCII.GetBytes(userDto.Password)));
            Console.WriteLine(passwordHash);
            Console.WriteLine(userDto.Password);
            if (user == null || !passwordHash.Equals(user.Password))
            {
                return new TFAModel("ERROR");
            }
            //user.Question = await _context.SecurityQuestionModels.FindAsync(user.QuestionId);
            //string token = CreateToken(user);

            //CookieOptions cookieOptions = new CookieOptions();
            //cookieOptions.Secure = false;
            //cookieOptions.HttpOnly = false;
            //cookieOptions.Expires = DateTime.UtcNow.AddMinutes(30);
            //cookieOptions.SameSite = SameSiteMode.None;
            //Response.Cookies.Append("jwt", token, cookieOptions);

            return new TFAModel(user.Id.ToString());
        }

        [EnableCors("CorsPolicy")]
        [HttpGet("installRegister/{id}")]
        public async Task<ActionResult<TFAModel>> LogInCashRegister(int id)
        {
            CashRegisterModel? cashRegister = await _context.CashRegisterModels.FindAsync(id);
            cashRegister.Installed = true;
            if(cashRegister == null)
            {
                return new TFAModel("ERROR");
            }

            _context.CashRegisterModels.Update(cashRegister);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return new TFAModel("ERROR");
            }

            return new TFAModel("INSTALLED");
        }

        protected string CreateToken(UserModel user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, Enum.GetName(typeof(RoleType), Enum.Parse<RoleType>(user.RoleName))),
                new Claim(ClaimTypes.Name, user.FirstName + " " + user.LastName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        protected Tuple<string, string, string> GetUserFromToken(JwtSecurityToken jwtSecurityToken)
        {
            //ovo bi se moglo napraviti da nekad vraca user-a, ali prvo treba vidjeti sta ce se
            //desiti sa atributima role i security question
            var name = jwtSecurityToken.Claims.First(claim => claim.Type == ClaimTypes.Name).Value;
            var email = jwtSecurityToken.Claims.First(claim => claim.Type == ClaimTypes.Email).Value;
            var role = jwtSecurityToken.Claims.First(claim => claim.Type == ClaimTypes.Role).Value;
            return new Tuple<string, string, string>(name, email, role);
        }

        [HttpGet("getUserId")]
        public async Task<ActionResult<UserModel>> getUserIdFromToken()
        {

            var token = Request.Headers["Authorization"];
            token = token.ToString().Substring(token.ToString().IndexOf(" ") + 1);
            

            /*var handler = new JwtSecurityTokenHandler();
            JwtSecurityToken token = handler.ReadJwtToken(jsontoken);*/

            var tokenUser = GetUserFromToken(ValidateToken(token));

            var user = _context.UserModels.AsNoTracking().Where(u => u.Email == tokenUser.Item2).FirstOrDefault();
            if (user is not null)
                return user;
            return BadRequest();
        }

        [HttpGet("getUserTFA/{email}")]
        public async Task<ActionResult<TFAModel>> getUserTFA(string email)
        {
            /*var handler = new JwtSecurityTokenHandler();
            JwtSecurityToken token = handler.ReadJwtToken(jsontoken);*/

            var user = _context.UserModels.AsNoTracking().Where(u => u.Email == email).FirstOrDefault();
            
            return new TFAModel(user.TFA);
        }

        [EnableCors("CorsPolicy")]
        [HttpPost("getusertoken")]
        public async Task<ActionResult<UserToken>> GetUserToken()
        {
            var body = "";
            using (var reader = new StreamReader(Request.Body))
            {
                body = await reader.ReadToEndAsync();
            }

            var cookies = body.Split(';');
            var cookie = "";
            foreach(var kuki in cookies) {
                if (kuki.Contains("jwt")) { 
                    cookie= kuki;
                    cookie.Trim();
                }
            }

            if (cookie.IsNullOrEmpty()) return BadRequest("no jwt cookie found");

            String jsontoken = cookie.Split("=")[1].Replace("\"", "");
            System.Diagnostics.Debug.WriteLine(jsontoken);

            /*var handler = new JwtSecurityTokenHandler();
            JwtSecurityToken token = handler.ReadJwtToken(jsontoken);*/

            var tokenUser = GetUserFromToken(ValidateToken(jsontoken));
            UserToken userToken = new UserToken(tokenUser.Item3);

 
            return userToken;
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
