// Get modal and buttons
const modal = document.getElementById("popupModal");
const downloadBtn = document.getElementById("downloadBtn");
const closeBtn = document.getElementById("closeBtn");
const selectBtn = document.getElementById("selectBtn");
const downloadChoice = document.getElementById("downloadChoice");

// When the "Download Now" button is clicked, show the popup
downloadBtn.addEventListener("click", function(event) {
    event.preventDefault();  // Prevent default action (link navigation)
    modal.style.display = "flex";  // Show the modal
});

// When the "X" button is clicked, close the modal
closeBtn.addEventListener("click", function() {
    modal.style.display = "none";  // Hide the modal
});

// When the user clicks outside the modal, close the modal
window.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none";  // Hide the modal
    }
});

// Handle the "Select" button click
selectBtn.addEventListener("click", function() {
    const selectedOption = downloadChoice.value;  // Get the selected download option

    // Define the download URLs for each option
    let downloadUrl = "";

    if (selectedOption === "direct") {
        downloadUrl = "/direct-download-link";  // Replace with your actual direct download link
    } else if (selectedOption === "mirror") {
        downloadUrl = "/mirror-download-link";  // Replace with your mirror download link
    } else if (selectedOption === "torrent") {
        downloadUrl = "/torrent-download-link";  // Replace with your torrent download link
    }

    // Redirect to the chosen download URL
    window.location.href = downloadUrl;
});
