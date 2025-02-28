// URL de l'API pour l'authentification des utilisateurs
const loginUrl = "http://localhost:5678/api/users/login";

// Fonction pour authentifier un utilisateur
export const authenticateUser = async (email, password) => {
  try {
    console.log("Début de l'authentification de l'utilisateur");

    // Effectue une requête fetch pour l'authentification
    const response = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    // Vérifie si la réponse est correcte
    if (!response.ok) {
      console.error("Authentification échouée :", response.status, response.statusText);
      throw new Error("Authentification échouée");
    }

    // Parse la réponse JSON pour obtenir les données
    const data = await response.json();
    localStorage.setItem('token', data.token); // Enregistrer le token dans le localStorage
    console.log("Authentification réussie, token enregistré dans localStorage");
  } catch (error) {
    // Gère les erreurs lors de la requête fetch
    console.error("Erreur lors de l'authentification :", error);
    throw error;
  }
};