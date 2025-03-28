const bcrypt = require('bcryptjs');
const hashPassword = (password) => bcrypt.hashSync(password, 10);

const compareHash = (password, hashedPassword) =>
  bcrypt.compareSync(password, hashedPassword);

module.exports = { hashPassword, compareHash };
