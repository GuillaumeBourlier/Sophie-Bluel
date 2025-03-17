import {
  projects as initialProjects,
  categories,
  initializeData,
} from "./app.js";

let projects = [...initialProjects];

// Sélection du bouton "Modifier"
const editButton = document.querySelector(".edit-button");

// Fonction pour fermer toutes les modales
const closeModal = () => {
  const existingModalOverlay = document.getElementById("modal-overlay");
  if (existingModalOverlay) {
    existingModalOverlay.remove();
  }
};

// Fonction pour réinitialiser le formulaire
const resetForm = () => {
  const fileInput = document.getElementById("file-upload");
  const uploadedImage = document.getElementById("uploaded-image");
  const uploadTextElements = document.querySelectorAll(
    ".photo-upload-box i, .photo-upload-box p"
  );
  const submitButton = document.getElementById("submit-button");

  document.getElementById("add-photo-form").reset();
  fileInput.value = "";
  uploadedImage.style.display = "none";
  uploadTextElements.forEach((element) => (element.style.display = "block"));
  submitButton.classList.remove("active");
  submitButton.setAttribute("disabled", "true");
};

// Fonction pour générer la modale de galerie photo
export const openModal = async () => {
  closeModal();

  if (!projects.length || !categories.length) {
    await initializeData();
  }

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

  // Afficher les projets dans la galerie
  projects.forEach((project) => {
    const projectItem = document.createElement("div");
    projectItem.classList.add("project-item");

    const projectImageContainer = document.createElement("div");
    projectImageContainer.classList.add("project-image-container");

    const projectImage = document.createElement("img");
    projectImage.src = project.imageUrl;
    projectImage.alt = project.title;
    projectImage.classList.add("modal-project-image");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-project-button");
    deleteButton.innerHTML =
      '<img class="bin" id="bin" src="./assets/icons/bin.svg"/>';
    deleteButton.addEventListener("click", async () => {
      await deleteProject(project.id, projectItem);
    });

    projectImageContainer.appendChild(projectImage);
    projectImageContainer.appendChild(deleteButton);
    projectItem.appendChild(projectImageContainer);
    projectList.appendChild(projectItem);
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
        <img class="modal-back" id="modal-back" src="./assets/icons/arrow-left.svg"/>
        <span class="modal-close" id="modal-close">&times;</span>
        <div class="modal-content">
          <h3 class="modal-title">Ajout de photo</h3>
          <div class="photo-upload-container">
            <div class="photo-upload-box">
              <img src="./assets/icons/img.png" alt="image upload icon" />
              <button class="upload-button">
                <input type="file" id="file-upload" class="file-upload-input" />
                <p>+ Ajouter photo</p>
              </button>
              <p>jpg, png : 4mo max</p>
              <img id="uploaded-image" style="display:none;" />
              <span id="file-error" style="display:none; color:red;">Veuillez renseigner ce champ.</span>
            </div>
          </div>
          <form id="add-photo-form" action="#" method="post">
            <label for="title">Titre</label>
            <input type="text" name="title" id="title" class="modal-input" required>
            <label for="category">Catégorie</label>
            <select name="category" id="category" class="modal-select" required>
              <option value="" disabled selected></option> <!-- Option vide par défaut -->
            </select>
            <span id="category-error" style="display:none; color:red;">Veuillez renseigner ce champ.</span>
            <hr class="modal-separator2">
            <button type="submit" id="submit-button" class="submit-button">Valider</button> <!-- Bouton Valider -->
            <span id="form-error" style="display:none; color:red;">Veuillez remplir tous les champs.</span>
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
  const formError = document.getElementById("form-error");
  const fileError = document.getElementById("file-error");
  const categoryError = document.getElementById("category-error");
  const fileInput = document.getElementById("file-upload");
  const uploadedImage = document.getElementById("uploaded-image");
  const uploadTextElements = document.querySelectorAll(
    ".photo-upload-box i, .photo-upload-box p"
  );
  const submitButton = document.getElementById("submit-button");

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

  // Afficher les catégories dans le menu déroulant
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    categorySelect.appendChild(option);
  });

  // Activer le bouton de soumission lorsque tous les champs sont remplis
  const checkFormValidity = () => {
    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;
    const file = fileInput.files[0];

    if (title && category && file) {
      submitButton.classList.add("active");
      submitButton.removeAttribute("disabled");
    } else {
      submitButton.classList.remove("active");
      submitButton.setAttribute("disabled", "true");
    }
  };

  document.getElementById("title").addEventListener("input", checkFormValidity);
  document
    .getElementById("category")
    .addEventListener("change", checkFormValidity);
  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        uploadedImage.src = e.target.result;
        uploadedImage.style.display = "block";
        uploadTextElements.forEach(
          (element) => (element.style.display = "none")
        ); // Masquer le texte en dessous
        fileError.style.display = "none"; // Masquer le message d'erreur du fichier
      };
      reader.readAsDataURL(file);
    }
    checkFormValidity();
  });

  // Gestion de la soumission du formulaire
  const form = document.getElementById("add-photo-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;
    const file = fileInput.files[0];

    let hasError = false;

    if (!file) {
      fileError.style.display = "block";
      hasError = true;
    } else {
      fileError.style.display = "none";
    }

    if (!category) {
      categoryError.style.display = "block";
      hasError = true;
    } else {
      categoryError.style.display = "none";
    }

    if (hasError) {
      formError.style.display = "block";
      return;
    }

    formError.style.display = "none";

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du projet");
      }

      const newProject = await response.json();

      // Ajouter le nouveau projet à la liste des projets
      projects.push(newProject);

      // Mettre à jour le cache localStorage
      localStorage.setItem("projectsCache", JSON.stringify(projects));

      // Ajouter le nouveau projet à la galerie principale
      const galleryContainer = document.querySelector(".gallery");
      const projectItem = document.createElement("div");
      projectItem.classList.add("project-item");
      projectItem.innerHTML = `
        <img src="${newProject.imageUrl}" alt="${newProject.title}" class="project-image">
        <h4>${newProject.title}</h4>
      `;
      galleryContainer.appendChild(projectItem);

      // Ajouter le nouveau projet à la galerie de la modale
      const projectList = document.getElementById("project-list");
      if (projectList) {
        const modalProjectItem = document.createElement("div");
        modalProjectItem.classList.add("project-item");

        const projectImageContainer = document.createElement("div");
        projectImageContainer.classList.add("project-image-container");

        const projectImage = document.createElement("img");
        projectImage.src = newProject.imageUrl;
        projectImage.alt = newProject.title;
        projectImage.classList.add("modal-project-image");

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-project-button");
        deleteButton.innerHTML =
          '<img class="bin" id="bin" src="./assets/icons/bin.svg"/>';
        deleteButton.addEventListener("click", async () => {
          await deleteProject(newProject.id, modalProjectItem);
        });

        projectImageContainer.appendChild(projectImage);
        projectImageContainer.appendChild(deleteButton);
        modalProjectItem.appendChild(projectImageContainer);
        projectList.appendChild(modalProjectItem);
      }

      // Fermer la modale après l'ajout
      closeModal();
    } catch (error) {
      console.error("Erreur lors de l'ajout du projet :", error);
    }
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

    // Supprimer l'élément correspondant de la page principale
    const mainGallery = document.querySelector(".gallery");
    const mainProjectItem = mainGallery.querySelector(
      `img[src="${projectItem.querySelector("img").src}"]`
    ).parentElement;
    mainProjectItem.remove();

    // Mettre à jour les données des projets
    projects = projects.filter((project) => project.id !== projectId);

    // Mettre à jour le cache localStorage
    localStorage.setItem("projectsCache", JSON.stringify(projects));
  } catch (error) {
    console.error("Erreur lors de la suppression du projet :", error);
  }
};

// Ouvrir la modale au clic sur le bouton "Modifier"
if (editButton) {
  editButton.addEventListener("click", openModal);
}
