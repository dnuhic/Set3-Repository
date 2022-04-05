using SET3_Backend.Database;
using SET3_Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace SET3_Backend.Repository.UserRepo
{
    public class UserRepository : IUserRepositroy
    {
        private readonly Context _context;
        public UserRepository(Context context){
            _context = context;
        }

        public async Task<UserModel[]> GetUserModels(){
            UserModel[]? listOfModels = null;
            await Task.Run(() => listOfModels = _context.UserModels.AsNoTracking().ToArray());
            return listOfModels ?? new UserModel[0];
        }
        public async Task<UserModel?> GetUserModel(int id){
            return await _context.UserModels.FindAsync(id);
        }
        public async Task UpdateUserModel(UserModel model){
            _context.Update(model);
            await _context.SaveChangesAsync();
        }
        public async Task AddUserModel(UserModel model){
            _context.UserModels.Add(model);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteUserModel(UserModel model){
            _context.UserModels.Remove(model);
            await _context.SaveChangesAsync();
        }
        public async Task<bool> UserModelExists(int id){
            bool exists = false;
            await Task.Run(() => exists = _context.UserModels.Any(e => e.Id == id));
            return false;
        }
    }
}