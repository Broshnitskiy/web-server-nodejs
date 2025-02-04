const { ContactModel } = require("../../models/contact");
const { NotFound } = require("http-errors");

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await ContactModel.findByIdAndRemove(id);
    if (!result) {
      throw new NotFound(`Contact with id=${id} not found`);
    }

    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContact;
