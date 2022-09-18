const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { User } = require('../../models/users');
const { RequestError, sendEmail } = require('../../helpers');
const {nanoid} = require('nanoid');

const register = async (req, res) => {
  const { email, password,subscription } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw RequestError(409, 'Email already exist');
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  const result = await User.create({ email, password: hashPassword ,subscription,avatarURL,verificationToken });
  const mail = {
    to: email,
    subject: 'Confirmation of registration on the website',
    html: `<a href="http://localhost:3000/api/auth/verify/${verificationToken}" target="_blank">Click to confirm email</a>`,
  };
  await sendEmail(mail);

  res.status(201).json({
    email: result.email,
  });
};

module.exports = register;