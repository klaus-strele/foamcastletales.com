"use strict";

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const hasGetUserMedia = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
console.log("isMobile:", isMobile);
console.log("hasGetUserMedia:", hasGetUserMedia);


document.getElementById('cameraInput').addEventListener('change', function(event) {
      const file = event.target.files[0];
      if (file) {
        const img = document.getElementById('preview');
        img.src = URL.createObjectURL(file);
        img.style.display = 'block';
      }
});


async function startCamera() {
    const video = document.getElementById('video');
    const constraints = {
        video: {
            facingMode: 'environment' // Use 'user' for front camera
        }
    };
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints, { video: true });
        video.srcObject = stream;

        // Ensure the video element is ready to play - from MDN
        video.onloadedmetadata = () => {
            video.play();
        };

    } catch (err) {
        console.error("Error accessing the camera", err);
    }
}

function getGeoLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject("Geolocation is not supported.");
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => resolve(position),
            (error) => reject(error) 
        );
    });
}

function getLocation() {
    console.log("Fetching geolocation...");
    const geoLocationDiv = document.getElementById("geoLocation");
    geoLocationDiv.innerHTML = "Fetching location...";
    getGeoLocation()
        .then((position) => {
            const coords = position.coords;
            geoLocationDiv.innerHTML = `Latitude: ${coords.latitude}, Longitude: ${coords.longitude}`;
            console.log("Geolocation fetched successfully:", coords);
        })
        .catch((error) => {
            geoLocationDiv.innerHTML = "Error fetching location.";
            console.error("Error fetching geolocation:", error);
        })
        .finally(() => {
            console.log("Geolocation fetch attempt completed.");
        });
}
