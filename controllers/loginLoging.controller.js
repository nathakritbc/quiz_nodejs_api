const db = require("../models");
const LoginLoging = db.login_loging;

const constants = require("../constants");

// // Create and Save a new LoginLoging
exports.create = async (req, res) => {
  try {
    const { p_name, p_price, p_amount, p_image } = req.body;

    const res = {
      p_name,
      p_price,
      p_amount,
      p_image,
    };

    const result = await LoginLoging.create(res);

    res.status(201).send({ message: constants.kResultOk, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: constants.kResultNok });
  }
};

// Retrieve all LoginLogings from the database.
exports.findAll = async (req, res) => {
  try {
    const { query } = req;
    const result = await LoginLoging.findAll({
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

// Find a single LoginLoging with an id
exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await LoginLoging.findByPk(id);
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

// Update a LoginLoging by the id in the request
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await LoginLoging.findByPk(id);

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

    await LoginLoging.update(payload, {
      where: { id: id },
    });

    res.status(200).json({
      message: constants.kResultOk,
      result: payload.dataValues,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: constants.kResultNok });
  }
};

// Delete a LoginLoging with the specified id in the request
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await LoginLoging.findByPk(id);

    if (!result) {
      console.error("Internal error");
      res.status(500).json({ message: constants.kResultNok });
      return;
    }

    const isCheck = await LoginLoging.destroy({ where: { id: id } });

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
