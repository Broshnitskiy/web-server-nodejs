const jimp = require("jimp");

async function resizeAvatar(req, res, next) {
  try {
    const { path: tempUpload } = req.file;

    const image = await jimp.read(tempUpload);
    await image.cover(250, 250);
    await image.writeAsync(tempUpload);

    next();
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = resizeAvatar;
