const axios = require('axios');
const e = require('express');

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

  static async readTopScorePL(req, res, next) {
    try {
      const { data } = await axios({
        method: 'get',
        url: 'http://api.football-data.org/v4/competitions/PL/scorers',
        headers: {
          'X-Auth-Token': process.env.API_TOKEN,
        },
      });

      const listTopScore = data.scorers.map((el) => {
        return {
          name: el.player.name,
          nationality: el.player.nationality,
          position: el.player.position,
          team: el.team.name,
          logo: el.team.crest,
          goals: el.goals,
        };
      });
      res.status(200).json({ data: listTopScore });
    } catch (error) {
      next(error);
    }
  }

  static async readStandingsPL(req, res, next) {
    try {
      const { data } = await axios({
        method: 'get',
        url: 'http://api.football-data.org/v4/competitions/PL/standings',
        headers: {
          'X-Auth-Token': process.env.API_TOKEN,
        },
      });

      const dataStand = data.standings.map((el) => {
        return el.table;
      });
      const standings = dataStand[0].map((ea) => {
        return {
          position: ea.position,
          team: ea.team.name,
          logo: ea.team.crest,
          playedGames: ea.playedGames,
          won: ea.won,
          lost: ea.lost,
          draw: ea.draw,
          form: ea.form,
        };
      });
      res.status(200).json({ data: standings });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TeamController;
