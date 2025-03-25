import { initializeData, projects, categories } from "./app.js";

// Fonction pour afficher les projets dans la galerie
function displayProjects(projects) {
  const galleryContainer = document.querySelector(".gallery");
  galleryContainer.innerHTML = "";
// Ajout des projets dans la galerie
  projects.forEach(function (project) {
    const projectItem = document.createElement("div");
    projectItem.classList.add("project-item");
    projectItem.innerHTML = `
      <img src="${project.imageUrl}" alt="${project.title}" class="project-image">
      <h4>${project.title}</h4>
    `;
    galleryContainer.appendChild(projectItem);
  });
}
// Fonction pour ajouter les catégories dans le filtre
function populateCategoryFilter(categories, projects) {
  const filterContainer = document.querySelector(".filters");
  filterContainer.innerHTML = "";

  const allButton = document.createElement("li");
  allButton.innerHTML = `<button class="filter-btn selected" data-category="0">Tous</button>`;
  filterContainer.appendChild(allButton);
// Ajout des boutons pour chaque catégorie
  categories.forEach(function (category) {
    const categoryButton = document.createElement("li");
    categoryButton.innerHTML = `<button class="filter-btn" data-category="${category.id}">${category.name}</button>`;
    filterContainer.appendChild(categoryButton);
  });
// Filtrer les projets lorsqu'on clique sur un bouton
  filterContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("filter-btn")) {
      const categoryId = event.target.getAttribute("data-category");

      document.querySelectorAll(".filter-btn").forEach(function (button) {
        button.classList.remove("selected");
      });

      event.target.classList.add("selected");

      const filteredProjects =
        categoryId == 0
          ? projects
          : projects.filter(function (project) {
              return project.categoryId == categoryId;
            });

      displayProjects(filteredProjects);
    }
  });
}
// Initialisation de données et affichage des projets
document.addEventListener("DOMContentLoaded", async function () {
  try {
    await initializeData();
    displayProjects(projects);
    populateCategoryFilter(categories, projects);
  } catch (error) {
    console.error("Erreur lors du chargement des données :", error);
  }
});
