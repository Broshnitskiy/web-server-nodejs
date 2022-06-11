const { ContactModel, joiContactSchema } = require("../../models/contact");
const { NotFound } = require("http-errors");

const updateContact = async (req, res, next) => {
  try {
    const { error } = joiContactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = "missing fields";
      throw error;
    }
    const { id } = req.params;
    const result = await ContactModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!result) {
      throw new NotFound(`Contact with id=${id} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
