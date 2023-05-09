const db = require("../models");
const Product = db.products;
const Shop = db.shops;

const constants = require("../constants");

const fs = require("fs");

const removeImage = async (path) => {
  await fs.unlinkSync(path, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

// // Create and Save a new Product
exports.create = async (req, res) => {
  try {
    const product = {
      ...req.body,
    };

    const result = await Product.create(product);

    res.status(201).send({ message: constants.kResultOk, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: constants.kResultNok });
  }
};

// Retrieve all Products from the database.
exports.findAll = async (req, res) => {
  try {
    const { query } = req;
    const result = await Product.findAll({
      order: [["createdAt", "DESC"]],
      where: query,
      include: [{ model: Shop }],
    });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(404).json({
      message: constants.kResultNok,
    });
  }
};

// Find a single Product with an id
exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.findByPk(id, { include: [{ model: Shop }] });
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

// Update a Product by the id in the request
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.findByPk(id);

    if (!result) {
      res.status(500).json({
        message: constants.kResultNok,
      });
      return;
    }

    const product = {
      ...result,
      ...req.body,
    };

    await Product.update(product, {
      where: { id: id },
    });

    const newResult = await Product.findByPk(id);

    res.status(200).json({
      message: constants.kResultOk,
      result: newResult.dataValues,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: constants.kResultNok });
  }
};

// Delete a Product with the specified id in the request
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.findByPk(id);

    const imagePath = `./uploads/images/${result.p_image}`;
    if (!result) {
      console.error("Internal error");
      res.status(500).json({ message: constants.kResultNok });
      return;
    }

    const product = await Product.destroy({ where: { id: id } });

    // if (product) {
    await removeImage(imagePath);
    res.status(200).json({
      message: constants.kResultOk,
      result: product,
    });
    // }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: constants.kResultNok,
    });
  }
};
