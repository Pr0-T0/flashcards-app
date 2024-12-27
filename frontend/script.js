// Array of fun facts
const funFacts = [
    "Did you know? The first AI program, written in 1951, was a checkers-playing algorithm.",
    "Fun fact: AI is capable of generating art, music, and even poetry that mimics human creativity.",
    "Did you know? The term 'Artificial Intelligence' was coined at a conference at Dartmouth College in 1956.",
    "Fun fact: AI can analyze data millions of times faster than humans, making it a vital tool for scientific research.",
    "Did you know? Self-driving cars use AI to make split-second decisions for safety and navigation.",
    "Fun fact: AI is used in healthcare to detect diseases like cancer at an early stage with high accuracy.",
    "Did you know? Virtual assistants like Siri and Alexa rely on natural language processing, a branch of AI.",
    "Fun fact: AI-powered robots have been sent to space to assist astronauts with tasks and experiments.",
    "Did you know? AI can predict customer preferences, helping businesses personalize their services.",
    "Fun fact: AI is helping to save endangered species by analyzing data from wildlife cameras and sensors.",
];

// Function to get a random fun fact
function getRandomFunFact() {
    const randomIndex = Math.floor(Math.random() * funFacts.length);
    return funFacts[randomIndex];
}

// Function to toggle UI elements
function toggleUI(showLoading = false) {
    const loadingAnimation = document.getElementById("loading-animation");
    const pdfPreview = document.getElementById("pdf-preview");
    const confirmButton = document.getElementById("confirm-button");
    const uploadButton = document.getElementById("file-button");

    if (showLoading) {
        const loadingText = loadingAnimation.querySelector(".loading-text");
        loadingText.textContent = getRandomFunFact(); // Set random fun fact
        loadingAnimation.style.display = "block";
        pdfPreview.style.display = "none";
        confirmButton.style.display = "none";
        uploadButton.style.display = "none";
    } else {
        loadingAnimation.style.display = "none";
        pdfPreview.style.display = "block";
        confirmButton.style.display = "block";
        uploadButton.style.display = "block";
    }
}

function uploadFile(file) {
    if (!file || file.type !== "application/pdf") {
        alert("No valid PDF file selected.");
        return;
    }

    console.log("Uploading file:", file.name);

    const formData = new FormData();
    formData.append("pdf", file);

    toggleUI(true); // Show loading animation and hide other elements

    fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to upload PDF");
            }
            return response.json(); // Assume the server responds with JSON data
        })
        .then((data) => {
            console.log("Server response:", data);

            // Store the received data in localStorage
            localStorage.setItem("qaData", JSON.stringify(data));

            // Redirect to another page
            window.location.href = "cards.html";
        })
        .catch((error) => {
            console.error("Error uploading PDF:", error);
            alert("There was an error uploading the PDF. Please try again.");

            toggleUI(false); // Reset UI to original state
        })
        .finally(() => {
            toggleUI(false); // Ensure UI reset in case of any issues
        });
}

// Event listeners for file upload and confirm button
document.getElementById("file-upload").addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (file && file.type === "application/pdf") {
        const fileURL = URL.createObjectURL(file);
        const pdfPreviewContainer = document.getElementById("pdf-preview");

        pdfPreviewContainer.innerHTML = `<embed src="${fileURL}" width="100%" height="100%" type="application/pdf">`;
        pdfPreviewContainer.style.display = "block";

        const confirmButton = document.getElementById("confirm-button");
        confirmButton.style.display = "block";
        confirmButton.file = file; // Store the file object for later use
    } else {
        alert("Please upload a valid PDF file.");
    }
});

document.getElementById("confirm-button").addEventListener("click", function (event) {
    event.preventDefault();
    const confirmButton = event.currentTarget;
    const file = confirmButton.file;

    uploadFile(file);
});
