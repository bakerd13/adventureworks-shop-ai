using AdventureWorks.Shop.AI.Abstractions.Conversations;
using AdventureWorks.Shop.AI.DTOs.Conversations;

namespace AdventureWorks.Shop.AI.Core.Extensions
{
    public static class ToUserEntities
    {
        public static User ToUserEntity(this UserDTO userDTO)
        {
            var user = new User
            {
                Id = userDTO.Id,
                Name = userDTO.Name,
                Avatar = userDTO.Avatar,
            };

            return user;
        }
    }
}
