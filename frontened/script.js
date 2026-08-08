const input = document.getElementById("qrInput");
const generateButton = document.getElementById("generateButton");
const qrContainer = document.getElementById("qrContainer");
const downloadButton = document.getElementById("downloadButton");


generateButton.addEventListener("click", () => {
    const text = input.value;
    console.log(text);
});