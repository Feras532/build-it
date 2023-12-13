const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 10 *1024 * 1024 },
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".PNG" ) {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});