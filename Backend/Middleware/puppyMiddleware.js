import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9); // Ensure a unique filename
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)); // Example: image-12345678.jpg
    }
});

const upload = multer({ storage: storage });
export default upload;