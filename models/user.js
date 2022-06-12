const { Schema, model } = require("mongoose");
const Joi = require("joi");

const mongooseUserSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiRegisterSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(4).required(),
});

const JoiSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const UserModel = model("user", mongooseUserSchema);

module.exports = {
  UserModel,
  joiRegisterSchema,
  joiLoginSchema,
  JoiSubscriptionSchema,
};
