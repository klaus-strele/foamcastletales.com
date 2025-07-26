"use strict";

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
