// URL de l'API pour récupérer les projets
const apiUrl = "http://localhost:5678/api/works"; // console.log("URL de l'API pour récupérer les projets :", apiUrl);

// URL de l'API pour récupérer les catégories
const categoryUrl = "http://localhost:5678/api/categories"; // console.log("URL de l'API pour récupérer les catégories :", categoryUrl);

// Fonction pour récupérer les projets depuis l'API
export const fetchProjects = async () => {
  console.log("fetchProjects - Début de la récupération des projets depuis :", apiUrl);
  try {
    // Effectue une requête fetch pour récupérer les projets
    const response = await fetch(apiUrl); // console.log("fetchProjects - Réponse reçue :", response);
    
    // Vérifie si la réponse est correcte
    if (!response.ok) {
      console.error(
        "fetchProjects - Erreur dans la réponse HTTP :",
        response.status,
        response.statusText
      );
      throw new Error("Erreur lors de la récupération des projets");
    }
    
    // Parse la réponse JSON pour obtenir les projets
    const projects = await response.json(); // console.log("fetchProjects - Projets parsés depuis le JSON :", projects);
    return projects;
  } catch (error) {
    // Gère les erreurs lors de la requête fetch
    console.error("fetchProjects - Erreur lors du fetch des projets :", error);
    return []; // Retourner un tableau vide en cas d'erreur
  }
};

// Fonction pour récupérer les catégories depuis l'API
export const fetchCategories = async () => {
  console.log("fetchCategories - Début de la récupération des catégories depuis :", categoryUrl);
  try {
    // Effectue une requête fetch pour récupérer les catégories
    const response = await fetch(categoryUrl); // console.log("fetchCategories - Réponse reçue :", response);
    
    // Vérifie si la réponse est correcte
    if (!response.ok) {
      console.error(
        "fetchCategories - Erreur dans la réponse HTTP :",
        response.status,
        response.statusText
      );
      throw new Error("Erreur lors de la récupération des catégories");
    }
    
    // Parse la réponse JSON pour obtenir les catégories
    const categories = await response.json(); // console.log("fetchCategories - Catégories parsées depuis le JSON :", categories);
    return categories;
  } catch (error) {
    // Gère les erreurs lors de la requête fetch
    console.error("fetchCategories - Erreur lors du fetch des catégories :", error);
    return []; // Retourner un tableau vide en cas d'erreur
  }
};