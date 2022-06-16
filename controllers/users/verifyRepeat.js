const { UserModel } = require("../../models/user");
const { sendEmail } = require("../../helpers/sendEmail");

const verifyRepeat = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({
        message: "missing required field email",
      });
    }

    const { verificationToken, verify } = await UserModel.findOne({ email });

    if (!verify) {
      const mail = {
        to: email,
        subject: "Verification email",
        html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Verification email</a>`,
      };

      await sendEmail(mail);
    } else {
      res.status(400).json({
        message: "Verification has already been passed",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = verifyRepeat;
