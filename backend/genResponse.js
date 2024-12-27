import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";
import { config } from "dotenv";

config(); // Load environment variables

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });

/**
 * Process a PDF file by extracting its content and generating structured Q&A pairs.
 * 
 * @param {string} filePath - The path to the PDF file.
 * @returns {Promise<Array>} - An array of question-answer objects extracted from the PDF.
 */
export async function processPDF(filePath) {
    try {
        // Read and encode the PDF file in base64
        const fileData = Buffer.from(fs.readFileSync(filePath)).toString("base64");

        // Send the file content and prompt to the Gemini API
        const result = await model.generateContent([
            {
                inlineData: {
                    data: fileData,
                    mimeType: "application/pdf",
                },
            },
            `
            Extract information from the document and format it as a series of questions and answers. 
            Each item should be an object with the following structure:
            { "question": "What is the definition of a hazard?", "answer": "A hazard can be defined as a potentially damaging physical event, social and economic disruption or environmental degradation." }

            - Ensure the 'question' field is a clear question, not just a statement.
            - Ensure the 'answer' field is the information that answers that question directly.
            - Present the results in an array of objects, each object containing 'question' and 'answer' fields.
            - Only include valid question-answer pairs that can be extracted from the document.
            - Keep the answers short.
            `,
        ]);

        // Extract and clean the response text
        const rawResponse = result.response.text();
        const cleanedResponse = rawResponse
            .replace(/```json/g, "") // Remove ```json
            .replace(/```/g, "");   // Remove ending triple backticks

        // Parse and return the JSON response
        return JSON.parse(cleanedResponse);
    } catch (err) {
        console.error("Error in processPDF:", err);
        throw new Error("Failed to process the PDF.");
    }
}


