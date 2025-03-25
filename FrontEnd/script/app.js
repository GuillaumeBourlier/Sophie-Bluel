import { fetchProjects, fetchCategories } from "./api.js";

export let projects = [];
export let categories = [];
let dataInitialized = false;
let dataInitializationPromise = null;

// Fonction pour initialiser les données
export const initializeData = async () => {
  if (!dataInitialized) {
    if (!dataInitializationPromise) {
      dataInitializationPromise = (async () => {
        try {
          [projects, categories] = await Promise.all([
            fetchProjects(),
            fetchCategories(),
          ]);
          dataInitialized = true;
        } catch (error) {
          console.error("Erreur lors de la récupération des données :", error);
        }
      })();
    }
    await dataInitializationPromise;
  }
};

// Fonction pour afficher les projets dans la galerie
export const displayProjects = (projectsToDisplay) => {
  const galleryContainer = document.querySelector(".gallery");
  galleryContainer.innerHTML = "";

  projectsToDisplay.forEach((project) => {
    const projectItem = document.createElement("div");
    projectItem.classList.add("project-item");
    projectItem.innerHTML = `
      <img src="${project.imageUrl}" alt="${project.title}" class="project-image">
      <h4>${project.title}</h4>
    `;
    galleryContainer.appendChild(projectItem);
  });
};

// Fonction pour ajouter les catégories dans le filtre
export const populateCategoryFilter = () => {
  const filterContainer = document.querySelector(".filters");
  filterContainer.innerHTML = ""; // Réinitialise les filtres

  // Ajout du bouton "Tous"
  const allButton = document.createElement("li");
  allButton.innerHTML = `<button class="filter-btn selected" data-category="0">Tous</button>`;
  filterContainer.appendChild(allButton);

  // Ajout des boutons pour chaque catégorie
  categories.forEach((category) => {
    const categoryButton = document.createElement("li");
    categoryButton.innerHTML = `<button class="filter-btn" data-category="${category.id}">${category.name}</button>`;
    filterContainer.appendChild(categoryButton);
  });

  // Gestion des clics sur les boutons de filtre
  filterContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("filter-btn")) {
      const categoryId = event.target.getAttribute("data-category");

      // Réinitialisation des styles des boutons
      document.querySelectorAll(".filter-btn").forEach((button) => {
        button.classList.remove("selected");
      });

      // Ajout de la classe 'selected' au bouton cliqué
      event.target.classList.add("selected");

      // Filtrage des projets en fonction de la catégorie sélectionnée
      const filteredProjects =
        categoryId == 0
          ? projects
          : projects.filter((project) => project.categoryId == categoryId);

      // Affichage des projets filtrés
      displayProjects(filteredProjects);
    }
  });
};

// Initialisation des données et affichage des projets et filtres
document.addEventListener("DOMContentLoaded", async () => {
  await initializeData();
  displayProjects(projects);
  populateCategoryFilter();
});
