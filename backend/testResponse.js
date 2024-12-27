import { processPDF } from "./genResponse.js";
import * as fs from "fs";
import * as path from "path";

async function processSingleFileInUploads() {
    const uploadsDir = "uploads"; // The path to the uploads folder

    try {
        // Read the files in the uploads directory
        const files = fs.readdirSync(uploadsDir);

        // Ensure there is exactly one file in the folder
        if (files.length !== 1) {
            throw new Error(
                `Expected 1 file in the uploads folder, but found ${files.length}.`
            );
        }

        const filePath = path.join(uploadsDir, files[0]); // Get the full path of the file

        // Process the file
        const result = await processPDF(filePath);
        console.log("Extracted Q&A pairs:", result);
    } catch (err) {
        console.error("Error processing the file in uploads:", err);
    }
}

processSingleFileInUploads();
