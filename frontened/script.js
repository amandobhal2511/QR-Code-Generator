const input = document.getElementById("qrInput");

const generateButton =
    document.getElementById("generateButton");

const qrContainer =
    document.getElementById("qrContainer");

const downloadButton =
    document.getElementById("downloadButton");

const errorMessage =
    document.getElementById("errorMessage");


let qrCodeData;



// GENERATE QR CODE

generateButton.addEventListener("click", async () => {

    const text = input.value;


    // Frontend Validation

    if (text.trim() === "") {

        errorMessage.classList.remove("hidden");

        return;

    }


    // Hide error
    errorMessage.classList.add("hidden");


    try {

        // Send request to backend

        const response = await fetch(
            "https://qr-code-generator-backend-sepia.vercel.app/generateQR",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    content: text
                })

            }
        );


        // Convert response to JSON

        const result = await response.json();


        
        // Backend validation/error

        if (!response.ok) {

            errorMessage.textContent =
                result.message || "Something went wrong";

            errorMessage.classList.remove("hidden");

            return;

        }


        // Store QR image data

        qrCodeData = result.qrcode;


        // Create QR image

        const qrImage =
            document.createElement("img");


        qrImage.src = result.qrcode;

        qrImage.alt = "Generated QR Code";

        qrImage.className =
            "w-48 h-48 rounded-xl shadow-md";


        // Display QR

        qrContainer.innerHTML = "";

        qrContainer.appendChild(qrImage);


        // Enable download button

        downloadButton.disabled = false;


    } catch (error) {

        console.error(error);

        errorMessage.textContent =
            "Unable to connect to the server.";

        errorMessage.classList.remove("hidden");

    }

});



// DOWNLOAD QR CODE

downloadButton.addEventListener("click", () => {

    if (!qrCodeData) {
        return;
    }


    const link =
        document.createElement("a");


    link.href = qrCodeData;

    link.download = "qr-code.png";


    link.click();

});



// HIDE ERROR WHEN USER STARTS TYPING

input.addEventListener("input", () => {

    if (input.value.trim() !== "") {

        errorMessage.classList.add("hidden");

    }

});