const { UserModel } = require("../../models/user");

const signOut = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await UserModel.findByIdAndUpdate(_id, { token: null });
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = signOut;
