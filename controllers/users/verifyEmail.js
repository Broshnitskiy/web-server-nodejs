const { NotFound } = require("http-errors");

const { UserModel } = require("../../models/user");

const verifyEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await UserModel.findOne({ verificationToken });
    if (!user) {
      throw NotFound();
    }
    await UserModel.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });

    res.json({
      message: "Verify success",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyEmail;
