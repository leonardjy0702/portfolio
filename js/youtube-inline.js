(function () {
    var hosts = document.querySelectorAll(".yt-inline[data-youtube-id]");

    hosts.forEach(function (host) {
        var button = host.querySelector(".yt-inline__poster");
        if (!button) return;

        button.addEventListener("click", function () {
            if (host.classList.contains("is-playing")) return;

            var id = host.getAttribute("data-youtube-id");
            if (!id) return;

            var iframe = document.createElement("iframe");
            iframe.src =
                "https://www.youtube.com/embed/" +
                encodeURIComponent(id) +
                "?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1";
            iframe.title = "YouTube video player";
            iframe.allow =
                "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
            iframe.allowFullscreen = true;
            iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");

            host.classList.add("is-playing");
            host.appendChild(iframe);
        });
    });
})();
