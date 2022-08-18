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
      let username = findUser.username;
      res.status(200).json({
        access_token: access_token,
        email,
        username,
      });
    } catch (error) {
      console.log(error, '<<<<<from controller error');
      next(error);
    }
  }
  static async google(req, res, next) {
    try {
      const { token_google } = req.headers;
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: token_google,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      // console.log(payload);

      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          email: payload.email,
          password: 'googleng',
          role: 'Customer',
          phoneNumber: '123456',
          address: 'googleng',
        },
        hooks: false,
      });
      const access_token = createToken({
        id: user.id,
        email: user.email,
      });
      res.status(200).json({ access_token, email: user.email });
    } catch (error) {
      res.status(500).json({ message: 'internal server error' });
    }
  }
}

module.exports = UserController;
