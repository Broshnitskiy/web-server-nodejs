const { ContactModel, joiFavoriteSchema } = require("../../models/contacts");
const { NotFound } = require("http-errors");

const updateFavoriteProp = async (req, res, next) => {
  try {
    const { error } = joiFavoriteSchema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = "missing field favorite";
      throw error;
    }
    const { id } = req.params;
    const { favorite } = req.body;
    const result = await ContactModel.findByIdAndUpdate(
      id,
      { favorite },
      {
        new: true,
      }
    );

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

module.exports = updateFavoriteProp;
