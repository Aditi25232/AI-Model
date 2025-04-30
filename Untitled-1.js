let model, maxPredictions;

// Load Teachable Machine model
async function loadModel() {
    const modelURL = "./my_model/model.json";
    const metadataURL = "./my_model/metadata.json";
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    console.log("Model Loaded Successfully");
}

// Predict image
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

    document.getElementById("result").innerText =
        `Predicted Waste Category: ${predictedClass} (${(highestProb * 100).toFixed(2)}%)`;
}

// Handle uploaded image
document.getElementById("imageUpload").addEventListener("change", async function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const imgElement = document.getElementById("uploadedImage");
    imgElement.src = URL.createObjectURL(file);
    imgElement.style.display = "block";

    imgElement.onload = async () => {
        if (!model) await loadModel();
        await predictImage(imgElement);
    };
});

// Show webcam when button clicked
document.getElementById("showWebcam").addEventListener("click", () => {
    const webcamSection = document.getElementById("webcamSection");
    webcamSection.style.display = "block";

    // Start webcam stream
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            document.getElementById("video").srcObject = stream;
        })
        .catch((err) => {
            console.error("Error accessing webcam:", err);
        });
});

// Handle webcam capture
document.getElementById("capture").addEventListener("click", async () => {
    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const uploadedImage = document.getElementById("uploadedImage");

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL("image/png");

    uploadedImage.src = dataURL;
    uploadedImage.style.display = "block";

    const img = new Image();
    img.src = dataURL;
    img.onload = async () => {
        if (!model) await loadModel();
        await predictImage(img);
    };

    if (!localStorage.getItem("user")) {
        window.location.href = "signin.html";
    }
    
    window.onload = function () {
        const user = localStorage.getItem("user");
        if (user) {
            document.getElementById("logo").innerText = "Welcome, " + user;
        }
    };
    
});
