// Gestion des catégories (récupération des catégories, affichage des filtres).

const apiUrl = "http://localhost:5678/api/works";
const categoryUrl = "http://localhost:5678/api/categories";

//////////////////////////////////////////////////////
// Fonction pour récupérer les projets depuis l'API //
//////////////////////////////////////////////////////
function fetchProjects() {
  return fetch(apiUrl)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des projets");
      }
      return response.json();
    })
    .catch(function (error) {
      console.error("Erreur lors du fetch des projets :", error);
      return [];
    });
}

/////////////////////////////////////////////////////////
// Fonction pour récupérer les catégories depuis l'API //
/////////////////////////////////////////////////////////
function fetchCategories() {
  return fetch(categoryUrl)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des catégories");
      }
      return response.json();
    })
    .catch(function (error) {
      console.error("Erreur lors du fetch des catégories :", error);
      return []; // Retourner un tableau vide en cas d'erreur
    });
}

////////////////////////////////////////////////////////
// Fonction pour afficher les projets dans la galerie //
////////////////////////////////////////////////////////
function displayProjects(projects) {
  const galleryContainer = document.querySelector(".gallery");
  galleryContainer.innerHTML = ""; // Réinitialisation de la galerie

  projects.forEach(function (project) {
    const projectItem = document.createElement("div");
    projectItem.classList.add("project-item");
    projectItem.innerHTML = `
      <img src="${project.imageUrl}" alt="${project.title}">
      <h4>${project.title}</h4>
    `;
    galleryContainer.appendChild(projectItem);
  });
}

/////////////////////////////////////////////////////////
// Fonction pour ajouter les catégories dans le filtre //
/////////////////////////////////////////////////////////
function populateCategoryFilter(categories) {
  const filterContainer = document.querySelector(".filters");
  filterContainer.innerHTML = ""; // Réinitialisation des filtres

  // Ajouter le bouton "Tous" car absent dans la récup de l'API
  const allButton = document.createElement("li");
  allButton.innerHTML = `<button class="filter-btn" data-category="0">Tous</button>`;
  filterContainer.appendChild(allButton);

  // Ajouter les boutons pour chaque catégorie
  categories.forEach(function (category) {
    const categoryButton = document.createElement("li");
    categoryButton.innerHTML = `<button class="filter-btn" data-category="${category.id}">${category.name}</button>`;
    filterContainer.appendChild(categoryButton);
  });
}

// Fonction pour initialiser les catégories et le filtrage
function initCategories(projects) {
  fetchCategories()
    .then((categories) => {
      populateCategoryFilter(categories);

      // Gérer les clics sur les boutons de filtre
      document.addEventListener("click", function (event) {
        if (event.target.classList.contains("filter-btn")) {
          const categoryId = event.target.getAttribute("data-category");

          // Enlever la classe 'selected' de tous les boutons de filtre
          document.querySelectorAll(".filter-btn").forEach(function (button) {
            button.classList.remove("selected");
          });

          // Ajouter la classe 'selected' au bouton cliqué
          event.target.classList.add("selected");

          // Filtrer les projets en fonction de la catégorie sélectionnée
          const filteredProjects =
            categoryId == 0
              ? projects // Si catégorie "Tous", afficher tous les projets
              : projects.filter(function (project) {
                  return project.categoryId == categoryId;
                });

          displayProjects(filteredProjects); // Afficher les projets filtrés
        }
      });
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des catégories :", error);
    });
}

// Initialisation de la galerie et des filtres une fois le DOM chargé
document.addEventListener("DOMContentLoaded", function () {
  fetchProjects()
    .then(function (projects) {
      displayProjects(projects);
      initCategories(projects); // Initialise les filtres de catégories
    })
    .catch((error) => {
      console.error("Erreur lors du chargement des projets :", error);
    });
});
