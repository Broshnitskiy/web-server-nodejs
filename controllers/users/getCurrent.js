const getCurrent = async (req, res, next) => {
  try {
    const { user } = req;
    res.json({
      status: "success",
      code: 200,
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getCurrent;
