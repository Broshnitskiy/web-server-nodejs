const { ContactModel, joiContactSchema } = require("../../models/contact");

const addContacts = async (req, res, next) => {
  try {
    const { error } = joiContactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = "missing required name field";
      throw error;
    }
    const { _id } = req.user;
    const result = await ContactModel.create({ ...req.body, owner: _id });
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

module.exports = addContacts;
