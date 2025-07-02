using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CartController(ICartService cartService) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<ShoppingCart>> GetCartyById(string id)
        {
            return Ok(await cartService.GetCartsAsync(id) ?? new ShoppingCart { Id = id});
        }
        [HttpPost]
        public async Task<ActionResult<ShoppingCart>> UpdateCart(ShoppingCart cart)
        {
            var updatedCart = await cartService.SetcartAsync(cart);
            if (updatedCart == null) return BadRequest("Cart do not exists");
            return Ok(updatedCart);
        }
        [HttpDelete]
        public async Task<ActionResult> DeleteCart(string id)
        {
            var result = await cartService.DeleteCartAsync(id);
            if (!result) return BadRequest("Problem deleting cart");
            return Ok(result);
        }
    }
}
