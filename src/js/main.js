document.addEventListener("DOMContentLoaded", () => {
    // Registrering av användare
    const registerForm = document.getElementById("registerForm");

    if (registerForm) {
        registerForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            if (!username || !password) {
                displayMessage("Alla fält behöver fyllas i", "error");
                return;
            }

            try {
                const response = await fetch("http://localhost:3001/api/index", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ username, password })
                });

                const data = await response.json();

                if (response.ok) {
                    handleResponse(response, data);
                    window.location.href = "login.html";
                } else {
                    handleResponse(response, data);
                }
            } catch (error) {
                console.error("Ett fel uppstod vid registrering", error);
                displayMessage("Ett fel uppstod vid registrering", "error");
            }
        });
    }

    // Logga in användare
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            if (!username || !password) {
                displayMessage("Alla fält behöver fyllas i", "error");
                return;
            }

            await logIn(username, password);
        });

        async function logIn(username, password) {
            try {
                const response = await fetch("http://localhost:3001/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ username, password })
                });

                const data = await response.json();

                console.log("Login response:", response);
                console.log("Login data:", data);

                if (response.ok && data.token) {
                    localStorage.setItem("token", data.token);
                    window.location.href = "mypage.html";
                } else {
                    handleResponse(response, data);
                }
            } catch (error) {
                console.error("Ett fel uppstod vid inloggning", error);
                displayMessage("Ett fel uppstod vid inloggning", "error");
            }
        }
    }

    // Skyddad sida och logga ut
    const token = localStorage.getItem("token");

    if (token && window.location.pathname.endsWith("mypage.html")) {
        verifyToken(token);
    } else if (!token && window.location.pathname.endsWith("mypage.html")) {
        window.location.href = "index.html";
    }

    async function verifyToken(token) {
        try {
            const response = await fetch("http://localhost:3001/api/mypage", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                localStorage.removeItem("token");
                window.location.href = "index.html";
            } else {
                const data = await response.json();
                console.log("Protected data:", data);
            }
        } catch (error) {
            console.error("Ett fel uppstod vid hämtning av skyddad data", error);
            localStorage.removeItem("token");
            window.location.href = "index.html";
        }

        document.getElementById("logoutBtn").addEventListener("click", () => {
            logOut();
        });
    }

    function logOut() {
        localStorage.removeItem("token");
        window.location.href = "index.html";
    }

    // Funktion för att visa felmeddelanden
    function displayMessage(message, type) {
        const messageContainer = document.querySelector(".message-container");
        messageContainer.innerHTML = `<p class="${type}">${message}</p>`;
    }

    // Funktion för att hantera respons
    function handleResponse(response, data) {
        const messageContainer = document.querySelector(".message-container");
        messageContainer.innerHTML = "";

        if (response && response.ok) {
            messageContainer.innerHTML = `<p class="success">${data.message}</p>`;
        } else {
            const errorMessage = data.error || "Ett fel uppstod";
            messageContainer.innerHTML = `<p class="error">${errorMessage}</p>`;
        }
    }
});

