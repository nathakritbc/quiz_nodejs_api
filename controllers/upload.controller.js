const { v4: uuidv4 } = require("uuid");
const formidable = require("formidable");
const constants = require("../constants");
const fse = require("fs-extra");

const imagePath = `${__dirname}/../uploads/images/`;

// Upload Image
exports.uploadImage = async (req, res, next) => {
  const form = formidable({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    const { image } = files;
    const imageType = image.mimetype.substr(0, 5).trim();

    if (imageType !== "image") {
      res
        .status(500)
        .json({ error: "file type not image", message: constants.kResultNok });
      next(err);
      return;
    }

    const oldpath = image.filepath;
    const uuidName = uuidv4(Date.now());
    const newImageName = `${uuidName}${image.originalFilename}`;
    const newpath = `${imagePath}${newImageName}`;

    await fse.moveSync(oldpath, newpath);

    res.status(200).json({
      message: constants.kResultOk,
      result: { originalFilename: files.image.originalFilename, newImageName },
    });
  });
};
