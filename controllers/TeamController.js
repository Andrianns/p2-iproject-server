const axios = require('axios');

class TeamController {
  static async readTeamPL(req, res, next) {
    try {
      const { data } = await axios({
        method: 'get',
        url: 'http://api.football-data.org/v4/competitions/PL/teams',
        headers: {
          'X-Auth-Token': process.env.API_TOKEN,
        },
      });
      const listTeam = data.teams.map((el) => {
        return {
          id: el.id,
          team: el.name,
          logo: el.crest,
          stadium: el.venue,
          coach: el.coach,
        };
      });

      res.status(200).json({ data: listTeam });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TeamController;
