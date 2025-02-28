// URL de l'API pour récupérer les projets
const apiUrl = "http://localhost:5678/api/works"; // console.log("URL de l'API pour récupérer les projets :", apiUrl);

// URL de l'API pour récupérer les catégories
const categoryUrl = "http://localhost:5678/api/categories"; // console.log("URL de l'API pour récupérer les catégories :", categoryUrl);

// Fonction pour récupérer les données depuis l'API
function fetchData() {
  return Promise.all([
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des projets"); // console.log("Erreur lors de la récupération des projets :", response.status, response.statusText);
        }
        return response.json(); // console.log("Projets récupérés :", response.json());
      }),
    fetch(categoryUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des catégories"); // console.log("Erreur lors de la récupération des catégories :", response.status, response.statusText);
        }
        return response.json(); // console.log("Catégories récupérées :", response.json());
      }),
  ]).catch((error) => {
    console.error("Erreur lors du fetch des données :", error);
    return [[], []]; // Retourne des tableaux vides en cas d'erreur
  });
}

// Fonction pour afficher les projets dans la galerie
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

  console.log("Projets affichés dans la galerie");
}

// Fonction pour ajouter les catégories dans le filtre
function populateCategoryFilter(categories, projects) {
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

  console.log("Filtres de catégories ajoutés");

  // Gérer les clics sur les boutons de filtre
  filterContainer.addEventListener("click", function (event) {
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

  console.log("Gestion des clics sur les filtres de catégories configurée");
}

// Initialisation de la galerie et des filtres une fois le DOM chargé
document.addEventListener("DOMContentLoaded", function () {
  fetchData()
    .then(([projects, categories]) => {
      displayProjects(projects);
      populateCategoryFilter(categories, projects); // Initialise les filtres de catégories
      console.log("Données chargées et affichées");
    })
    .catch((error) => {
      console.error("Erreur lors du chargement des données :", error);
    });
});