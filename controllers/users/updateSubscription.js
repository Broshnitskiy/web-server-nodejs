const { UserModel, JoiSubscriptionSchema } = require("../../models/user");
const { NotFound } = require("http-errors");

const updateSubscription = async (req, res, next) => {
  try {
    const { error } = JoiSubscriptionSchema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = "missing required name field";
      throw error;
    }

    const { _id } = req.user;
    const { subscription } = req.body;
    const result = await UserModel.findByIdAndUpdate(
      _id,
      { subscription },
      { new: true }
    );
    if (!result) {
      throw new NotFound(`Product with id=${_id} not found`);
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

module.exports = updateSubscription;
