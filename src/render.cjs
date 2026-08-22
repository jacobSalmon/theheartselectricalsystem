// Rene render-funktioner: data ind, HTML-streng ud. Ingen filsystem, ingen DOM.
// Bruges af build.js. Skift indhold i content.cjs, layout her.

const C = require("./content.cjs");

const esc = (s) =>
  String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const page = (id) => C.PAGES.find((p) => p.id === id);

// Relativ sti til et asset, set fra en side i det givne sprog.
const A = (lang, p) => (lang === "en" ? "../" + p : p);

// Relativ sti til en anden side, set fra en side i det givne sprog.
function href(lang, id) {
  const file = page(id).file[lang];
  if (lang === "en") return file.replace(/^en\//, "");
  return file;
}

function canonical(file) {
  if (file === "index.html") return C.SITE + "/";
  if (file === "en/index.html") return C.SITE + "/en/";
  return C.SITE + "/" + file;
}

/* ---------- ikoner ---------- */

const svg = (inner, filled) =>
  `<svg viewBox="0 0 24 24" fill="${filled ? "currentColor" : "none"}" stroke="${
    filled ? "none" : "currentColor"
  }" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;

const ICONS = {
  instagram: svg(
    '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/>',
    false
  ),
  facebook: svg(
    '<path d="M13.5 21v-7.3h2.5l.4-2.9h-2.9V8.9c0-.8.2-1.4 1.4-1.4h1.6V4.9c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.1H8v2.9h2.4V21h3.1z"/>',
    true
  ),
  youtube: svg(
    '<path d="M21.6 7.6c-.2-.9-.9-1.6-1.8-1.8C18.2 5.4 12 5.4 12 5.4s-6.2 0-7.8.4c-.9.2-1.6.9-1.8 1.8C2 9.2 2 12 2 12s0 2.8.4 4.4c.2.9.9 1.6 1.8 1.8 1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.6.4-4.4.4-4.4s0-2.8-.4-4.4zM10 15.1V8.9l5.2 3.1-5.2 3.1z"/>',
    true
  ),
  spotify: svg(
    '<circle cx="12" cy="12" r="9.2"/><path d="M7.4 9.4c3-.8 6.2-.5 8.8.9"/><path d="M8 12.6c2.5-.7 5.1-.4 7.3.8"/><path d="M8.6 15.6c2-.5 4.1-.3 5.9.7"/>',
    false
  ),
  shop: svg(
    '<path d="M2.5 4h2.2l2.1 10.2a1.6 1.6 0 0 0 1.6 1.3h8.3a1.6 1.6 0 0 0 1.6-1.3L19.8 7H6.1"/><circle cx="9.5" cy="19.3" r="1.5"/><circle cx="17" cy="19.3" r="1.5"/>',
    false
  ),
};

const SOCIAL_LIST = [
  ["Instagram", C.SOCIALS.instagram, "instagram"],
  ["Facebook", C.SOCIALS.facebook, "facebook"],
  ["YouTube", C.SOCIALS.youtube, "youtube"],
  ["Spotify", C.SOCIALS.spotify, "spotify"],
  ["Shop", C.SOCIALS.shop, "shop"],
];

function socialLinks(cls) {
  return SOCIAL_LIST.map(
    ([label, url, icon]) =>
      `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noreferrer" title="${esc(
        label
      )}" aria-label="${esc(label)}">${ICONS[icon]}</a>`
  ).join("");
}

const star =
  '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.5l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6-5.9-3.2-5.9 3.2 1.2-6.6L2.5 9.5l6.6-.9z"/></svg>';

/* ---------- byggeklodser ---------- */

function mono(text, cls) {
  return `<p class="mono ${cls || ""}">${text}</p>`;
}

function heading(lang, { eyebrow, title, lede, size, tag }) {
  const T = tag || "h2";
  return (
    '<div class="head">' +
    (eyebrow ? `<p class="mono mono--wide">${esc(eyebrow)}</p>` : "") +
    `<${T} class="h h--${size || "m"}">${title}</${T}>` +
    (lede ? `<p class="lede">${esc(lede)}</p>` : "") +
    "</div>"
  );
}

// Medie-felt med video. Videoen har ingen src i markup — den sættes af app.js,
// så intet hentes før brugeren beder om det (eller hero'en starter selv).
function videoWell(lang, o) {
  const t = (k) => C.UI[k][lang];
  const attrs = [
    `class="well__v"`,
    `poster="${esc(A(lang, o.poster))}"`,
    `data-src="${esc(A(lang, o.video))}"`,
    o.videoPortrait ? `data-src-portrait="${esc(A(lang, o.videoPortrait))}"` : "",
    o.posterPortrait ? `data-poster-portrait="${esc(A(lang, o.posterPortrait))}"` : "",
    o.autoplay ? "data-autoplay" : "",
    "muted",
    "loop",
    "playsinline",
    'preload="none"',
  ]
    .filter(Boolean)
    .join(" ");

  return (
    `<figure class="well ${o.wellClass || ""}"${
      o.id ? ` id="${esc(o.id)}"` : ""
    } data-well>` +
    `<div class="well__box" style="--ar:${o.ratio || "16/9"}">` +
    `<video ${attrs}></video>` +
    '<span class="well__grad"></span>' +
    '<span class="well__prog"><i></i></span>' +
    `<button class="well__big" type="button" data-play aria-label="${esc(t("playVideo"))}">` +
    '<span class="well__tri"></span></button>' +
    '<div class="well__ctrls" hidden>' +
    `<button type="button" data-toggle aria-label="${esc(t("pause"))}" title="${esc(t("pause"))}">` +
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg></button>' +
    `<button type="button" data-restart aria-label="${esc(t("restart"))}" title="${esc(
      t("restart")
    )}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 5 9 12l10 7V5z"/><line x1="5" y1="4.5" x2="5" y2="19.5"/></svg></button>` +
    `<button type="button" data-sound aria-label="${esc(t("soundOn"))}" title="${esc(
      t("soundOn")
    )}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6.5 9H3v6h3.5L11 19V5z"/><path d="M16 9a4 4 0 0 1 0 6" opacity=".35"/><path d="M18.8 6.5a7.5 7.5 0 0 1 0 11" opacity=".35"/><path d="M3.5 20.5 21 3.5"/></svg><span>${esc(
      t("soundOn")
    )}</span></button>` +
    "</div>" +
    `<noscript><a class="well__ns" href="${esc(A(lang, o.video))}">${esc(
      t("openVideoFile")
    )}</a></noscript>` +
    "</div>" +
    (o.body ? `<figcaption class="well__body">${o.body}</figcaption>` : "") +
    "</figure>"
  );
}

function photoWell(lang, o) {
  return (
    `<figure class="well ${o.wellClass || ""}">` +
    `<div class="well__box"${o.h ? ` style="--h:${o.h}"` : ""}>` +
    (o.mobileSrc
      ? `<picture>` +
        // Skifter kun på berøringsenheder — ikke når et browservindue på en
        // computer gøres smalt. `pointer: coarse` er sand på telefon og tablet.
        `<source media="(pointer: coarse) and (max-width: 900px)" srcset="${esc(A(lang, o.mobileSrc))}">` +
        `<img class="well__v" src="${esc(A(lang, o.src))}" alt="${esc(o.alt || "")}"${
          o.position ? ` style="object-position:${o.position}"` : ""
        }${o.eager ? "" : ' loading="lazy"'} decoding="async">` +
        `</picture>`
      : `<img class="well__v" src="${esc(A(lang, o.src))}" alt="${esc(o.alt || "")}"${
          o.position ? ` style="object-position:${o.position}"` : ""
        }${o.eager ? "" : ' loading="lazy"'} decoding="async">`) +
    '<span class="well__grad"></span>' +
    (o.rule ? '<span class="well__rule"></span>' : "") +
    "</div>" +
    (o.body ? `<figcaption class="well__body">${o.body}</figcaption>` : "") +
    "</figure>"
  );
}

function newsletterBand(lang) {
  const t = (k) => C.UI[k][lang];
  return (
    '<section class="sec sec--cyan nlband">' +
    `<div><h2 class="h h--m">${esc(t("nlTitle"))}</h2><p class="lede lede--dark">${esc(
      t("nlLede")
    )}</p></div>` +
    `<form class="nlband__form" data-w3 action="${esc(C.FORMS.endpoint)}" method="post">` +
    `<input type="hidden" name="access_key" value="${esc(C.FORMS.key)}">` +
    '<input type="hidden" name="subject" value="Nyhedsbrev — ny tilmelding">' +
    '<input type="hidden" name="from_name" value="Website — nyhedsbrev">' +
    '<input type="checkbox" name="botcheck" class="hp" tabindex="-1" aria-hidden="true">' +
    `<input class="input" type="email" name="email" required placeholder="${esc(
      t("yourEmail")
    )}" aria-label="${esc(t("yourEmail"))}">` +
    `<button class="btn btn--warm" type="submit">${esc(t("signUp"))}</button>` +
    `<p class="fmsg fmsg--dark" data-msg data-ok="${esc(t("nlOk"))}" data-err="${esc(t("nlErr"))}" data-sending="${esc(t("fSending"))}" hidden></p>` +
    "</form></section>"
  );
}

/* ---------- booking-modal ---------- */

function bookModal(lang) {
  const t = (k) => C.UI[k][lang];
  const f = (label, name, type, extra) =>
    '<label class="fld">' +
    `<span class="fld__l">${label}</span>` +
    `<${type === "textarea" ? "textarea" : "input"} class="fld__i" name="${esc(name)}"` +
    (type === "textarea" ? ' rows="4"' : ` type="${esc(type)}"`) +
    (extra || "") +
    (type === "textarea" ? "></textarea>" : ">") +
    "</label>";

  return (
    '<div class="modal" id="book" hidden>' +
    '<div class="modal__scrim" data-book-close></div>' +
    '<div class="modal__box" role="dialog" aria-modal="true" aria-labelledby="book-h">' +
    `<button class="modal__x" type="button" data-book-close aria-label="${esc(t("close"))}">&times;</button>` +
    `<p class="mono mono--cyan">${esc(t("bookKicker"))}</p>` +
    `<h2 class="h h--m" id="book-h">${esc(t("bookUs"))}</h2>` +
    `<p class="modal__lede">${esc(t("bookLede"))}</p>` +
    `<form class="bform" data-w3 action="${esc(C.FORMS.endpoint)}" method="post">` +
    `<input type="hidden" name="access_key" value="${esc(C.FORMS.key)}">` +
    `<input type="hidden" name="subject" value="Booking fra theheartselectricalsystem.dk">` +
    '<input type="hidden" name="from_name" value="Website — booking">' +
    // Sætter Svar-til på mailen til afsenderens egen adresse, så Svar virker.
    '<input type="hidden" name="replyto" value="email">' +
    // Skjult fælde: robotter udfylder feltet, mennesker ser det ikke.
    '<input type="checkbox" name="botcheck" class="hp" tabindex="-1" aria-hidden="true">' +
    f(esc(t("fName")), "navn", "text", ' required autocomplete="name"') +
    '<div class="fld2">' +
    f(esc(t("fEmail")), "email", "email", ' required autocomplete="email"') +
    f(esc(t("fPhone")) + ` <span class="fld__o">${esc(t("fOptional"))}</span>`, "telefon", "tel", ' autocomplete="tel"') +
    "</div>" +
    f(esc(t("fMessage")), "besked", "textarea", ` placeholder="${esc(t("fMessagePh"))}"`) +
    '<div class="bform__foot">' +
    `<button class="btn btn--warm btn--mono" type="submit">${esc(t("fSend"))}</button>` +
    `<a class="ulink ulink--quiet" href="mailto:${esc(C.BOOKING.email)}">${esc(t("orMail"))}</a>` +
    "</div>" +
    `<p class="fmsg" data-msg data-ok="${esc(t("fOk"))}" data-err="${esc(t("fErr"))}" data-sending="${esc(t("fSending"))}" hidden></p>` +
    "</form></div></div>"
  );
}

function bookBtn(lang, cls) {
  return `<a class="btn ${cls} btn--mono" href="#book" data-book-open>${esc(C.UI.bookUs[lang])}</a>`;
}

function reviewBand(lang) {
  return (
    '<section class="sec sec--cyan revband">' +
    `<p class="mono mono--wide">${esc(C.UI.reviews[lang])}</p>` +
    '<div class="revband__links">' +
    C.REVIEWS.map(
      (r) =>
        `<a href="${esc(r.url)}" target="_blank" rel="noreferrer">${esc(r.source)}</a>`
    ).join("") +
    "</div></section>"
  );
}

/* ---------- header, menu, footer ---------- */

function header(lang, id) {
  const t = (k) => C.UI[k][lang];
  const other = lang === "da" ? "en" : "da";
  const otherFile = page(id).file[other];
  const otherHref =
    lang === "da" ? otherFile : otherFile === "index.html" ? "../index.html" : "../" + otherFile;

  const links = C.PAGES.map(
    (p) =>
      `<a href="${esc(href(lang, p.id))}"${p.id === id ? ' aria-current="page"' : ""}>${esc(
        p.nav[lang]
      )}</a>`
  ).join("");

  const lang_ = `<p class="lang"><a href="${esc(
    lang === "da" ? href("da", id) : otherHref
  )}"${lang === "da" ? ' aria-current="true"' : ""}>DA</a><span>/</span><a href="${esc(
    lang === "en" ? href("en", id) : otherHref
  )}"${lang === "en" ? ' aria-current="true"' : ""}>EN</a></p>`;

  return (
    `<a class="skip" href="#main">${esc(t("skip"))}</a>` +
    '<header class="hdr">' +
    `<a class="hdr__logo" href="${esc(href(lang, "forside"))}" aria-label="The Heart's Electrical System">` +
    `<img src="${esc(
      A(lang, "assets/logo-ink.png")
    )}" alt="The Heart's Electrical System" width="220" height="55"></a>` +
    `<nav class="hdr__nav" aria-label="${esc(t("menu"))}">${links}` +
    `<span class="hdr__soc">${[
      ["Instagram", C.SOCIALS.instagram, "instagram"],
      ["Spotify", C.SOCIALS.spotify, "spotify"],
    ]
      .map(
        ([l, u, i]) =>
          `<a href="${esc(u)}" target="_blank" rel="noreferrer" title="${esc(l)}" aria-label="${esc(
            l
          )}">${ICONS[i]}</a>`
      )
      .join("")}</span>${lang_}</nav>` +
    `<div class="hdr__mob">${lang_}` +
    `<a class="burger" href="#menu" aria-label="${esc(t("menu"))}"><span></span><span></span><span></span></a>` +
    "</div>" +
    "</header>" +
    `<nav class="menu" id="menu" aria-label="${esc(t("menu"))}">` +
    `<a class="menu__close" href="#" aria-label="${esc(t("close"))}"><span></span><span></span></a>` +
    `<div class="menu__links">${links}</div>` +
    `<div class="menu__soc">${socialLinks("icon")}</div>` +
    "</nav>"
  );
}

function footer(lang) {
  const t = (k) => C.UI[k][lang];
  return (
    '<footer class="ftr">' +
    '<div class="ftr__top">' +
    `<div class="ftr__soc">${socialLinks("icon")}</div>` +
    `<form class="nl" data-w3 action="${esc(C.FORMS.endpoint)}" method="post">` +
    `<input type="hidden" name="access_key" value="${esc(C.FORMS.key)}">` +
    '<input type="hidden" name="subject" value="Nyhedsbrev — ny tilmelding">' +
    '<input type="hidden" name="from_name" value="Website — nyhedsbrev">' +
    '<input type="checkbox" name="botcheck" class="hp" tabindex="-1" aria-hidden="true">' +
    `<span class="mono mono--quiet">${esc(t("newsletter"))}</span>` +
    `<input type="email" name="email" required placeholder="${esc(t("yourEmail"))}" aria-label="${esc(
      t("nlSignUp")
    )}">` +
    `<button type="submit">${esc(t("signUp"))}</button>` +
    `<p class="fmsg" data-msg data-ok="${esc(t("nlOk"))}" data-err="${esc(t("nlErr"))}" data-sending="${esc(t("fSending"))}" hidden></p>` +
    "</form></div>" +
    '<div class="ftr__meta"><span>© 2026 The Heart\'s Electrical System</span>' +
    `<span>${esc(C.BOOKING.email)} · ${esc(C.BOOKING.phone)}</span>` +
    `<span>${esc(t("cookieNote"))}</span></div>` +
    "</footer>"
  );
}

/* ---------- sider ---------- */

function homePage(lang) {
  const t = (k) => C.UI[k][lang];
  const q = C.PULLQUOTE;

  const hero = videoWell(lang, {
    video: C.MEDIA.heroVideo,
    poster: C.MEDIA.heroPoster,
    videoPortrait: C.MEDIA.heroVideoPortrait,
    posterPortrait: C.MEDIA.heroPosterPortrait,
    autoplay: true,
    ratio: "16/9",
    wellClass: "well--hero",
    body:
      `<p class="mono mono--wide">${esc(C.COPY.heroKicker[lang])}</p>` +
      '<h1 class="h h--xl">We Dream In<br><span class="orange">Low Fidelity</span></h1>' +
      `<p class="well__lede">${esc(C.COPY.heroLede[lang])}</p>` +
      `<div class="btns btns--gap">${bookBtn(lang, "btn--warm")}</div>`,
  });

  const quote =
    '<section class="sec sec--raised quote">' +
    '<div class="quote__main">' +
    `<div class="stars">${star.repeat(q.stars)}</div>` +
    `<blockquote>“${esc(q.text[lang])}”</blockquote>` +
    '<div class="quote__by">' +
    `<span class="cyan">${esc(q.author)}</span>` +
    (q.translatedNote[lang] ? `<span class="dim"> · ${esc(q.translatedNote[lang])}</span>` : "") +
    `<span class="quote__role">${esc(q.role[lang])}</span>` +
    `<a class="quote__link" href="${esc(q.url)}" target="_blank" rel="noreferrer">${esc(
      t("readReview")
    )}</a>` +
    "</div></div>" +
    `<img class="quote__photo" src="${esc(A(lang, q.photo))}" alt="${esc(
      q.author
    )}" loading="lazy" decoding="async">` +
    '<div class="quote__cta">' +
    `<a class="btn btn--outline btn--sm" href="${esc(href(lang, "musik"))}">${esc(
      t("hearAlbum")
    )}</a>` +
    "</div></section>";

  const story = photoWell(lang, {
    src: C.MEDIA.pressPhoto,
    mobileSrc: C.MEDIA.pressPhotoMobileHome,
    position: "center 22%",
    h: "620px",
    rule: true,
    wellClass: "well--photo well--story",
    body:
      `<h2 class="h h--m">${esc(t("jazz2026"))}</h2>` +
      "<div>" +
      `<p class="well__lede">${esc(C.COPY.nameStory[lang])}</p>` +
      `<a class="ulink" href="${esc(href(lang, "om"))}">${esc(t("moreAbout"))}</a>` +
      "</div>",
  });

  const s0 = C.SHOWS[0];
  const picker =
    '<section class="sec sec--nobottom">' +
    heading(lang, { eyebrow: t("fromStage"), title: esc(t("pickShow")), size: "m" }) +
    '<div class="tabs" data-picker>' +
    C.SHOWS.map(
      (s, i) =>
        `<a class="card${i === 0 ? " card--on" : ""}" href="${esc(
          href(lang, "video")
        )}" data-show="${i}" data-video="${esc(A(lang, s.video))}" data-poster="${esc(
          A(lang, s.poster)
        )}" data-name="${esc(s.name)}" data-meta="${esc(s.meta[lang])}">` +
        `<span class="card__t">${esc(s.name)}</span><span class="mono">${esc(s.meta[lang])}</span></a>`
    ).join("") +
    "</div>" +
    videoWell(lang, {
      video: s0.video,
      poster: s0.poster,
      ratio: "16/9",
      id: "koncert",
      wellClass: "well--picked",
      body:
        `<p class="well__title" data-name>${esc(s0.name)}</p>` +
        `<p class="mono" data-meta>${esc(s0.meta[lang])}</p>`,
    }) +
    "</section>";

  const album =
    '<section class="sec grid2 grid2--mid">' +
    `<img class="cover" src="${esc(A(lang, C.ALBUM.cover))}" alt="${esc(
      C.ALBUM.title
    )}" loading="lazy" decoding="async">` +
    "<div>" +
    heading(lang, { eyebrow: t("newRelease"), title: esc(C.ALBUM.title), size: "m" }) +
    `<p class="mono mono--quiet">${esc(C.ALBUM.released[lang])} · ${esc(C.ALBUM.format[lang])}</p>` +
    '<div class="btns">' +
    `<a class="btn btn--warm" href="${esc(C.ALBUM.buy)}" target="_blank" rel="noreferrer">${esc(
      t("buyVinyl")
    )}</a>` +
    `<a class="btn btn--cream" href="${esc(href(lang, "musik"))}">${esc(t("stream"))}</a>` +
    "</div></div></section>";

  return hero + story + quote + picker + album + reviewBand(lang);
}

function musicPage(lang) {
  const t = (k) => C.UI[k][lang];
  return (
    '<section class="sec sec--top">' +
    heading(lang, {
      eyebrow: t("releases"),
      title: esc(C.ALBUM.title),
      size: "l",
      tag: "h1",
    }) +
    `<p class="mono mono--quiet">${esc(C.ALBUM.released[lang])} · ${esc(C.ALBUM.format[lang])}</p>` +
    '<div class="grid2 grid2--top">' +
    "<div>" +
    `<img class="cover" src="${esc(A(lang, C.ALBUM.cover))}" alt="${esc(
      C.ALBUM.title
    )}" decoding="async">` +
    `<p class="mono mono--quiet">${esc(t("coverPhoto"))}</p>` +
    `<p class="mono mono--quiet">${esc(t("coverDesign"))}</p>` +
    "</div><div>" +
    `<iframe class="spot" title="Spotify" src="${esc(
      C.ALBUM.spotifyEmbed
    )}" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" allowfullscreen></iframe>` +
    '<div class="services">' +
    `<p class="mono mono--quiet">${esc(t("listenOn"))}</p>` +
    C.SERVICES.map(function (s) {
      var inner = s.logo
        ? `<img src="${esc(A(lang, s.logo))}" alt="${esc(s.name)}" width="${s.w}" height="${
            s.h
          }" loading="lazy" decoding="async">`
        : `<span>${esc(s.name)}</span>`;
      return `<a class="services__l${s.logo ? "" : " services__l--text"}" href="${esc(
        s.url
      )}" target="_blank" rel="noreferrer">${inner}</a>`;
    }).join("") +
    "</div>" +
    `<p class="sell">${esc(t("buyVinylLong"))}<a href="${esc(
      C.ALBUM.buy
    )}" target="_blank" rel="noreferrer">${esc(t("buyVinylLink"))}</a>${esc(
      t("buyVinylTail")
    )}</p>` +
    `<p class="mono mono--quiet">${esc(t("singleNote"))}</p>` +
    "</div></div></section>"
  );
}

function videoPage(lang) {
  const t = (k) => C.UI[k][lang];
  return (
    '<section class="sec sec--top">' +
    heading(lang, { eyebrow: t("watch"), title: "Video", size: "l", tag: "h1" }) +
    '<div class="clips">' +
    C.CLIPS.map((c) =>
      videoWell(lang, {
        video: c.video,
        poster: c.poster,
        ratio: "16/9",
        body:
          `<p class="well__title">${esc(c.title[lang])}</p>` +
          `<p class="mono">${esc(c.meta[lang])}</p>`,
      })
    ).join("") +
    "</div></section>"
  );
}

function aboutPage(lang) {
  const t = (k) => C.UI[k][lang];
  return (
    photoWell(lang, {
      src: C.MEDIA.pressPhoto,
      mobileSrc: C.MEDIA.pressPhotoMobile,
      position: "center 35%",
      h: "460px",
      rule: true,
      eager: true,
      wellClass: "well--photo well--capup",
      body: heading(lang, {
        eyebrow: t("aboutEyebrow"),
        title: esc(t("aboutTitle")),
        size: "l",
        tag: "h1",
      }),
    }) +
    '<section class="sec sec--prose"><div class="prose">' +
    C.INTRO[lang]
      .map((p, i) => `<p${i === 0 ? ' class="prose__first"' : ""}>${esc(p)}</p>`)
      .join("") +
    "</div></section>" +
    '<section class="sec sec--raised">' +
    `<p class="mono mono--wide">${esc(t("members"))}</p>` +
    '<div class="members">' +
    C.MEMBERS.map(
      (m) =>
        '<article class="member">' +
        `<img src="${esc(A(lang, m.photo))}" alt="${esc(
          m.name
        )}" loading="lazy" decoding="async">` +
        `<h2 class="h h--xs">${esc(m.name)}</h2>` +
        `<p class="mono mono--warm">${esc(m.role[lang])}</p>` +
        `<p class="member__bio">${esc(m.bio[lang])}</p></article>`
    ).join("") +
    "</div>" +
    `<p class="mono mono--quiet">${esc(t("alsoOn") + C.GUESTS.join(" · "))}</p>` +
    "</section>"
  );
}

function epkPage(lang) {
  const t = (k) => C.UI[k][lang];
  return (
    '<section class="sec sec--top">' +
    heading(lang, {
      eyebrow: "Electronic press kit",
      title: "EPK",
      lede: t("epkLede"),
      size: "l",
      tag: "h1",
    }) +
    '<div class="files">' +
    C.FILES.map(
      (f) =>
        `<a href="${esc(A(lang, f.href))}" download>↓ ${esc(f[lang])}</a>`
    ).join("") +
    "</div></section>" +
    '<section class="sec sec--flush">' +
    `<p class="mono mono--wide">${esc(t("pressPhotos"))}</p>` +
    `<p class="mono mono--quiet">${esc(t("pressPhotosHint"))}</p>` +
    '<div class="photos">' +
    C.PRESS_PHOTOS.map(
      (p) =>
        `<a class="photos__i${p.span === 2 ? " photos__i--wide" : ""}" href="${esc(
          A(lang, p.file)
        )}" download>` +
        `<img src="${esc(A(lang, p.file))}" alt="${esc(
          p[lang]
        )}" loading="lazy" decoding="async">` +
        `<span>↓ ${esc(p[lang])}</span></a>`
    ).join("") +
    "</div>" +
    `<p class="mono mono--quiet">${esc(t("photosBy"))}</p>` +
    "</section>" +
    '<section class="sec sec--cool">' +
    `<p class="mono mono--wide">${esc(t("shortBio"))}</p>` +
    `<p class="lede lede--wide">${esc(C.SHORT_BIO[lang])}</p>` +
    `<p class="mono mono--quiet">${esc(t("press"))}${esc(C.BOOKING.email)} · ${esc(
      C.BOOKING.phone
    )}</p></section>` +
    reviewBand(lang)
  );
}

function shopPage(lang) {
  const t = (k) => C.UI[k][lang];
  return (
    '<section class="sec sec--orange grid2 grid2--mid">' +
    `<img class="cover" src="${esc(A(lang, C.ALBUM.cover))}" alt="${esc(
      C.ALBUM.title
    )}" decoding="async">` +
    "<div>" +
    '<p class="mono mono--wide mono--plain">Shop</p>' +
    `<h1 class="h h--l">${esc(C.ALBUM.title)} — vinyl</h1>` +
    `<p class="lede lede--dark">${esc(t("shopLede"))}</p>` +
    `<div class="btns"><a class="btn btn--ink" href="${esc(
      C.ALBUM.buy
    )}" target="_blank" rel="noreferrer">${esc(t("buyAtGateway"))}</a></div>` +
    "</div></section>"
  );
}

function contactPage(lang) {
  const t = (k) => C.UI[k][lang];
  const tel = C.BOOKING.phone.replace(/\s/g, "");
  return (
    '<section class="sec sec--cream contact">' +
    "<div>" +
    `<h1 class="h h--l">${esc(t("contact"))}</h1>` +
    '<address class="contact__a">' +
    `${esc(C.BOOKING.name)}<br>` +
    `<a href="mailto:${esc(C.BOOKING.email)}">${esc(C.BOOKING.email)}</a><br>` +
    `<a href="tel:${esc(tel)}">${esc(C.BOOKING.phone)}</a></address>` +
    `<p class="contact__p">${esc(t("contactLede"))}</p>` +
    `<div class="btns btns--gap">${bookBtn(lang, "btn--warm")}</div>` +
    "</div></div></section>" +
    '<section class="sec sec--tight">' +
    `<p class="mono mono--wide">${esc(t("liveCaption"))}</p>` +
    '<div class="livegrid">' +
    C.MEDIA.live
      .slice(0, 6)
      .map(
        (s) =>
          `<img src="${esc(A(lang, s))}" alt="" loading="lazy" decoding="async">`
      )
      .join("") +
    "</div>" +
    `<p class="mono mono--quiet">${esc(t("photoCredit"))}</p>` +
    "</section>"
  );
}

const BODIES = {
  forside: homePage,
  musik: musicPage,
  video: videoPage,
  om: aboutPage,
  epk: epkPage,
  shop: shopPage,
  booking: contactPage,
};

/* ---------- dokumentet ---------- */

function document_(lang, id) {
  const p = page(id);
  const file = p.file[lang];
  const base = lang === "en" ? "../" : "";
  const daUrl = canonical(p.file.da);
  const enUrl = canonical(p.file.en);
  const url = canonical(file);
  const isHome = id === "forside";

  const head =
    '<meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">' +
    `<title>${esc(p.title[lang])}</title>` +
    `<meta name="description" content="${esc(p.desc[lang])}">` +
    `<link rel="canonical" href="${esc(url)}">` +
    `<link rel="alternate" hreflang="da" href="${esc(daUrl)}">` +
    `<link rel="alternate" hreflang="en" href="${esc(enUrl)}">` +
    `<link rel="alternate" hreflang="x-default" href="${esc(daUrl)}">` +
    `<meta property="og:type" content="${isHome ? "website" : "article"}">` +
    `<meta property="og:site_name" content="The Heart's Electrical System">` +
    `<meta property="og:locale" content="${lang === "da" ? "da_DK" : "en_GB"}">` +
    `<meta property="og:title" content="${esc(p.title[lang])}">` +
    `<meta property="og:description" content="${esc(p.desc[lang])}">` +
    `<meta property="og:url" content="${esc(url)}">` +
    `<meta property="og:image" content="${esc(C.SITE + "/" + p.image)}">` +
    '<meta name="twitter:card" content="summary_large_image">' +
    `<link rel="icon" href="${base}favicon.svg" type="image/svg+xml">` +
    '<link rel="preconnect" href="https://fonts.googleapis.com">' +
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700;800&family=Karla:wght@400;500;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap">' +
    `<link rel="stylesheet" href="${base}styles.css">` +
    (isHome
      ? `<link rel="preload" as="image" href="${base}assets/hero.jpg" fetchpriority="high">`
      : "");

  const jsonld = isHome
    ? '<script type="application/ld+json">' +
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "MusicGroup",
        name: "The Heart's Electrical System",
        url: C.SITE + "/",
        genre: ["Jazz", "Electronica", "Instrumental hip hop"],
        email: C.BOOKING.email,
        telephone: C.BOOKING.phone,
        sameAs: [C.SOCIALS.instagram, C.SOCIALS.facebook, C.SOCIALS.spotify, C.SOCIALS.youtube],
        album: {
          "@type": "MusicAlbum",
          name: C.ALBUM.title,
          datePublished: "2026-04-17",
        },
      }) +
      "</script>"
    : "";

  return (
    "<!DOCTYPE html>\n" +
    `<html lang="${lang}">\n<head>` +
    head +
    jsonld +
    "</head>\n<body>" +
    header(lang, id) +
    `<main id="main">${BODIES[id](lang)}</main>` +
    (id === "forside" ? newsletterBand(lang) : "") +
    footer(lang) +
    bookModal(lang) +
    `<script src="${base}app.js" defer></script>` +
    "</body>\n</html>\n"
  );
}

/* ---------- 404, sitemap, robots ---------- */

function notFound() {
  const rows = ["da", "en"]
    .map((l) => {
      const t = (k) => C.UI[k][l];
      return (
        `<section lang="${l}"><h1>${esc(t("notFoundTitle"))}</h1>` +
        `<p>${esc(t("notFoundLede"))}</p>` +
        `<a href="${esc(canonical(page("forside").file[l]))}">${esc(t("backHome"))}</a></section>`
      );
    })
    .join("");

  return (
    "<!DOCTYPE html>\n<html lang=\"da\">\n<head><meta charset=\"utf-8\">" +
    '<meta name="viewport" content="width=device-width, initial-scale=1">' +
    "<title>404 — The Heart's Electrical System</title>" +
    '<meta name="robots" content="noindex">' +
    "<style>" +
    "html,body{margin:0;background:#1A1512;color:#F7F2EA;font-family:Karla,'Helvetica Neue',Arial,sans-serif}" +
    "main{min-height:100svh;display:grid;place-content:center;gap:44px;padding:40px 26px;box-sizing:border-box}" +
    "h1{font-family:Archivo,'Helvetica Neue',Arial,sans-serif;font-weight:800;text-transform:uppercase;letter-spacing:-.03em;font-size:clamp(34px,7vw,46px);line-height:1;margin:0 0 14px}" +
    "p{font-size:16px;line-height:1.55;opacity:.8;margin:0 0 20px;max-width:40ch}" +
    "a{display:inline-block;color:#1A1512;background:#FF7A2F;text-decoration:none;font-weight:700;font-size:14px;letter-spacing:.06em;text-transform:uppercase;padding:16px 24px}" +
    "section+section{border-top:1px solid rgba(247,242,234,.12);padding-top:40px}" +
    "</style></head>\n<body><main>" +
    rows +
    "</main></body>\n</html>\n"
  );
}

function sitemap() {
  const urls = [];
  C.PAGES.forEach((p) => {
    ["da", "en"].forEach((l) => {
      urls.push(
        "  <url>\n    <loc>" +
          canonical(p.file[l]) +
          "</loc>\n" +
          '    <xhtml:link rel="alternate" hreflang="da" href="' +
          canonical(p.file.da) +
          '"/>\n' +
          '    <xhtml:link rel="alternate" hreflang="en" href="' +
          canonical(p.file.en) +
          '"/>\n' +
          "    <changefreq>monthly</changefreq>\n" +
          "    <priority>" +
          (p.id === "forside" ? "1.0" : "0.7") +
          "</priority>\n  </url>"
      );
    });
  });
  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
    urls.join("\n") +
    "\n</urlset>\n"
  );
}

function robots() {
  return "User-agent: *\nAllow: /\n\nSitemap: " + C.SITE + "/sitemap.xml\n";
}

function favicon() {
  // Pixelhjerte i sitets orange, tegnet på et 12×10-net så kanterne følger
  // pixelnettet og formen holder ved 16 px i browserfanen.
  const rows = [
    "..##....##..",
    ".####..####.",
    "############",
    "############",
    "############",
    ".##########.",
    "..########..",
    "...######...",
    "....####....",
    ".....##.....",
  ];
  const cell = 5, ox = 2, oy = 7;
  let px = "";
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      if (row[x] === "#") {
        let n = 1;
        while (row[x + n] === "#") n++;
        px += `<rect x="${ox + x * cell}" y="${oy + y * cell}" width="${n * cell}" height="${cell}" fill="#FF7A2F"/>`;
        x += n;
      } else x++;
    }
  });
  return (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' + px + "</svg>\n"
  );
}

module.exports = { document_, notFound, sitemap, robots, favicon, PAGES: C.PAGES };
