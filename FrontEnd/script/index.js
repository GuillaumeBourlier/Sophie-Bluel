document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  console.log("Token:", token); // Ajoutez ce log pour vérifier la présence du token

  const loginLink = document.getElementById("loginLink");
  const logoutLink = document.getElementById("logoutLink");
  const adminBar = document.getElementById("admin-bar");
  const portfolioHeader = document.querySelector(".portfolio-header");
  const filters = document.getElementById("filters");

  if (token) {
    loginLink.style.display = "none";
    logoutLink.style.display = "block";

    // Masquer les filtres
    if (filters) {
      filters.style.display = "none";
    }

    // Créer dynamiquement le bouton "Modifier"
    const editButton = document.createElement("button");
    editButton.classList.add("edit-button");
    editButton.innerHTML = '<i class="fas fa-pen-to-square icon"></i> modifier';

    // Insérer le bouton "Modifier" dans le DOM
    if (portfolioHeader) {
      portfolioHeader.appendChild(editButton);
      editButton.style.display = "flex"; // Afficher le bouton "Modifier"
    }

    if (adminBar) {
      adminBar.style.display = "block";
      adminBar.innerHTML = '<i class="fas fa-pen-to-square"></i> Mode édition';
    }

    // Ajouter l'événement pour ouvrir la modale
    editButton.addEventListener("click", () => {
      import("./modal.js")
        .then((module) => {
          module.openModal();
        })
        .catch((error) => {
          console.error(
            "Erreur lors du chargement du module modal.js :",
            error
          );
        });
    });
  } else {
    loginLink.style.display = "block";
    logoutLink.style.display = "none";

    if (adminBar) {
      adminBar.style.display = "none";
    }
  }

  // Ajouter un événement pour la déconnexion
  logoutLink.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "./pages/login.html";
  });
});
