const { compareHash } = require('../helper/bcrypt');
const { createToken } = require('../helper/jwt');
const { User } = require('../models');

class UserController {
  static async register(req, res, next) {
    const { username, email, password, phoneNumber, role } = req.body;
    try {
      let data = await User.create({
        username,
        email,
        password,
        phoneNumber,
        role: 'Customer',
      });

      res.status(201).json({
        message: 'success register customer',
        data: {
          username,
          email,
          phoneNumber,
          role,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      let findUser = await User.findOne({
        where: {
          email: email,
        },
      });

      if (!findUser) {
        throw { name: 'Invalid email/password' };
      }
      const comparePassword = compareHash(password, findUser.password);
      if (!comparePassword) {
        throw { name: 'Invalid email/password' };
      }
      const payload = {
        id: findUser.id,
        username: findUser.username,
      };
      const access_token = createToken(payload);

      res.status(200).json({
        access_token: access_token,
        email,
      });
    } catch (error) {
      console.log(error, '<<<<<from controller error');
      next(error);
    }
  }
}

module.exports = UserController;
