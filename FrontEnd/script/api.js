// Utilisation du cache en mémoire pour éviter les doublons d'appels fetch
const apiUrl = "http://localhost:5678/api/works";
const categoryUrl = "http://localhost:5678/api/categories";

let projectsCache = null;
let categoriesCache = null;

// Fonction pour récupérer les projets avec cache en mémoire
export const fetchProjects = async () => {
  if (projectsCache) {
    return projectsCache;
  }

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const data = await response.json();
    projectsCache = data; // Sauvegarde dans le cache en mémoire
    return data;
  } catch (error) {
    console.error("Erreur lors du fetch des projets :", error);
    return []; // Retourner un tableau vide en cas d'erreur
  }
};

// Fonction pour récupérer les catégories avec cache en mémoire
export const fetchCategories = async () => {
  if (categoriesCache) {
    return categoriesCache;
  }

  try {
    const response = await fetch(categoryUrl);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const data = await response.json();
    categoriesCache = data; // Sauvegarde dans le cache en mémoire
    return data;
  } catch (error) {
    console.error("Erreur lors du fetch des catégories :", error);
    return []; // Retourner un tableau vide en cas d'erreur
  }
};
