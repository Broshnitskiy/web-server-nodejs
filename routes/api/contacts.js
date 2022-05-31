const express = require("express");
const { NotFound } = require("http-errors");
const {
  ContactModel,
  joiContactSchema,
  joiFavoriteSchema,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const products = await ContactModel.find({});
    res.json({
      status: "success",
      code: 200,
      data: {
        result: products,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
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
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = joiContactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = "missing required name field";
      throw error;
    }
    const result = await ContactModel.create(req.body);
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
});

router.delete("/:id", async (req, res, next) => {
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
});

router.put("/:id", async (req, res, next) => {
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
});

router.patch("/:id/favorite", async (req, res, next) => {
  try {
    const { error } = joiFavoriteSchema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = "missing fields";
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
});

module.exports = router;
