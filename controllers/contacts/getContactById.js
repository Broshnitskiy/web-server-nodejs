const { ContactModel } = require("../../models/contacts");
const { NotFound } = require("http-errors");

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await ContactModel.findById(id);
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

module.exports = getContactById;
