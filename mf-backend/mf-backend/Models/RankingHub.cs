using Microsoft.AspNetCore.SignalR;

namespace mf_backend.Models
{
    public class RankingHub : Hub
    {
        public async Task RankingUpdates(Player[] update)
        {
            await Clients.All.SendAsync("UpdateRankings", update);
        }
    }
}
