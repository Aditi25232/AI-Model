let model, maxPredictions;

// Load the model
async function loadModel() {
    const modelURL = "./my_model/model.json";
    const metadataURL = "./my_model/metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    console.log("Model Loaded Successfully");
}

// Predict the uploaded image
async function predictImage(image) {
    const prediction = await model.predict(image);
    let highestProb = 0;
    let predictedClass = "";

    prediction.forEach(pred => {
        if (pred.probability > highestProb) {
            highestProb = pred.probability;
            predictedClass = pred.className;
        }
    });

    document.getElementById("result").innerText = `Predicted Waste Category: ${predictedClass} (${(highestProb * 100).toFixed(2)}%)`;
}

// Handle file upload
document.getElementById("imageUpload").addEventListener("change", async function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const imgElement = document.getElementById("uploadedImage");
    imgElement.src = URL.createObjectURL(file);
    imgElement.style.display = "block";

    await loadModel();
    imgElement.onload = async () => {
        await predictImage(imgElement);
    };
});
