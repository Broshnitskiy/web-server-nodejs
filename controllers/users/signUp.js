const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { sendEmail } = require("../../helpers/sendEmail");
const { UserModel, joiRegisterSchema } = require("../../models/user");

const signUp = async (req, res, next) => {
  try {
    const { error } = joiRegisterSchema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = "missing required name field";
      throw error;
    }

    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      throw new Conflict(`${email} Email in use`);
    }

    const verificationToken = nanoid();

    const avatarURL = gravatar.url(email);

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const result = await UserModel.create({
      email,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });

    const mail = {
      to: email,
      subject: "Verification email",
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Verification email</a>`,
    };

    await sendEmail(mail);

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signUp;
