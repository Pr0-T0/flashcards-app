import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { processPDF } from "./genResponse.js";

const app = express();


// Custom storage engine for multer to keep the original file name
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Specify the upload folder
    },
    filename: (req, file, cb) => {
        // Set a specific file name, for example using a timestamp
        cb(null, file.originalname); // Use the custom file name
    }
});

const upload = multer({ storage: storage });

// Enable CORS
app.use(cors());

// Add a root route
app.get("/", (req, res) => {
    res.send("Server is up and running!");
});

// Endpoint to handle PDF file uploads
app.post("/upload", upload.single("pdf"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = path.resolve("uploads", req.file.originalname);
    const processedData =  await processPDF(filePath);

    res.json(processedData);

});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
