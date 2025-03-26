const loginUrl = "http://localhost:5678/api/users/login";
// Fonction pour authentifier un utilisateur
export const authenticateUser = async (email, password) => {
  try {
    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      console.error(
        "Authentification échouée :",
        response.status,
        response.statusText
      );
      throw new Error("Authentification échouée");
    }
    // récupération du token
    const data = await response.json();
    localStorage.setItem("token", data.token);
  } catch (error) {
    console.error("Erreur lors de l'authentification :", error);
    throw error;
  }
};
// Fonction pour vérifier si l'utilisateur est authentifié
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};
//  Fonction pour gérer la connexion
export const handleLogin = () => {
  const submitButton = document.getElementById("submit");

  if (submitButton) {
    submitButton.addEventListener("click", async (event) => {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        await authenticateUser(email, password);
        window.location.href = "../index.html";
      } catch (error) {
        const loginErrorElement = document.getElementById("login-error");
        if (loginErrorElement) {
          loginErrorElement.style.display = "block";
          loginErrorElement.textContent =
            "Erreur de connexion, veuillez vérifier vos informations.";
        }
      }
    });
  }
};
// Fonction pour initialiser l'interface utilisateur
export const setupUI = () => {
  const token = isAuthenticated();
  const loginLink = document.getElementById("loginLink");
  const logoutLink = document.getElementById("logoutLink");
  const adminBar = document.getElementById("admin-bar");
  const portfolioHeader = document.querySelector(".portfolio-header");
  const filters = document.getElementById("filters");

  if (token) {
    if (loginLink) loginLink.style.display = "none";
    if (logoutLink) logoutLink.style.display = "block";
    if (filters) filters.style.display = "none";

    const editButton = document.createElement("button");
    editButton.classList.add("edit-button");
    editButton.innerHTML =
      '<img src="./assets/icons/edit.svg" alt="Modifier" class="edit-icon"> modifier';

    if (portfolioHeader) {
      portfolioHeader.appendChild(editButton);
      editButton.style.display = "flex";
      editButton.style.alignItems = "center";
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
    if (adminBar) adminBar.style.display = "none";
  }

  if (logoutLink) {
    logoutLink.addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.href = "./pages/login.html";
    });
  }
};
