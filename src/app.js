/* Kun det JavaScript sitet faktisk har brug for:
   menu, videokilder, videokontroller, koncertvælger og Spotify-afspilleren.
   Alt indhold og al navigation virker uden denne fil. */

(function () {
  "use strict";

  var LANG = document.documentElement.lang === "en" ? "en" : "da";
  var T = {
    da: { play: "Afspil", pause: "Pause", soundOn: "Lyd til", soundOff: "Lyd fra" },
    en: { play: "Play", pause: "Pause", soundOn: "Sound on", soundOff: "Sound off" },
  }[LANG];

  var MOBILE = window.matchMedia("(max-width: 760px)");

  var ICON = {
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4l13 8-13 8V4z"/></svg>',
    pause:
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>',
    speaker: function (muted) {
      return (
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<path d="M11 5 6.5 9H3v6h3.5L11 19V5z"/>' +
        '<path d="M16 9a4 4 0 0 1 0 6"' + (muted ? ' opacity=".35"' : "") + "/>" +
        '<path d="M18.8 6.5a7.5 7.5 0 0 1 0 11"' + (muted ? ' opacity=".35"' : "") + "/>" +
        (muted ? '<path d="M3.5 20.5 21 3.5"/>' : "") +
        "</svg>"
      );
    },
  };

  /* ---------- menu ---------- */

  var menu = document.getElementById("menu");
  if (menu) {
    var close = function () {
      menu.style.display = "none";
      if (location.hash === "#menu") history.replaceState(null, "", location.pathname + location.search);
    };
    var closeBtn = menu.querySelector(".menu__close");
    if (closeBtn) closeBtn.addEventListener("click", function (e) { e.preventDefault(); close(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && location.hash === "#menu") close();
    });
    window.addEventListener("hashchange", function () {
      if (location.hash === "#menu") menu.style.display = "";
    });
  }

  /* ---------- videofelter ---------- */

  function source(v) {
    var portrait = v.getAttribute("data-src-portrait");
    if (portrait && MOBILE.matches) return portrait;
    return v.getAttribute("data-src");
  }

  function applyPoster(v) {
    var p = v.getAttribute("data-poster-portrait");
    if (p && MOBILE.matches) v.poster = p;
  }

  function setup(fig) {
    var v = fig.querySelector("video");
    if (!v) return;

    var big = fig.querySelector("[data-play]");
    var ctrls = fig.querySelector(".well__ctrls");
    var toggle = fig.querySelector("[data-toggle]");
    var restart = fig.querySelector("[data-restart]");
    var sound = fig.querySelector("[data-sound]");
    var bar = fig.querySelector(".well__prog i");
    var loaded = false;

    applyPoster(v);

    function load() {
      if (loaded) return;
      v.src = source(v);
      loaded = true;
    }

    function reveal() {
      if (big) big.hidden = true;
      if (ctrls) ctrls.hidden = false;
    }

    function setToggle() {
      if (!toggle) return;
      var paused = v.paused;
      toggle.innerHTML = paused ? ICON.play : ICON.pause;
      var label = paused ? T.play : T.pause;
      toggle.setAttribute("aria-label", label);
      toggle.title = label;
    }

    function setSound() {
      if (!sound) return;
      var label = v.muted ? T.soundOn : T.soundOff;
      sound.innerHTML = ICON.speaker(v.muted) + "<span>" + label + "</span>";
      sound.setAttribute("aria-label", label);
      sound.title = label;
    }

    v.addEventListener("timeupdate", function () {
      if (bar && v.duration) bar.style.width = (v.currentTime / v.duration) * 100 + "%";
    });
    v.addEventListener("play", setToggle);
    v.addEventListener("pause", setToggle);

    if (toggle)
      toggle.addEventListener("click", function () {
        if (v.paused) v.play(); else v.pause();
      });
    if (restart)
      restart.addEventListener("click", function () {
        v.currentTime = 0;
        if (bar) bar.style.width = "0";
        v.play();
      });
    if (sound)
      sound.addEventListener("click", function () {
        v.muted = !v.muted;
        setSound();
        if (!v.muted) v.play();
      });

    if (big)
      big.addEventListener("click", function () {
        load();
        reveal();
        v.muted = false;
        setSound();
        var p = v.play();
        if (p && p.catch)
          p.catch(function () {
            v.muted = true;
            setSound();
            v.play();
          });
      });

    // Hero'en starter selv, dæmpet, og pauser når den ruller ud af billedet.
    if (v.hasAttribute("data-autoplay")) {
      load();
      reveal();
      v.play();
    }

    // Alle videoer stopper og dæmpes når de ruller ud af billedet.
    // Kun hero'en starter igen af sig selv.
    if ("IntersectionObserver" in window) {
      var auto = v.hasAttribute("data-autoplay");
      new IntersectionObserver(
        function (entries) {
          var e = entries[0];
          if (e.isIntersecting) {
            if (auto) v.play();
          } else {
            if (!v.muted) { v.muted = true; setSound(); }
            v.pause();
            if (auto) {
              v.currentTime = 0;
              if (bar) bar.style.width = "0";
            }
          }
        },
        { threshold: 0.25 }
      ).observe(v);
    }

    setToggle();
    setSound();

    // Bruges af koncertvælgeren.
    fig.__swap = function (src, poster, reset) {
      v.pause();
      v.removeAttribute("src");
      v.setAttribute("data-src", src);
      v.poster = poster;
      v.load();
      loaded = false;
      if (bar) bar.style.width = "0";
      if (reset && big) big.hidden = false;
      if (reset && ctrls) ctrls.hidden = true;
    };
    fig.__start = function () {
      load();
      reveal();
      v.muted = false;
      setSound();
      var p = v.play();
      if (p && p.catch)
        p.catch(function () {
          v.muted = true;
          setSound();
          v.play();
        });
    };
  }

  var wells = document.querySelectorAll("[data-well]");
  for (var i = 0; i < wells.length; i++) setup(wells[i]);

  /* ---------- koncertvælger ---------- */

  var picker = document.querySelector("[data-picker]");
  var picked = document.querySelector(".well--picked");
  if (picker && picked) {
    var tabs = picker.querySelectorAll("[data-show]");
    var nameEl = picked.querySelector("[data-name]");
    var metaEl = picked.querySelector("[data-meta]");
    for (var j = 0; j < tabs.length; j++) {
      tabs[j].addEventListener("click", function (e) {
        e.preventDefault();
        for (var k = 0; k < tabs.length; k++) tabs[k].classList.remove("card--on");
        this.classList.add("card--on");
        if (nameEl) nameEl.textContent = this.getAttribute("data-name");
        if (metaEl) metaEl.textContent = this.getAttribute("data-meta");
        picked.__swap(this.getAttribute("data-video"), this.getAttribute("data-poster"), false);
        picked.__start();
      });
    }
  }

/* ---------- booking-modal ---------- */

  var modal = document.getElementById("book");
  if (modal) {
    var lastFocus = null;
    var openModal = function () {
      lastFocus = document.activeElement;
      modal.hidden = false;
      document.body.style.overflow = "hidden";
      var first = modal.querySelector("input:not([type=hidden]):not(.hp)");
      if (first) first.focus();
    };
    var closeModal = function () {
      modal.hidden = true;
      document.body.style.overflow = "";
      if (location.hash === "#book") history.replaceState(null, "", location.pathname + location.search);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    };
    var openers = document.querySelectorAll("[data-book-open]");
    for (var m = 0; m < openers.length; m++)
      openers[m].addEventListener("click", function (e) { e.preventDefault(); openModal(); });
    var closers = modal.querySelectorAll("[data-book-close]");
    for (var n = 0; n < closers.length; n++)
      closers[n].addEventListener("click", closeModal);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modal.hidden) closeModal();
    });
    // Direkte link til #book åbner modalen.
    if (location.hash === "#book") openModal();
    window.addEventListener("hashchange", function () {
      if (location.hash === "#book") openModal();
    });
  }

  /* ---------- formularer ---------- */

  // Sender uden at forlade siden. Uden JavaScript sender formularen som
  // almindelig POST og Web3Forms viser sin egen kvitteringsside.
  var forms = document.querySelectorAll("form[data-w3]");
  for (var q = 0; q < forms.length; q++) {
    forms[q].addEventListener("submit", function (e) {
      var form = this;
      var msg = form.querySelector("[data-msg]");
      var btn = form.querySelector("[type=submit]");
      if (!window.fetch || !msg) return;
      e.preventDefault();
      var show = function (text, state) {
        msg.textContent = text;
        msg.hidden = false;
        msg.setAttribute("data-state", state);
      };
      show(msg.getAttribute("data-sending"), "sending");
      if (btn) btn.disabled = true;
      fetch(form.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data && data.success) {
            show(msg.getAttribute("data-ok"), "ok");
            form.reset();
          } else {
            show(msg.getAttribute("data-err"), "err");
          }
        })
        .catch(function () { show(msg.getAttribute("data-err"), "err"); })
        .then(function () { if (btn) btn.disabled = false; });
    });
  }

  /* ---------- Spotify ---------- */

  // Afspilleren er indlejret direkte med loading="lazy"; ingen facade at hydrere.
})();
