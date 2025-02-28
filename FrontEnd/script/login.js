import { authenticateUser } from "./authservice.js";

// Gestion de la soumission du formulaire de connexion
document.getElementById("submit").addEventListener("click", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // Tentative de connexion
    await authenticateUser(email, password);
    window.location.href = "../index.html"; // Rediriger vers la page d'accueil après la connexion réussie
  } catch (error) {
    document.getElementById("login-error").style.display = "block"; // Afficher l'erreur en cas d'échec
  }
});
