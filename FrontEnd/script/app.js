// URL de l'API pour récupérer les projets
const apiUrl = "http://localhost:5678/api/works";

// URL de l'API pour récupérer les catégories
const categoryUrl = "http://localhost:5678/api/categories";

// Fonction pour afficher les projets dans la galerie
export const displayProjects = (projects) => {
  // Sélectionne le conteneur de la galerie
  const galleryContainer = document.querySelector(".gallery");
  
  // Réinitialise le contenu de la galerie
  galleryContainer.innerHTML = "";

  // Affiche les projets dans la console
  console.log("Projets récupérés :", projects);

  // Parcourt chaque projet et crée un élément pour l'ajouter à la galerie
  projects.forEach((project) => {
    // Crée un élément div pour le projet
    const projectItem = document.createElement("div");
    projectItem.classList.add("project-item");

    // Définit le contenu HTML de l'élément projet
    projectItem.innerHTML = `
      <img src="${project.imageUrl}" alt="${project.title}">
      <h4>${project.title}</h4>
    `;

    // Ajoute l'élément projet au conteneur de la galerie
    galleryContainer.appendChild(projectItem);
  });

  // Affiche un message indiquant que les projets ont été ajoutés à la galerie
  console.log("Projets affichés dans la galerie");
};