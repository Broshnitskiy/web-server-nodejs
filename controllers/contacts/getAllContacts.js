const { ContactModel } = require("../../models/contacts");

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await ContactModel.find({});

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
