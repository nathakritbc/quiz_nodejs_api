const db = require("../models");
const Shop = db.shops;
const Product = db.products;

const constants = require("../constants");

// // Create and Save a new Shop
exports.create = async (req, res) => {
  try {
    const payload = {
      ...req.body,
    };

    const result = await Shop.create(payload);

    res.status(201).send({ message: constants.kResultOk, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: constants.kResultNok });
  }
};

// Retrieve all Shops from the database.
exports.findAll = async (req, res) => {
  try {
    const { query } = req;
    const result = await Shop.findAll({
      order: [["createdAt", "DESC"]],
      where: query,
      include: [{ model: Product }],
    });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(404).json({
      message: constants.kResultNok,
    });
  }
};

// Find a single Shop with an id
exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Shop.findByPk(id, { include: [{ model: Product }] });
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

// Update a Shop by the id in the request
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Shop.findByPk(id);

    if (!result) {
      res.status(500).json({
        message: constants.kResultNok,
      });
      return;
    }

    const payload = {
      ...result,
      ...req.body,
    };

    await Shop.update(payload, {
      where: { id: id },
    });

    const newResult = await Shop.findByPk(id);

    res.status(200).json({
      message: constants.kResultOk,
      result: newResult.dataValues,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: constants.kResultNok });
  }
};

// Delete a Shop with the specified id in the request
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Shop.findByPk(id);

    if (!result) {
      console.error("Internal error");
      res.status(500).json({ message: constants.kResultNok });
      return;
    }

    const isCheck = await Shop.destroy({ where: { id: id } });

    res.status(200).json({
      message: constants.kResultOk,
      result: isCheck,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: constants.kResultNok,
    });
  }
};
