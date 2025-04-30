// When the page loads
window.onload = function () {
    const user = localStorage.getItem("user");

    // Check if the user is logged in
    if (user) {
        document.getElementById("logo").innerText = "Welcome, " + user;

        // Increment the active truck count
        incrementActiveTruckCount();

        // Update the email list of active trucks
        updateActiveTruckEmails(user);
    }
};

// Function to increment active truck count
function incrementActiveTruckCount() {
    // Retrieve the current count from localStorage or set to 0 if not available
    let activeTruckCount = parseInt(localStorage.getItem("activeTruckCount") || "0");
    
    // Increment the count
    activeTruckCount++;

    // Store the updated count in localStorage
    localStorage.setItem("activeTruckCount", activeTruckCount);

    // Update the UI with the new active truck count
    document.getElementById("activeTruckCount").textContent = activeTruckCount;

    // Log the current count to the console for debugging
    console.log("Active truck count: " + activeTruckCount);
}

// Function to update the email list of active trucks
function updateActiveTruckEmails(user) {
    // Retrieve the list of active truck emails from localStorage or set an empty array if not available
    let activeTruckEmails = JSON.parse(localStorage.getItem("activeTruckEmails") || "[]");

    // Add the email of the current active truck (replace this logic with actual truck data)
    const truckEmail = user + "@truck.com"; // This is a placeholder. You can adjust it based on your data
    activeTruckEmails.push(truckEmail);

    // Store the updated email list in localStorage
    localStorage.setItem("activeTruckEmails", JSON.stringify(activeTruckEmails));

    // Display the active truck emails in the list
    const emailList = document.getElementById("activeTruckEmails");
    emailList.innerHTML = "";
    activeTruckEmails.forEach(email => {
        const listItem = document.createElement("li");
        listItem.textContent = email;
        emailList.appendChild(listItem);
    });

    // Log the current list of active truck emails to the console for debugging
    console.log("Active truck emails: ", activeTruckEmails);
}
