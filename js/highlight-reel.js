(function () {
    var video = document.getElementById("reel-video");
    var player = document.getElementById("reel-player");
    var playBtn = document.getElementById("reel-play");
    var backBtn = document.getElementById("reel-back");
    var fwdBtn = document.getElementById("reel-fwd");
    var muteBtn = document.getElementById("reel-mute");
    var fullBtn = document.getElementById("reel-full");
    var seek = document.getElementById("reel-seek");
    var timeLabel = document.getElementById("reel-time");
    var seeking = false;

    if (!video) return;

    function formatTime(seconds) {
        if (!isFinite(seconds) || seconds < 0) return "0:00";
        var total = Math.floor(seconds);
        var m = Math.floor(total / 60);
        var s = String(total % 60).padStart(2, "0");
        return m + ":" + s;
    }

    function updateTime() {
        var duration = video.duration || 0;
        if (!seeking) {
            seek.max = duration;
            seek.value = video.currentTime || 0;
        }
        timeLabel.textContent = formatTime(video.currentTime) + " / " + formatTime(duration);
    }

    function skip(delta) {
        if (!isFinite(video.duration)) return;
        video.currentTime = Math.min(Math.max(0, video.currentTime + delta), video.duration);
        updateTime();
    }

    function togglePlay() {
        if (video.paused) video.play();
        else video.pause();
    }

    function syncPlayButton() {
        playBtn.textContent = video.paused ? "Play" : "Pause";
        playBtn.title = video.paused ? "Play (K)" : "Pause (K)";
    }

    function syncMuteButton() {
        muteBtn.textContent = video.muted || video.volume === 0 ? "Unmute" : "Mute";
    }

    playBtn.addEventListener("click", togglePlay);
    backBtn.addEventListener("click", function () { skip(-10); });
    fwdBtn.addEventListener("click", function () { skip(10); });
    muteBtn.addEventListener("click", function () {
        video.muted = !video.muted;
        syncMuteButton();
    });
    fullBtn.addEventListener("click", function () {
        if (!document.fullscreenElement) {
            (player.requestFullscreen || player.webkitRequestFullscreen).call(player);
        } else {
            (document.exitFullscreen || document.webkitExitFullscreen).call(document);
        }
    });

    seek.addEventListener("input", function () {
        seeking = true;
        video.currentTime = Number(seek.value);
        updateTime();
    });
    seek.addEventListener("change", function () {
        seeking = false;
        video.currentTime = Number(seek.value);
    });

    video.addEventListener("play", syncPlayButton);
    video.addEventListener("pause", syncPlayButton);
    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateTime);
    video.addEventListener("volumechange", syncMuteButton);
    video.addEventListener("click", togglePlay);

    document.addEventListener("keydown", function (event) {
        if (event.target && /input|textarea|select/i.test(event.target.tagName)) return;

        if (event.key === " " || event.key === "k" || event.key === "K") {
            event.preventDefault();
            togglePlay();
        } else if (event.key === "j" || event.key === "J" || event.key === "ArrowLeft") {
            event.preventDefault();
            skip(-10);
        } else if (event.key === "l" || event.key === "L" || event.key === "ArrowRight") {
            event.preventDefault();
            skip(10);
        } else if (event.key === "m" || event.key === "M") {
            video.muted = !video.muted;
        } else if (event.key === "f" || event.key === "F") {
            fullBtn.click();
        }
    });

    syncPlayButton();
    syncMuteButton();
    updateTime();
})();
