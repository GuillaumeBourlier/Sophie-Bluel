//Le chargement du DOM.
//La récupération et l'affichage des catégories et des projets.
//Le filtrage dynamique des projets.
// Affichage et interactions utilisateur (manipulation du DOM, filtrage des projets, gestion des événements)

const apiUrl = "http://localhost:5678/api/works";
const categoryUrl = "http://localhost:5678/api/categories";

/////////////////////////////////////////
// Affiche les projets dans la galerie //
/////////////////////////////////////////
export const displayProjects = (projects) => {
  const galleryContainer = document.querySelector(".gallery");
  galleryContainer.innerHTML = ""; // Réinitialisation de la galerie

  projects.forEach((project) => {
    const projectItem = document.createElement("div");
    projectItem.classList.add("project-item");
    projectItem.innerHTML = `
      <img src="${project.imageUrl}" alt="${project.title}">
      <h4>${project.title}</h4>
    `;
    galleryContainer.appendChild(projectItem);
  });
};

