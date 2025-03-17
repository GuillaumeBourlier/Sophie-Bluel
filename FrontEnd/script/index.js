import { isAuthenticated } from "./authservice.js";

document.addEventListener("DOMContentLoaded", function () {
  const token = isAuthenticated();
  const loginLink = document.getElementById("loginLink");
  const logoutLink = document.getElementById("logoutLink");
  const adminBar = document.getElementById("admin-bar");
  const portfolioHeader = document.querySelector(".portfolio-header");
  const filters = document.getElementById("filters");

  if (token) {
    if (loginLink) loginLink.style.display = "none";
    if (logoutLink) logoutLink.style.display = "block";

    if (filters) {
      filters.style.display = "none";
    }

    const editButton = document.createElement("button");
    editButton.classList.add("edit-button");
    editButton.innerHTML =
      '<img src="./assets/icons/edit.svg" alt="Modifier" class="edit-icon"> modifier';

    if (portfolioHeader) {
      portfolioHeader.appendChild(editButton);
      editButton.style.display = "flex";
      editButton.style.alignItems = "center"; // Assurez-vous que l'icône et le texte sont alignés
    }

    if (adminBar) {
      adminBar.style.display = "block";
      adminBar.innerHTML =
        '<img src="./assets/icons/edit-white.svg" alt="Mode édition" class="edit-icon"> Mode édition';
      adminBar.addEventListener("click", async () => {
        try {
          const module = await import("./modal.js");
          module.openModal();
        } catch (error) {
          console.error(
            "Erreur lors du chargement du module modal.js :",
            error
          );
        }
      });
    }

    editButton.addEventListener("click", async () => {
      try {
        const module = await import("./modal.js");
        module.openModal();
      } catch (error) {
        console.error("Erreur lors du chargement du module modal.js :", error);
      }
    });
    
  } else {
    if (loginLink) loginLink.style.display = "block";
    if (logoutLink) logoutLink.style.display = "none";

    if (adminBar) {
      adminBar.style.display = "none";
    }
  }

  if (logoutLink) {
    logoutLink.addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.href = "./pages/login.html";
    });
  }
});
