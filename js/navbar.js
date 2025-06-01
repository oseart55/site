document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("nav-select");
    const currentPath = window.location.pathname;
    console.log(currentPath)
    for (let option of select.options) {
        if (option.value === currentPath) {
            option.selected = true;
            break;
        }
    }
});