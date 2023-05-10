const db = require("../models");
const Product = db.products;
const Shop = db.shops;
const { Op } = require("sequelize");
const constants = require("../constants");
const Joi = require("joi");

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
    const schema = Joi.object({
      p_name: Joi.string().required().min(2),
      p_price: Joi.number().required(),
      p_amount: Joi.number().required(),
      p_image: Joi.string().required(),
      p_status: Joi.string(),
      productTypeId: Joi.string().guid().required(),
      shopId: Joi.string().guid().required(),
      p_date_of_manufacture: Joi.date(),
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

    const product = {
      ...req.body,
    };

    const result = await Product.create(product);

    res.status(201).send({ message: constants.kResultOk, result });
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: constants.kResultNok });
  }
};

// Retrieve all Products from the database.
exports.findAll = async (req, res) => {
  try {
    let { query } = req;

    let queryParams = {
      ...query,
    };

    if (queryParams._page) {
      delete queryParams._page;
    }

    if (queryParams._limit) {
      delete queryParams._limit;
    }

    const result = await Product.findAll({
      order: [["createdAt", "DESC"]],
      where: queryParams,
      include: [{ model: Shop }],
      offset: query._page,
      limit: query._limit,
    });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(404).json({
      message: constants.kResultNok,
    });
  }
};

exports.findAllFormatCustom = async (req, res) => {
  try {
    let { query } = req;

    let queryParams = {
      ...query,
    };

    if (queryParams._page) {
      delete queryParams._page;
    }

    if (queryParams._limit) {
      delete queryParams._limit;
    }

    const result = await Product.findAll({
      order: [["createdAt", "DESC"]],
      where: queryParams,
      include: [{ model: Shop }],
      offset: query._page,
      limit: query._limit,
    });

    const newFormatResult = result.map((value) => {
      const p_price = Number(value.dataValues.p_price.toFixed(2));
      const d = new Date(value.dataValues.p_date_of_manufacture);

      const p_date_of_manufacture_en = `${d
        .getDate()
        .toString()
        .padStart(2, "0")}/${Number(d.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${d.getFullYear()}`;

      const p_date_of_manufacture_th = `${d
        .getDate()
        .toString()
        .padStart(2, "0")}/${Number(d.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${d.getFullYear() + 543}`;

      return {
        ...value.dataValues,
        p_price,
        p_date_of_manufacture_en,
        p_date_of_manufacture_th,
      };
    });

    res.status(200).json({
      oldFormatResult: result,
      newFormatResult,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({
      message: constants.kResultNok,
    });
  }
};

exports.findByAttributesAndSubQuery = async (req, res) => {
  try {
    let { query } = req;

    let queryParams = {
      ...query,
    };

    if (queryParams._page) {
      delete queryParams._page;
    }

    if (queryParams._limit) {
      delete queryParams._limit;
    }

    const attributes = ["id", "p_name", "p_price", "p_status"];
    const where = {
      [Op.and]: [
        {
          p_price: {
            [Op.gt]: 50,
          },
        },
        { p_status: true },
      ],
    };

    const result = await Product.findAll({
      order: [["createdAt", "DESC"]],
      where,
      attributes,
      // include: [{ model: Shop }],
      offset: query._page,
      limit: query._limit,
    });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(404).json({
      message: constants.kResultNok,
    });
  }
};

exports.findByShopName = async (req, res) => {
  try {
    const { shop_name } = req.params;
    const result = await Product.findAll({
      where: {},
      include: [{ model: Shop, where: { name: shop_name } }],
    });
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
      res.status(400).send({
        message: constants.kResultNok,
      });
      return;
    }

    const schema = Joi.object({
      p_name: Joi.string().min(2),
      p_price: Joi.number(),
      p_amount: Joi.number(),
      p_image: Joi.string(),
      p_status: Joi.string(),
      productTypeId: Joi.string().guid(),
      p_date_of_manufacture: Joi.date(),
      shopId: Joi.string().guid(),
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
    res.status(400).send({ message: constants.kResultNok });
  }
};

exports.updateProductByShopNameAndStatus = async (req, res) => {
  try {
    const { shop_name } = req.params;

    const resShop = await Shop.findOne({
      where: { name: shop_name },
    });

    await Product.update(
      { p_status: false },
      {
        where: { shopId: resShop.dataValues.id },
      }
    );

    res.status(200).json({
      message: constants.kResultOk,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: constants.kResultNok });
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
      res.status(400).send({ message: constants.kResultNok });
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
    res.status(400).send({
      message: constants.kResultNok,
    });
  }
};
