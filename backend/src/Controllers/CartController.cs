using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Pz.Cheeseria.Api.Data;
using Pz.Cheeseria.Api.Models;
using System.Collections.Generic;
using System.Linq;

namespace Pz.Cheeseria.Api.Controllers
{
    [Microsoft.AspNetCore.Mvc.Route("api/[controller]/[action]")]
    [ApiController]
    public class CartController : Controller
    {
        public static HashSet<string> _recentPurchases = new();

        [HttpPost]
        public IActionResult Purchase(Dictionary<string, int> cart)
        {
            foreach (var key in cart.Keys)
            {
                if (!_recentPurchases.Contains(key))
                {
                    _recentPurchases.Add(key);
                }

            }
            return Ok();
        }

        [HttpGet]
        [ProducesResponseType(typeof(Cheese[]), 200)]
        public IActionResult GetRecentPurchases()
        {
            var recentPurchases = CheesesRepository.Cheeses.Where(x => _recentPurchases.Contains(x.Id.ToString())).ToList();
            return Ok(recentPurchases);
        }
    }
}
