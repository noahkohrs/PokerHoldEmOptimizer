using Microsoft.AspNetCore.Mvc;

namespace NomDeVotreProjet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PokerController : ControllerBase
    {
        [HttpGet]
        public ActionResult<string> Get()
        {
            return "Backend fonctionne!";
        }
    }
}
