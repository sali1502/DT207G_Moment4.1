"use strict";

// Skapa ny användare
document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");

    if (registerForm) {
        registerForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            let response = await fetch("http://localhost:3000/api/index", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            let data = await response.json();
            handleResponse(response, data);
        });
    }
});

// Logga in användare
/* document.addEventListener("DOMContentLoaded", () => {
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        await logIn(username, password);

    });

    async function logIn(username, password) {
        try {
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            handleResponse(response, data);

            if (data.token) {
                localStorage.setItem("token", data.token);
                window.location.href = "mypage.html";
            } else {
                console.log("Fel användarnamn eller lösenord");
                handleResponse(response, data);
            }
        } catch (error) {
            console.error("Ett fel uppstod vid inloggning", error);
            handleResponse(null, { error: "Ett fel uppstod vid inloggning" });
        }
    }
}

});

// Funktion för att logga ut
function logOut() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}*/

// Funktion för händelse-meddelanden
function handleResponse(response, data) {
    const messageContainer = document.querySelector(".message-container");
    messageContainer.innerHTML = "";

    if (response && response.ok) {
        messageContainer.innerHTML = `<p class="success">${data.message}</p>`;
    } else {
        messageContainer.innerHTML = `<p class="error">${data.error}</p>`;
    }
}