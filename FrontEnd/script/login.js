import { authenticateUser } from "./authservice.js";

// Add event listener to the submit button
document.getElementById("submit").addEventListener("click", async (event) => {
  event.preventDefault();

  // Get email and password values from the input fields
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // Authenticate the user
    await authenticateUser(email, password);
    window.location.href = "../index.html";
  } catch (error) {
    // Display error message if authentication fails
    const loginErrorElement = document.getElementById("login-error");
    if (loginErrorElement) {
      loginErrorElement.style.display = "block";
      loginErrorElement.textContent =
        "Erreur de connexion, veuillez vérifier vos informations.";
    }
  }
});
