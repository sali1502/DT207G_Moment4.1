window.onload = init;
async function init() {
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
        window.location.href = "index.html"
    }
};