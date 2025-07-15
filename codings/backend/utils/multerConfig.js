const multer = require("multer");
const path = require("path");
const fs = require("fs"); // For file system operations

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true }); // recursive: true creates parent directories if they don't exist
}

// Multer storage configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir); // Files will be stored in the 'uploads' directory
  },
  filename: function (req, file, cb) {
    // Generate a unique filename: fieldname-timestamp.ext
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
