const db = require("../models");
const ProductType = db.product_types;
const Joi = require("joi");
const constants = require("../constants");

// // Create and Save a new ProductType
exports.create = async (req, res) => {
  try {
    const schema = Joi.object({
      pty_name: Joi.string().required().min(2),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      console.log(error.details[0].message);
      res.status(400).send({
        message: constants.kResultNok,
        result: error.details[0].message,
      });
      return;
    }

    const payload = {
      ...req.body,
    };

    const result = await ProductType.create(payload);

    res.status(201).send({ message: constants.kResultOk, result });
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: constants.kResultNok });
  }
};

// Retrieve all ProductTypes from the database.
exports.findAll = async (req, res) => {
  try {
    const { query } = req;
    const result = await ProductType.findAll({
      order: [["createdAt", "DESC"]],
      where: query,
    });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(404).json({
      message: constants.kResultNok,
    });
  }
};

// Find a single ProductType with an id
exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ProductType.findByPk(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(200).json({});
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({
      message: constants.kResultNok,
    });
  }
};

// Update a ProductType by the id in the request
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ProductType.findByPk(id);

    if (!result) {
      res.status(400).send({
        message: constants.kResultNok,
      });
      return;
    }

    const schema = Joi.object({
      pty_name: Joi.string().min(2),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      console.log(error.details[0].message);
      res.status(400).send({
        message: constants.kResultNok,
        result: error.details[0].message,
      });
      return;
    }

    const payload = {
      ...result,
      ...req.body,
    };

    await ProductType.update(payload, {
      where: { id: id },
    });

    const newResult = await ProductType.findByPk(id);

    res.status(200).json({
      message: constants.kResultOk,
      result: newResult.dataValues,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: constants.kResultNok });
  }
};

// Delete a ProductType with the specified id in the request
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ProductType.findByPk(id);

    if (!result) {
      console.error("Internal error");
      res.status(400).send({ message: constants.kResultNok });
      return;
    }

    const isCheck = await ProductType.destroy({ where: { id: id } });

    res.status(200).json({
      message: constants.kResultOk,
      result: isCheck,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      message: constants.kResultNok,
    });
  }
};
