(function () {
    var root = document.documentElement;
    var button = document.getElementById("theme-toggle");

    function currentTheme() {
        return root.getAttribute("data-theme") === "light" ? "light" : "dark";
    }

    function applyTheme(theme) {
        var next = theme === "light" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        try {
            localStorage.setItem("theme", next);
        } catch (error) {
            /* ignore quota / private-mode errors */
        }

        if (!button) return;
        var dark = next === "dark";
        button.setAttribute("aria-pressed", dark ? "true" : "false");
        button.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
        button.setAttribute("title", dark ? "Light mode" : "Dark mode");
    }

    applyTheme(currentTheme());

    if (button) {
        button.addEventListener("click", function () {
            applyTheme(currentTheme() === "dark" ? "light" : "dark");
        });
    }
})();
