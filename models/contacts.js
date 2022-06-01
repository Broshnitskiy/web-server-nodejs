const { Schema, model } = require("mongoose");
const Joi = require("joi");

const mongooseContactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "uk", "org", "ca"] },
  }),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
}).min(1);

const joiFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const ContactModel = model("contact", mongooseContactSchema);

module.exports = { ContactModel, joiContactSchema, joiFavoriteSchema };
