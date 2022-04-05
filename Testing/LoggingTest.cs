using Microsoft.Extensions.Logging;
using Moq;
using NUnit.Framework;
using SET3_Backend.Controllers;
using SET3_Backend.Database;
using SET3_Backend.Models;
using System.Collections.Generic;
using SET3_Backend.Repository.UserRepo;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace Testing
{
    public class LoggingTest
    {
        private readonly Mock <IUserRepositroy> _context = new Mock<IUserRepositroy>();
        private readonly Mock<ILogger<UserModelsController>> _logger = new Mock<ILogger<UserModelsController>>();
        private readonly Mock<IConfiguration> _config = new Mock<IConfiguration>();
        private readonly UserModelsController _userModelController;


        public LoggingTest()
        {
            _userModelController = new UserModelsController(_context.Object, _config.Object, _logger.Object);
        }


        [Test]
        public async Task GetUserModelsTestAsync()
        {
            UserModel[]? lista = new UserModel[]
            {
                new UserModel
                {
                    Id = 1,
                    Email = "iivkovic@etf.unsa.ba",
                    FirstName = "Ivona",
                    LastName =  "Ivkovic",
                    Password = "1234",
                    QuestionId = 1, 
                    Answer = "bela",
                    Deleted = false
                },
                new UserModel
                {
                    Id = 2,
                    Email = "bbegic@etf.unsa.ba",
                    FirstName = "Bega",
                    LastName =  "Begic",
                    Password = "123410",
                    QuestionId = 2,
                    Answer = "binarno",
                    Deleted = false
                },
                new UserModel
                {
                    Id = 3,
                    Email = "zumreta@etf.unsa.ba",
                    FirstName = "Zumy",
                    LastName =  "Zum zum",
                    Password = "1234",
                    QuestionId = 3,
                    Answer = "bela",
                    Deleted = false
                }
            };

            _context.Setup(x => x.GetUserModels()).ReturnsAsync(lista);
            _logger.Verify(x => x.LogInformation("Fetching User Models"), Times.Once);
            await _userModelController.GetUserModels();
        }


        [Test]
        public async Task PutUserModelTestAsync1()
        {
            UserModel user = new UserModel
            {
                Id = 3,
                Email = "zumreta@etf.unsa.ba",
                FirstName = "Zumy",
                LastName = "Zum zum",
                Password = "1234",
                QuestionId = 3,
                Answer = "bela",
                Deleted = false
            };

            _context.Setup(x => x.UpdateUserModel(user));

            _logger.Verify(x => x.LogInformation("Put UserModel ended"), Times.Once);
            await _userModelController.PutUserModel(3, user);
        }


        [Test]
        public async Task PutUserModelTestAsync2()
        {
            UserModel user = new UserModel
            {
                Id = 12,
                Email = "itugy@etf.unsa.ba",
                FirstName = "Iuf",
                LastName = "Idf",
                Password = "13234",
                QuestionId = 12,
                Answer = "be2la",
                Deleted = false
            };

            _context.Setup(x => x.AddUserModel(user));

            _logger.Verify(x => x.LogInformation("Succesfully added new UserModel"), Times.Once);
            await _userModelController.PostUserModel(user);
        }


        [Test]
        public async Task DeleteUserModelAsync()
        {
            UserModel user = new UserModel
            {
                Id = 12,
                Email = "itugy@etf.unsa.ba",
                FirstName = "Iuf",
                LastName = "Idf",
                Password = "13234",
                QuestionId = 12,
                Answer = "be2la",
                Deleted = false
            };

            _context.Setup(x => x.DeleteUserModel(user));

            _logger.Verify(x => x.LogInformation("Succesfully deleted UserModel"), Times.Once);
            await _userModelController.DeleteUserModel(1);
        }


    /*    [Test]
        public async Task UserModelExistsAsync()
        {
            UserModel user = new UserModel
            {
                Id = 12,
                Email = "itugy@etf.unsa.ba",
                FirstName = "Iuf",
                LastName = "Idf",
                Password = "13234",
                QuestionId = 12,
                Answer = "be2la",
                Deleted = false
            };

            _context.Setup(x => x.UserModelExists(12));

            _logger.Verify(x => x.LogInformation("Succesfully deleted UserModel"), Times.Once);
            await _userModelController.UserModelExists(12);
        }
    */





    }
}