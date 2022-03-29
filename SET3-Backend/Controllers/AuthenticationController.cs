﻿using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SET3_Backend.Database;
using SET3_Backend.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SET3_Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly Context _context;
        private readonly IConfiguration _configuration;

        public AuthenticationController(Context context, IConfiguration configuration)
        {
            _configuration = configuration;
            _context = context;
        }

        //metoda napravljena samo za svrhu testiranja!!!
        [HttpGet]
        public async Task<ActionResult<UserModel>> CreateUserTestMethod()
        {
            RoleModel role = new RoleModel(RoleType.Admin);
            _context.RoleModels.Add(role);
            SecurityQuestionModel question = new SecurityQuestionModel("test pitanje");
            _context.SecurityQuestionModels.Add(question);
            UserModel user = new UserModel("dzenan.nuhic@gmail.com", "dzenan", "nuhic",
                "password", role, role.Id, question, question.Id, "test", false);
            _context.UserModels.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        [HttpPost]
        public async Task<ActionResult<string>> Login(UserDto userDto) 
        {
            if (userDto == null) return BadRequest("User not specified");
            UserModel user = await _context.UserModels.Where(u => u.Email.Equals(userDto.Email)).FirstOrDefaultAsync();
            if(user == null && userDto.Password.Equals(user.Password))
            {
                return BadRequest("Incorrect email or password.");
            }
            //treba provjeriti da li je nesto od ovoga null
            user.Role = await _context.RoleModels.FindAsync(user.RoleId);
            user.Question = await _context.SecurityQuestionModels.FindAsync(user.QuestionId);
            string token = CreateToken(user);

            CookieOptions cookieOptions = new CookieOptions();
            cookieOptions.Secure = true;
            cookieOptions.HttpOnly = true;
            cookieOptions.Expires = DateTime.UtcNow.AddDays(1);
            Response.Cookies.Append("jwt", token, cookieOptions);

            return Ok(token);
        }

        private string CreateToken(UserModel user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, Enum.GetName(typeof(RoleType), user.Role.RoleType)),
                new Claim(ClaimTypes.Name, user.FirstName + " " + user.LastName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(5),
                signingCredentials: credentials
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        public Tuple<string, string, string> GetUserFromToken(JwtSecurityToken jwtSecurityToken)
        {
            //ovo bi se moglo napraviti da nekad vraca user-a, ali prvo treba vidjeti sta ce se
            //desiti sa atributima role i security question
            var name = jwtSecurityToken.Claims.First(claim => claim.Type == ClaimTypes.Name).Value;
            var email = jwtSecurityToken.Claims.First(claim => claim.Type == ClaimTypes.Email).Value;
            var role = jwtSecurityToken.Claims.First(claim => claim.Type == ClaimTypes.Role).Value;
            return new Tuple<string, string, string>(name, email, role);
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
            } catch
            {
                return null;
            }
        }


    }
}