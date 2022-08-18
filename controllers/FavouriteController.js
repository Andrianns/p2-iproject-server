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

      const id = data.id;
      const name = data.name;
      const logo = data.crest;
      const stadium = data.venue;
      // console.log(data, id, name, logo, stadium, '<<<AXIOS');
      const UserId = +req.user.id;

      const validate = await Favourite.findOne({
        where: {
          UserId: UserId,
          TeamId: TeamId,
        },
      });
      console.log(validate, '<<VALIDATE');
      const team = await Team.findByPk(TeamId);
      console.log(team, 'ini team<<');
      if (!team) {
        await Team.create({
          id: id,
          name: name,
          logo: logo,
          stadium: stadium,
        });
      }

      if (!validate) {
        await Favourite.create({
          UserId,
          TeamId,
          power: 0,
        });
      }

      res.status(201).json({ message: 'success add to favourite' });
    } catch (error) {
      next(error);
    }
  }

  static async readFavourite(req, res, next) {
    const UserId = req.user.id;
    try {
      const data = await Favourite.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
        include: Team,
        where: {
          UserId: UserId,
        },
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
          user: 'andrianaji18@hotmail.com',
          pass: process.env.PASS_EMAIL,
        },
      });

      const options = {
        from: 'andrianaji18@hotmail.com',
        to: req.user.email,
        subject: `Hello Fans!`,
        text: `Match baru telah update!, ini hasilnya :
        
        ${matchesTeam[0].homeTeamLogo} ${matchesTeam[0].awayTeamLogo}
        ${matchesTeam[0].homeTeam} ${matchesTeam[0].awayTeam}
        ${matchesTeam[0].scoreHomeTeam} ${matchesTeam[0].scoreAwayTeam}
        `,
      };
      console.log(matchesTeam[0].homeTeam);
      // transporter.sendMail(options, function (err, info) {
      //   if (err) {
      //     console.log(err);
      //     return;
      //   } else {
      //     console.log('sent: ' + info.response);
      //   }
      // });
      res
        .status(200)
        .json({ message: 'success read matches', match: matchesTeam });
    } catch (error) {
      next(error);
    }
  }

  static async destroyFav(req, res, next) {
    try {
      const id = req.params.id;
      const data = await Favourite.destroy({
        where: {
          id: id,
        },
      });

      if (!data || id <= 0) {
        throw { name: 'NotFound' };
      }
      res
        .status(200)
        .json({ message: 'success delete favourite where id ' + id });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = FavouriteController;
