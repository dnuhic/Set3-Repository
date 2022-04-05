using SET3_Backend.Models;

namespace SET3_Backend.Repository.UserRepo
{
    public interface IUserRepositroy
    {
        public Task<UserModel[]> GetUserModels();
        public Task<UserModel?> GetUserModel(int id);
        public Task UpdateUserModel(UserModel model);
        public Task AddUserModel(UserModel model);
        public Task DeleteUserModel(UserModel model);
        public Task<bool> UserModelExists(int id);


    }
}