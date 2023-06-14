const path = require('path');
const multer = require('multer');

const uploadBase = path.resolve(__dirname, "./uploads");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})

module.exports = storage;