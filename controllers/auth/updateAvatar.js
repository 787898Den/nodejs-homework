const fs = require('fs/promises');
const path = require('path');
const jimp = require('jimp');
const { User } = require('../../models/users');
const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
  try {
    const { path: tempUpload, filename } = req.file;
    const { _id } = req.user;

    const [extension] = filename.split('.').reverse();
    const avatarName = `${_id}.${extension}`;

    const resultUpload = path.join(avatarsDir, avatarName);
    await fs.rename(tempUpload, resultUpload);

    const file = await jimp.read(resultUpload);
    await file.resize(250, 250).write(resultUpload);

    const avatarURL = path.join('avatars', resultUpload);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
      avatarURL,
    });
    } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
    }
};

module.exports = updateAvatar;