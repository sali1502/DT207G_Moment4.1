// Koll om token finns, finns inte token redirect till förstasidan
window.onload = init;
async function init() {
    const token = localStorage.getItem("token");
    if (!token && window.location.pathname.endsWith("mypage.html")) {
        window.location.href = "index.html";
    }
}