//Fichier contenant les fonctions pour récupérer les données de l'API
const apiUrl = "http://localhost:5678/api/works";
const categoryUrl = "http://localhost:5678/api/categories";
// Variables pour stocker les données en cache
let projectsCache = null;
let categoriesCache = null;

// Fonction pour récupérer les projets
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
    projectsCache = data;
    return data;
  } catch (error) {
    console.error("Erreur lors du fetch des projets :", error);
    return [];
  }
};

// Fonction pour récupérer les catégories
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
    categoriesCache = data;
    return data;
  } catch (error) {
    console.error("Erreur lors du fetch des catégories :", error);
    return [];
  }
};
