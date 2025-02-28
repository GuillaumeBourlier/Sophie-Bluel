import { fetchProjects, fetchCategories } from "./api.js";

// Sélection du bouton "Modifier"
const editButton = document.querySelector(".edit-button");

// Fonction pour fermer toutes les modales
const closeModal = () => {
  const existingModalOverlay = document.getElementById("modal-overlay");
  if (existingModalOverlay) {
    existingModalOverlay.remove();
  }
};

// Fonction pour générer la modale de galerie photo
export const openModal = () => {
  closeModal(); // Fermer toute modale existante

  const modalHtml = `
    <div class="modal-overlay" id="modal-overlay">
      <div class="modal" id="modal">
        <span class="modal-close" id="modal-close">&times;</span>
        <div class="modal-content">
          <h3 class="modal-title">Galerie photo</h3>
          <div id="project-list" class="gallery"></div>
          <hr class="modal-separator">
          <button class="add-photo-button" id="add-photo-button">Ajouter une photo</button>
        </div>
      </div>
    </div>`;

  // Insertion de la modale dans le body
  document.body.insertAdjacentHTML("beforeend", modalHtml);

  // Sélection des éléments dans la modale
  const modalOverlay = document.getElementById("modal-overlay");
  const modalClose = document.getElementById("modal-close");
  const addPhotoButton = document.getElementById("add-photo-button");
  const projectList = document.getElementById("project-list");

  // Fermeture de la modale en cliquant sur la croix
  modalClose.addEventListener("click", closeModal);

  // Fermeture de la modale en cliquant à l'extérieur
  window.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
      closeModal();
    }
  });

  // Récupérer et afficher les projets dans la galerie
  fetchProjects().then((projects) => {
    projects.forEach((project) => {
      const projectItem = document.createElement("div");
      projectItem.classList.add("project-item");

      const projectImageContainer = document.createElement("div");
      projectImageContainer.classList.add("project-image-container");

      const projectImage = document.createElement("img");
      projectImage.src = project.imageUrl;
      projectImage.alt = project.title;

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete-project-button");
      deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
      deleteButton.addEventListener("click", () =>
        deleteProject(project.id, projectItem)
      );

      projectImageContainer.appendChild(projectImage);
      projectImageContainer.appendChild(deleteButton);
      projectItem.appendChild(projectImageContainer);
      projectList.appendChild(projectItem);
    });
  });

  // Ouvrir la modale d'ajout de photo
  addPhotoButton.addEventListener("click", openAddPhotoModal);
};

// Fonction pour générer la modale d'ajout de photo
export const openAddPhotoModal = () => {
  closeModal(); // Fermer toute modale existante

  const modalHtml = `
    <div class="modal-overlay" id="modal-overlay">
      <div class="modal" id="modal">
        <span class="modal-back" id="modal-back">&larr;</span>
        <span class="modal-close" id="modal-close">&times;</span>
        <div class="modal-content">
          <h3 class="modal-title">Ajout de photo</h3>
          <div class="photo-upload-container">
            <div class="photo-upload-box">
              <i class="fas fa-image"></i>
              <button class="upload-button">
                <input type="file" id="file-upload" class="file-upload-input" />
                <p>+ Ajouter photo</p>
              </button>
              <p>jpg, png : 4mo max.</p>
            </div>
          </div>
          <form action="#" method="post">
            <label for="title">Titre</label>
            <input type="text" name="title" id="title" class="modal-input">
            <label for="category">Catégorie</label>
            <select name="category" id="category" class="modal-select"></select>
            <hr class="modal-separator">
            <button type="submit" class="submit-button">Valider</button>
          </form>
        </div>
      </div>
    </div>`;

  // Insertion de la modale dans le body
  document.body.insertAdjacentHTML("beforeend", modalHtml);

  // Sélection des éléments dans la modale
  const modalOverlay = document.getElementById("modal-overlay");
  const modalClose = document.getElementById("modal-close");
  const modalBack = document.getElementById("modal-back");
  const categorySelect = document.getElementById("category");

  // Fermeture de la modale en cliquant sur la croix
  modalClose.addEventListener("click", closeModal);

  // Retour à la galerie photo en cliquant sur la flèche
  modalBack.addEventListener("click", () => {
    closeModal();
    openModal();
  });

  // Fermeture de la modale en cliquant à l'extérieur
  window.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
      closeModal();
    }
  });

  // Récupérer et afficher les catégories dans le menu déroulant
  fetchCategories().then((categories) => {
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.name;
      categorySelect.appendChild(option);
    });
  });

  // Gestion de la soumission du formulaire
  const form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.reset();
  });
};

// Fonction pour supprimer un projet
const deleteProject = async (projectId, projectItem) => {
  try {
    const response = await fetch(
      `http://localhost:5678/api/works/${projectId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression du projet");
    }

    // Supprimer l'élément du DOM après confirmation de la suppression
    projectItem.remove();
  } catch (error) {
    console.error("Erreur lors de la suppression du projet :", error);
  }
};

// Ouvrir la modale au clic sur le bouton "Modifier"
if (editButton) {
  editButton.addEventListener("click", openModal);
}
