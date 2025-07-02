using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface ICartService
    {
        Task<ShoppingCart?> GetCartsAsync(string key);
        Task<ShoppingCart?> SetcartAsync(ShoppingCart? cart);
        Task<bool> DeleteCartAsync(string key);
    }
}
