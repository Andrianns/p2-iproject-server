const { Favourite, Team } = require('../models');
const axios = require('axios');
const nodemailer = require('nodemailer');

class FavouriteController {
  static async postFavourite(req, res, next) {
    const TeamId = +req.params.id;
    try {
      const { data } = await axios({
        method: 'get',
        url: `http://api.football-data.org/v4/teams/${TeamId}`,
        headers: {
          'X-Auth-Token': process.env.API_TOKEN,
        },
      });

      // console.log(data);
      const id = data.id;
      const name = data.name;
      const logo = data.crest;
      const stadium = data.venue;
      await Team.create({ id, name, logo, stadium });

      const UserId = +req.user.id;
      const data1 = await Favourite.create({
        UserId,
        TeamId,
        power: 0,
      });

      res
        .status(201)
        .json({ message: 'success add to favourite', favourite: data1 });
    } catch (error) {
      next(error);
    }
  }

  static async readFavourite(req, res, next) {
    try {
      const data = await Favourite.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
        include: Team,
        order: [['power', 'DESC']],
      });

      res.status(200).json({ message: 'success read favourite', data });
    } catch (error) {
      next(error);
    }
  }

  static async notifMail(req, res, next) {
    const { id } = req.params;
    try {
      const { data } = await axios({
        method: 'get',
        url: `http://api.football-data.org/v4/teams/${id}/matches`,
        headers: {
          'X-Auth-Token': process.env.API_TOKEN,
        },
      });

      const matchesTeam = data.matches.map((el) => {
        if (
          el.score.fullTime.home !== null ||
          el.score.fullTime.away !== null
        ) {
          return {
            homeTeam: el.homeTeam.name,
            awayTeam: el.awayTeam.name,
            homeTeamLogo: el.homeTeam.crest,
            awayTeamLogo: el.awayTeam.crest,
            scoreHomeTeam: el.score.fullTime.home,
            scoreAwayTeam: el.score.fullTime.away,
          };
        } else {
          return {};
        }
      });

      const transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
          user: 'miraclee99@hotmail.com',
          pass: 'Somnus99$',
        },
      });

      const options = {
        from: 'miraclee99@hotmail.com',
        to: req.user.email,
        subject: `Hello Fans!`,
        text: `Match baru telah update!, ini hasilnya :
        ${matchesTeam}
        `,
      };

      transporter.sendMail(options, function (err, info) {
        if (err) {
          console.log(err);
          return;
        } else {
          console.log('sent: ' + info.response);
        }
      });
      res
        .status(200)
        .json({ message: 'success read matches', match: matchesTeam });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = FavouriteController;
