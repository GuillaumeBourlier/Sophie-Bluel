//Communication avec l'API (fetch, gestion des erreurs réseau, formatage des réponses, etc.).

const apiUrl = "http://localhost:5678/api/works";
const categoryUrl = "http://localhost:5678/api/categories";

//////////////////////////////////////////////////////
// Fonction pour récupérer les projets depuis l'API //
//////////////////////////////////////////////////////
export const fetchProjects = async () => {
  console.log("fetchProjects - Début de la récupération des projets depuis :",apiUrl);
  try {
    const response = await fetch(apiUrl);
    // console.log("fetchProjects - Réponse reçue :", response);
    if (!response.ok) {
      console.error(
        "fetchProjects - Erreur dans la réponse HTTP :",
        response.status,
        response.statusText
      );
      throw new Error("Erreur lors de la récupération des projets");
    }
    const projects = await response.json();
    // console.log("fetchProjects - Projets parsés depuis le JSON :", projects);
    return projects;
  } catch (error) {
    // console.error("fetchProjects - Erreur lors du fetch des projets :", error);
    return []; // Retourner un tableau vide en cas d'erreur
  }
};

/////////////////////////////////////////////////////////
// Fonction pour récupérer les catégories depuis l'API //
/////////////////////////////////////////////////////////
export const fetchCategories = async () => {
  // console.log("fetchCategories - Début de la récupération des catégories depuis :",categoryUrl);
  try {
    const response = await fetch(categoryUrl);
    // console.log("fetchCategories - Réponse reçue :", response);
    if (!response.ok) {
      // console.error("fetchCategories - Erreur dans la réponse HTTP :",response.status,response.statusText);
      throw new Error("Erreur lors de la récupération des catégories");
    }
    const categories = await response.json();
    // console.log("fetchCategories - Catégories parsées depuis le JSON :",categories)
    return categories;
  } catch (error) {
    // console.error("fetchCategories - Erreur lors du fetch des catégories :",error);
    return []; // Retourner un tableau vide en cas d'erreur
  }
};
