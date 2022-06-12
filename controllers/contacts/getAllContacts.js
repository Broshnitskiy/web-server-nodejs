const { ContactModel } = require("../../models/contact");

const getAllContacts = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { page = 1, limit = 10, favorite = null } = req.query;
    const skip = (page - 1) * limit;
    const contacts = await ContactModel.find({ owner: _id, favorite }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id email");

    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;
