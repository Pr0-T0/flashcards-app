# Flashcard Generator Using Gemini API

This project leverages the **Gemini API** to create flashcards from PDF notes, streamlining the study process by transforming written content into concise, question-and-answer flashcards.

## Features
- **Gemini API Integration:** Use AI to identify key concepts and generate flashcards.
- **Export Options:** Save flashcards in various formats such as JSON or plain text.

## Requirements
- Node.js 
- A valid Gemini API key

### Dependencies
Install the required Node.js libraries using:
```bash
cd backend
```
```bash
npm install
```
Example `package.json` dependencies:
```json
{
  "dependencies": {
    "@google/generative-ai": "^0.21.0",
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "multer": "^1.4.5-lts.1"
  }
}
```

## Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Pr0-T0/flashcards-app.git
   ```

2. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Add your Gemini API key:
   - Create a `.env` file in the project directory.
   - Add the following line:
     ```env
     GEMINI_API_KEY=your_api_key_here
     ```

## Usage
- **run frontend/index.html using Liveserver
- **run backend/server.js
  ```bash
      node server.js
  ```

## Example Workflow
1. input PDF file
2. run by clicking confirm
3. Review and use the flashcards for study purposes.

## Contribution
Contributions are welcome! Please fork the repository and submit a pull request.

## Additional Notes:
  this is a basic implementation of Generation of flashcards using GEMINI,it it assumed that both backend and frontend are maintained on the same machine.

