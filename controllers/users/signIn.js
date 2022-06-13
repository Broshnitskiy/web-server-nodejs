const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { UserModel, joiLoginSchema } = require("../../models/user");

const { SECRET_KEY } = process.env;

const signIn = async (req, res, next) => {
  try {
    const { error } = joiLoginSchema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = "missing required name field";
      throw error;
    }

    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    const passCompare = bcrypt.compareSync(password, user.password);
    if (!user || !passCompare) {
      throw new Unauthorized("Email or password is wrong");
    }

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await UserModel.findByIdAndUpdate(user._id, { token });

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signIn;
