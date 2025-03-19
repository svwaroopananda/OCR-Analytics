import React, { useState } from "react";
import axios from "axios";

function App() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [ocrText, setOcrText] = useState("");

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select an image first!");
            return;
        }

        const formData = new FormData();
        formData.append("image", selectedFile);

        try {
            const response = await axios.post(
                "https://your-app-name.onrender.com/api/ocr",  // 🔴 UPDATED URL
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            const textOutput = response.data.regions
                .flatMap(region => region.lines)
                .map(line => line.words.map(word => word.text).join(" "))
                .join("\n");

            setOcrText(textOutput);
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to process image.");
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>OCR Analytics</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload & Analyze</button>
            <h3>Extracted Text:</h3>
            <pre>{ocrText}</pre>
        </div>
    );
}

export default App;
