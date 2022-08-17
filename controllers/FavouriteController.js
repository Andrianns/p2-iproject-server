const { Favourite, Team } = require('../models');
const axios = require('axios');

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
        order: ['power', 'DESC'],
        include: Team,
      });

      res.status(200).json({ message: 'success read favourite', data });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = FavouriteController;
