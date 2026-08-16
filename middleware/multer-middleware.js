const multer = require("multer");
const fs = require("fs");

// Decides WHERE an uploaded file gets saved
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dest = "uploads";

    if (req.baseUrl.includes("recipes")) {
      dest = "uploads/recipes";
    } else if (req.baseUrl.includes("users") || req.baseUrl.includes("auth")) {
      dest = "uploads/users";
    }

    try {
      fs.mkdirSync(dest, { recursive: true });
      cb(null, dest);
    } catch (err) {
      cb(err, null);
    }
  },

  // Decides what the saved file is NAMED
  filename: function (req, file, cb) {
    let fileType = file.mimetype.split("/")[1];
    let fileName = file.originalname;

    if (req.baseUrl.includes("recipes")) {
      fileName = `recipe-${Date.now()}.${fileType}`;
    } else if (req.baseUrl.includes("users") || req.baseUrl.includes("auth")) {
      fileName = `user-${Date.now()}.${fileType}`;
    }

    cb(null, fileName);
  },
});

// Only allow image files (no PDFs, videos, zips, etc.)
const fileFilter = (req, file, cb) => {
  const fileType = file.mimetype.split("/")[0];

  if (fileType === "image") {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({ storage: diskStorage, fileFilter });

module.exports = upload;