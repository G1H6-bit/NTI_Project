const fs = require("fs");
const path = require("path");

// Deletes a file from inside uploads/<foldername>/<filename>
function deleteUploadedFile(foldername, filename) {
  const filePath = path.join(__dirname, "..", "uploads", foldername, filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.log("Error deleting file:", err.message);
    }
  });
}

module.exports = deleteUploadedFile;