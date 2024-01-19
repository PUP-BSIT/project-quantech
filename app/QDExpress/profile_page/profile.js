document.addEventListener("DOMContentLoaded", function () {
    const username = "scruzzz";
  
    const usernameElement = document.getElementById("username");
    usernameElement.textContent = username;
  
    const logoutButton = document.getElementById("logout-btn");
    logoutButton.addEventListener("click", function () {
      alert("Logout clicked.");
    });
  });
  