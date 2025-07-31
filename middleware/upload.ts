import multer from "multer";
import path from "path";

// Save to /uploads dir
const storage = multer.diskStorage({
    destination: path.join(process.cwd(), "uploads"),
    filename: (_req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`;
        cb(null, uniqueName);
    },
});

export const upload = multer({ storage });
