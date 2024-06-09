using AdventureWorks.Shop.AI.Abstractions.Conversations;
using AdventureWorks.Shop.AI.DTOs.Conversations;

namespace AdventureWorks.Shop.AI.Core.Extensions
{
    public static class ToUserDTOs
    {
        public static UserDTO ToUserDTO(this User user)
        {
            var userDTO = new UserDTO
            {
                Id = user.Id,
                Name = user.Name,
                Avatar = user.Avatar,
            };

            return userDTO;
        }
    }
}
