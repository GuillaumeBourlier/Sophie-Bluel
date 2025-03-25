import {
  projects as initialProjects,
  categories,
  initializeData,
} from "./app.js";

let projects = [...initialProjects];

const editButton = document.querySelector(".edit-button");

const closeModal = () => {
  const existingModalOverlay = document.getElementById("modal-overlay");
  if (existingModalOverlay) {
    existingModalOverlay.remove();
  }
};
// Fonction pour réinitialiser le formulaire d'ajout de photo
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
// Fonction pour ouvrir la modale de galerie photo
export const openModal = async () => {
  closeModal();

  if (!projects.length || !categories.length) {
    await initializeData();
  }
 // Contenu HTML de la modale
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

  document.body.insertAdjacentHTML("beforeend", modalHtml);

  const modalOverlay = document.getElementById("modal-overlay");
  const modalClose = document.getElementById("modal-close");
  const addPhotoButton = document.getElementById("add-photo-button");
  const projectList = document.getElementById("project-list");

  modalClose.addEventListener("click", closeModal);

  window.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
      closeModal();
    }
  });
  // Affiche les projets dans la galerie
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

  addPhotoButton.addEventListener("click", openAddPhotoModal);
};

export const openAddPhotoModal = () => {
  closeModal();
  // Contenu HTML de la modale d'ajout de photo
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

  document.body.insertAdjacentHTML("beforeend", modalHtml);

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

  modalClose.addEventListener("click", closeModal);

  modalBack.addEventListener("click", () => {
    closeModal();
    openModal();
  });

  window.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
      closeModal();
    }
  });
  // Affiche les catégories dans le menu déroulant
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    categorySelect.appendChild(option);
  });
// Verification de la validité du formulaire
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
        );
        fileError.style.display = "none";
      };
      reader.readAsDataURL(file);
    }
    checkFormValidity();
  });
// Envoi du formulaire
  const form = document.getElementById("add-photo-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
// Récupération des données du formulaire
    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;
    const file = fileInput.files[0];

    let hasError = false;
// Vérification des champs
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
// Envoi des données
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("image", file);
// Requête POST
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
// Ajout du projet dans la galerie
      const newProject = await response.json();

      projects.push(newProject);

      localStorage.setItem("projectsCache", JSON.stringify(projects));

      const galleryContainer = document.querySelector(".gallery");
      const projectItem = document.createElement("div");
      projectItem.classList.add("project-item");
      projectItem.innerHTML = `
        <img src="${newProject.imageUrl}" alt="${newProject.title}" class="project-image">
        <h4>${newProject.title}</h4>
      `;
      galleryContainer.appendChild(projectItem);

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

    projectItem.remove();

    const mainGallery = document.querySelector(".gallery");
    const mainProjectItem = mainGallery.querySelector(
      `img[src="${projectItem.querySelector("img").src}"]`
    ).parentElement;
    mainProjectItem.remove();

    projects = projects.filter((project) => project.id !== projectId);

    localStorage.setItem("projectsCache", JSON.stringify(projects));
  } catch (error) {
    console.error("Erreur lors de la suppression du projet :", error);
  }
};

if (editButton) {
  editButton.addEventListener("click", openModal);
}
