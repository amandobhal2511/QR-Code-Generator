const input = document.getElementById("qrInput");
const generateButton = document.getElementById("generateButton");
const qrContainer = document.getElementById("qrContainer");
const downloadButton = document.getElementById("downloadButton");
let qrCodeData;


console.log(input);

generateButton.addEventListener("click", async() => {
    const text = input.value;

    const response = await fetch("http://localhost:8000/generateQR" , {

        method:"POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            content:text
        })
    });

    const result = await response.json();
    qrCodeData = result.qrcode;

    const qrImage = document.createElement("img");

    qrImage.src = result.qrcode;

    qrContainer.innerHTML = "";
    qrContainer.appendChild(qrImage);

    downloadButton.disabled = false;
});


downloadButton.addEventListener("click", () => {

    const link = document.createElement("a");

    link.href = qrCodeData;
    link.download = "qr-code.png";

    link.click();
});