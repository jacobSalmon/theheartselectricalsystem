// Alt indhold på sitet, dansk og engelsk. Ingen markup her.
// Bandtekster er ordret fra den leverede biografi og pressemeddelelse.
// [CHECK] markerer noget der er udfyldt af mig og bør bekræftes.

const SITE = "https://jacobsalmon.github.io/theheartselectricalsystem";

const BOOKING = {
  name: "Jacob Salmon",
  email: "jacob.salmon@icloud.com",
  phone: "+45 61 30 28 04",
};

const SOCIALS = {
  instagram: "https://www.instagram.com/theheartselectricalsystem",
  facebook: "https://www.facebook.com/theheartselectricalsystem",
  spotify: "https://open.spotify.com/artist/6yQUwki6MKWvhkyoh8tzuA",
  youtube: "https://youtu.be/u4jp5a-4Uwc",
  shop: "https://gatewaymusicshop.dk/da/vinyl/WeDreaminLowFidelity-vinyl",
  messenger: "https://m.me/theheartselectricalsystem",
};

const ALBUM = {
  title: "We Dream In Low Fidelity",
  released: { da: "17. april 2026", en: "17 April 2026" },
  format: { da: "Album — digital + vinyl", en: "Album — digital + vinyl" },
  spotifyEmbed:
    "https://open.spotify.com/embed/album/2E7w2YS8tUJOpJn60MLE4B?utm_source=generator&si=99734afaae81411f",
  cover: "assets/album-cover-web.jpg",
  buy: "https://gatewaymusicshop.dk/da/vinyl/WeDreaminLowFidelity-vinyl",
};

// Tjenester hvor albummet kan høres. "logo" er valgfrit — uden logo vises navnet
// som tekst. Læg nye logoer i docs/assets og skriv stien her.
const SERVICES = [
  {
    name: "Spotify",
    url: "https://open.spotify.com/album/2E7w2YS8tUJOpJn60MLE4B",
  },
  {
    name: "Apple Music",
    url: "https://music.apple.com/us/album/we-dream-in-low-fidelity/1886690925",
  },
  {
    name: "YouTube Music",
    url: "https://music.youtube.com/playlist?list=OLAK5uy_k3-_OqaHQbmLOg4ErOZkpG1n04HF0r8Dc",
  },
  {
    name: "Tidal",
    url: "https://tidal.com/album/508792476/u",
  },
];

const MEDIA = {
  pressPhoto: "assets/press-band-web.jpg",
  pressPhotoMobile: "assets/press-band-portrait.jpg",
  pressPhotoMobileHome: "assets/press-band-square.jpg",
  heroVideo: "assets/hero.mp4",
  heroPoster: "assets/hero.jpg",
  heroVideoPortrait: "assets/thes-intro-portrait.mp4",
  heroPosterPortrait: "assets/thes-intro-portrait.jpg",
  live: [
    "assets/live-1.png",
    "assets/live-2.png",
    "assets/live-3.png",
    "assets/live-4.png",
    "assets/live-5.png",
    "assets/live-6.png",
    "assets/live-7.png",
  ],
};

const INTRO = {
  da: [
    `The Heart’s Electrical System spiller moderne, melodisk og improviserende jazz med et tydeligt rytmisk fokus. Musikken bevæger sig i krydsfeltet mellem jazz, elektronica og instrumental hiphop og kan høres som jazz anno 2026.`,
    `Bandets lyd er kendetegnet ved et markant groove og et nutidigt rytmisk udtryk, der skaber rammen for solisternes frie udfoldelse over et solidt harmonisk fundament. Her mødes akustiske instrumenter og elektroniske elementer i et åbent og imødekommende musikalsk univers, som fungerer både til koncentreret lytning og i mere sociale sammenhænge.`,
    `Navnet The Heart’s Electrical System afspejler essensen af bandets musikalske tilgang. Hjertet – ofte opfattet som det mest menneskelige, biologiske og analoge – fungerer gennem elektriske impulser. Et hjerteslag kan beskrives som en sinuskurve, den samme grundform som ligger til grund for en synthesizer. På den måde bliver skellet mellem analog jazz og elektronisk musik overskredet. Begge udtryk rummer sjæl, nærvær og følelsesmæssig dybde, og det er netop de følelser, musikken vækker, der er kernen i projektet.`,
  ],
  en: [
    `The Heart’s Electrical System plays modern, melodic, improvising jazz with a clear rhythmic focus. The music moves between jazz, electronica and instrumental hiphop, and can be heard as jazz in 2026.`,
    `The band's sound is marked by a strong groove and a contemporary rhythmic feel, framing the soloists' free playing over a solid harmonic foundation. Acoustic instruments meet electronic elements in an open, welcoming musical world that works for close listening as much as for more social settings.`,
    `The name The Heart’s Electrical System reflects the essence of the band's approach. The heart – usually thought of as the most human, biological and analogue thing there is – runs on electrical impulses. A heartbeat can be described as a sine wave, the same shape that underpins a synthesizer. That makes the divide between analogue jazz and electronic music artificial. Both hold soul, presence and emotional depth, and it is exactly those feelings the music stirs that are at the core of the project.`,
  ],
};

const MEMBERS = [
  {
    name: "Anton Schrøder Hejlesen",
    photo: "assets/portrait-anton-web.jpg",
    role: { da: "Trompet", en: "Trumpet" },
    bio: {
      da: `Aarhusiansk trompetist og studerende ved Det Jyske Musikkonservatorium. Aktiv på den aarhusianske jazzscene og arbejder samtidig med genrer som afrobeat, funk og salsa. Har spillet i en lang række orkestre og bands, blandt andet med John Riddell og Kathrine Windfeld i spidsen. Har samarbejdet med Copenhagen Jazz Orchestra og Lars Møller og spiller desuden trompet for artisten JJ PAULO.`,
      en: `Trumpeter from Aarhus, studying at the Royal Academy of Music. Active on the Aarhus jazz scene and works across afrobeat, funk and salsa. Has played in orchestras and bands led by John Riddell and Kathrine Windfeld, and collaborated with Copenhagen Jazz Orchestra and Lars Møller. Also plays trumpet for JJ PAULO.`,
    },
  },
  {
    name: "Asger Kirkegaard Sørensen",
    photo: "assets/portrait-asger-web.jpg",
    role: { da: "Guitar", en: "Guitar" },
    bio: {
      da: `Guitarist med base i Aarhus, hvor han studerer på Det Jyske Musikkonservatorium. Aktiv på den aarhusianske musikscene i mange sammenhænge og optræder inden for både alternative, r'n'b, latin og progressiv rock med navne som Methea, St. Lazar og Prince-bassisten Ida Nielsen. Udforsker guitarens soniske grænser gennem en legende tilgang til effekter. Spillet er melodisk inspireret af fusionslegender som Pat Metheny og Wayne Krantz kombineret med den rytmiske intensitet fra den nyere UK-jazzscene.`,
      en: `Guitarist based in Aarhus, studying at the Royal Academy of Music. Active across the city's music scene in alternative, r'n'b, latin and progressive rock with acts such as Methea, St. Lazar and Prince bassist Ida Nielsen. Explores the sonic limits of the guitar through a playful approach to effects. His playing is melodically indebted to fusion legends like Pat Metheny and Wayne Krantz, combined with the rhythmic intensity of the newer UK jazz scene.`,
    },
  },
  {
    name: "Henrik Windbirk",
    photo: "assets/portrait-henrik-web.jpg",
    role: { da: "Tenorsaxofon", en: "Tenor saxophone" },
    bio: {
      da: `Saxofonist bosat ved Aarhus. Har spillet i mange forskellige konstellationer, primært inden for jazz, soul og funk, både i større og mindre bands, samt som orkestermusiker i forbindelse med revyer og musicals. Har gennem årene optrådt med blandt andre Booze Brothers, Morten Lindberg (Master Fatman), Mek Pek og Cæcilie Norby. Er også en del af Sunday Deluxe, et jam-funkorkester med fokus på funk i egne arrangementer.`,
      en: `Saxophonist based near Aarhus. Has played in a wide range of settings, mainly jazz, soul and funk, in both large and small bands, and as an orchestral musician for revues and musicals. Has performed with Booze Brothers, Morten Lindberg (Master Fatman), Mek Pek and Cæcilie Norby. Also part of Sunday Deluxe, a jam-funk outfit.`,
    },
  },
  {
    name: "Jacob Salmon",
    photo: "assets/portrait-jacob-web.jpg",
    role: { da: "Klaver, synthesizer, beats", en: "Piano, synthesizer, beats" },
    bio: {
      da: `Pianist, komponist og producer fra Danmark. Arbejder i krydsfeltet mellem jazz, elektronisk musik og beats og er uddannet producer og mixtekniker fra School of Audio Engineering i London. Efter en længere periode med fokus på klaver, jazzimprovisation og projekter med sangere har han de senere år vendt tilbage til produktion og komposition i et mere kollektivt, instrumentalt jazzformat. Med The Heart's Electrical System samler han musikere fra den aarhusianske jazzscene i et nutidigt, groovebaseret udtryk.`,
      en: `Pianist, composer and producer from Denmark. Works between jazz, electronic music and beats, and trained as a producer and mixing engineer at the School of Audio Engineering in London. After years focused on piano, jazz improvisation and projects with singers, he has returned to production and composition in a collective, instrumental jazz format. With The Heart's Electrical System he gathers musicians from the Aarhus jazz scene into a contemporary, groove-based sound.`,
    },
  },
];

const GUESTS = [
  "Anders Bøwadt Jensen — trombone",
  "Lauge Sloth Nielsen — bas",
  "Morten Svenningsen — guitar",
];

const PULLQUOTE = {
  text: {
    da: `Med afsæt i egne, melodiske kompositioner formår bandet på let vis at forene elektroniske beats med moderne jazz og instrumental hiphop. Sammensmeltningen fremstår stringent og sikker, og oplevelsen er af samme grund fed, medrivende.`,
    en: `Working from their own melodic compositions, the band effortlessly brings electronic beats together with modern jazz and instrumental hiphop. The fusion comes across as rigorous and assured, and the experience is, for that very reason, great and compelling.`,
  },
  translatedNote: { da: "", en: "Translated from Danish" },
  author: "Ivan Rod",
  role: {
    da: "Journalist, forfatter, redaktør og anmelder, bl.a. på Gaffa",
    en: "Journalist, author, editor and critic, including for Gaffa",
  },
  stars: 4,
  photo: "assets/ivan-rod.png",
  url: "https://www.ivanrod.dk/2026/04/17/the-hearts-electrical-system-we-dream-in-low-fidelity",
};

const REVIEWS = [
  { source: "Ivan Rod", url: PULLQUOTE.url },
  { source: "Musikfans", url: "https://musikfans.dk/the-hearts-electrical-system/" },
  { source: "Capac", url: "https://www.capac.dk/wordpress/?p=39984" },
];

const COPY = {
  heroKicker: { da: "Jazz beats electronica live", en: "Jazz beats electronica live" },
  heroLede: {
    da: "Albummet We Dream In Low Fidelity er ude nu.",
    en: "The album We Dream In Low Fidelity is out now.",
  },
  nameStory: {
    da: `Hjertet — ofte opfattet som det mest menneskelige, biologiske og analoge — fungerer gennem elektriske impulser. Et hjerteslag kan beskrives som en sinuskurve, den samme grundform som ligger til grund for en synthesizer.`,
    en: `The heart — usually thought of as the most human, biological and analogue thing there is — runs on electrical impulses. A heartbeat can be described as a sine wave, the same shape that underpins a synthesizer.`,
  },
};

const SHOWS = [
  {
    name: "CPH Jazz Festival",
    meta: { da: "København 5. juli 2026", en: "Copenhagen 5 July 2026" },
    video: "assets/cph-jazz-festival.mp4",
    poster: "assets/cph-jazz-festival.jpg",
  },
  {
    name: "Noget Bedre Festival",
    meta: { da: "Silkeborg 31. juli 2026", en: "Silkeborg 31 July 2026" },
    video: "assets/noget-bedre-festival.mp4",
    poster: "assets/noget-bedre-festival.jpg",
  },
  {
    name: "Release Koncert i Ry",
    meta: { da: "Ry, 18. april 2026", en: "Ry, 18 April 2026" },
    video: "assets/release-koncert.mp4",
    poster: "assets/release-koncert.jpg",
  },
];

const CLIPS = [
  {
    video: "assets/release-koncert.mp4",
    poster: "assets/release-koncert.jpg",
    title: { da: "Mød bandet", en: "Meet the band" },
    meta: {
      da: "Album release koncert i Ry 18. april 2026",
      en: "Album release show in Ry, 18 April 2026",
    },
  },
  {
    video: "assets/noget-bedre-festival.mp4",
    poster: "assets/noget-bedre-festival.jpg",
    title: { da: "Noget Bedre Festival", en: "Noget Bedre Festival" },
    meta: { da: "Silkeborg 31. juli 2026", en: "Silkeborg 31 July 2026" },
  },
  {
    video: "assets/cph-jazz-festival.mp4",
    poster: "assets/cph-jazz-festival.jpg",
    title: { da: "CPH Jazz Festival", en: "CPH Jazz Festival" },
    meta: { da: "København 5. juli 2026", en: "Copenhagen 5 July 2026" },
  },
];

const FILES = [
  { da: "Biografi (PDF)", en: "Biography (PDF)", href: "assets/press/biografi-thes.pdf" },
  {
    da: "Pressemeddelelse (PDF)",
    en: "Press release (PDF)",
    href: "assets/press/pressemeddelelse-we-dream-in-low-fidelity.pdf",
  },
  { da: "Alle pressefotos (ZIP)", en: "All press photos (ZIP)", href: "assets/press/thes-pressefotos.zip" },
  { da: "Teknisk rider (JPEG)", en: "Tech rider (JPEG)", href: "assets/press/thes-tech-rider.jpeg" },
  { da: "Logo (PDF)", en: "Logo (PDF)", href: "assets/THES_Logo.pdf" },
  {
    da: "Album cover (PNG, 3000×3000)",
    en: "Album cover (PNG, 3000×3000)",
    href: "assets/press/thes-album-cover-3000x3000.png",
  },
];

const PRESS_PHOTOS = [
  { file: "assets/press/thes-band-1500x800.jpeg", da: "Bandet, bredformat", en: "Band, wide", span: 2 },
  { file: "assets/press/thes-band-1500x1500.jpeg", da: "Bandet, kvadratisk", en: "Band, square", span: 1 },
  { file: "assets/press/thes-band-1080x1350.jpg", da: "Bandet, højformat", en: "Band, portrait", span: 1 },
  { file: "assets/press/thes-jacob.jpg", da: "Jacob Salmon", en: "Jacob Salmon", span: 1 },
  { file: "assets/press/thes-henrik.jpg", da: "Henrik Windbirk", en: "Henrik Windbirk", span: 1 },
  { file: "assets/press/thes-anton.jpeg", da: "Anton Schrøder Hejlesen", en: "Anton Schrøder Hejlesen", span: 1 },
  { file: "assets/press/thes-asger.jpg", da: "Asger Kirkegaard Sørensen", en: "Asger Kirkegaard Sørensen", span: 1 },
];

// Sidernes identitet, filnavne og delingsmetadata.
// Dansk ligger i roden, engelsk under /en/.
const PAGES = [
  {
    id: "forside",
    file: { da: "index.html", en: "en/index.html" },
    nav: { da: "Forside", en: "Home" },
    title: {
      da: "The Heart's Electrical System — jazz, beats og electronica",
      en: "The Heart's Electrical System — jazz, beats and electronica",
    },
    desc: {
      da: "Moderne, melodisk jazz med elektroniske beats. Albummet We Dream In Low Fidelity er ude nu på digital og vinyl.",
      en: "Modern, melodic jazz with electronic beats. The album We Dream In Low Fidelity is out now on digital and vinyl.",
    },
    image: "assets/press/thes-band-1500x800.jpeg",
  },
  {
    id: "musik",
    file: { da: "musik.html", en: "en/music.html" },
    nav: { da: "Musik", en: "Music" },
    title: {
      da: "Musik — We Dream In Low Fidelity | The Heart's Electrical System",
      en: "Music — We Dream In Low Fidelity | The Heart's Electrical System",
    },
    desc: {
      da: "Stream eller køb We Dream In Low Fidelity, udgivet 17. april 2026 på digital og vinyl.",
      en: "Stream or buy We Dream In Low Fidelity, released 17 April 2026 on digital and vinyl.",
    },
    image: "assets/album-we-dream-in-low-fidelity.png",
  },
  {
    id: "video",
    file: { da: "video.html", en: "en/video.html" },
    nav: { da: "Video", en: "Video" },
    title: {
      da: "Video — live fra scenen | The Heart's Electrical System",
      en: "Video — live from the stage | The Heart's Electrical System",
    },
    desc: {
      da: "Optagelser fra CPH Jazz Festival, Noget Bedre Festival og release-koncerten i Ry.",
      en: "Footage from CPH Jazz Festival, Noget Bedre Festival and the album release show in Ry.",
    },
    image: "assets/cph-jazz-festival.jpg",
  },
  {
    id: "om",
    file: { da: "om.html", en: "en/about.html" },
    nav: { da: "Om bandet", en: "About" },
    title: {
      da: "Om bandet | The Heart's Electrical System",
      en: "About the band | The Heart's Electrical System",
    },
    desc: {
      da: "Fire musikere fra den aarhusianske jazzscene, hvor programmerede grooves møder levende samspil.",
      en: "Four musicians from the Aarhus jazz scene, where programmed grooves meet live interplay.",
    },
    image: "assets/press-band.jpeg",
  },
  {
    id: "epk",
    file: { da: "epk.html", en: "en/epk.html" },
    nav: { da: "EPK", en: "EPK" },
    title: {
      da: "EPK — presse og arrangører | The Heart's Electrical System",
      en: "EPK — press and promoters | The Heart's Electrical System",
    },
    desc: {
      da: "Biografi, pressemeddelelse, pressefotos, teknisk rider og logo til download.",
      en: "Biography, press release, press photos, tech rider and logo, ready to download.",
    },
    image: "assets/press/thes-band-1500x800.jpeg",
  },
  {
    id: "shop",
    file: { da: "shop.html", en: "en/shop.html" },
    nav: { da: "Shop", en: "Shop" },
    title: {
      da: "Shop — vinyl | The Heart's Electrical System",
      en: "Shop — vinyl | The Heart's Electrical System",
    },
    desc: {
      da: "We Dream In Low Fidelity på vinyl, solgt gennem Gateway Music Shop.",
      en: "We Dream In Low Fidelity on vinyl, sold through Gateway Music Shop.",
    },
    image: "assets/album-we-dream-in-low-fidelity.png",
  },
  {
    id: "booking",
    file: { da: "kontakt.html", en: "en/contact.html" },
    nav: { da: "Kontakt", en: "Contact" },
    title: {
      da: "Kontakt og booking | The Heart's Electrical System",
      en: "Contact and booking | The Heart's Electrical System",
    },
    desc: {
      da: "Book bandet. Ring, send en sms eller skriv på Messenger.",
      en: "Book the band. Call, text or write on Messenger.",
    },
    image: "assets/live-2.png",
  },
];

const UI = {
  menu: { da: "Menu", en: "Menu" },
  close: { da: "Luk", en: "Close" },
  skip: { da: "Spring til indhold", en: "Skip to content" },
  hearAlbum: { da: "Hør albummet", en: "Hear the album" },
  bookBand: { da: "Book bandet", en: "Book the band" },
  buyVinyl: { da: "Køb vinyl", en: "Buy vinyl" },
  buyVinylLong: {
    da: "Eller endnu bedre: Køb albummet på ",
    en: "Or even better: buy the album on ",
  },
  buyVinylLink: { da: "vinyl", en: "vinyl" },
  buyVinylTail: {
    da: " for kun 150 kr",
    en: " for only DKK 150",
  },
  stream: { da: "Stream", en: "Stream" },
  readReview: { da: "Læs hele anmeldelsen", en: "Read the full review" },
  moreAbout: { da: "Læs mere om bandet", en: "More about the band" },
  reviews: { da: "Anmeldelser", en: "Reviews" },
  newsletter: { da: "Nyhedsbrev", en: "Newsletter" },
  yourEmail: { da: "Din e-mail", en: "Your email" },
  signUp: { da: "Tilmeld", en: "Sign up" },
  nlSignUp: { da: "Tilmeld dig nyhedsbrevet", en: "Sign up for the newsletter" },
  members: { da: "Medlemmer", en: "Members" },
  alsoOn: { da: "Medvirkende på albummet: ", en: "Also on the album: " },
  playVideo: { da: "Afspil video", en: "Play video" },
  play: { da: "Afspil", en: "Play" },
  pause: { da: "Pause", en: "Pause" },
  restart: { da: "Tilbage til start", en: "Back to start" },
  soundOn: { da: "Lyd til", en: "Sound on" },
  soundOff: { da: "Lyd fra", en: "Sound off" },
  openVideoFile: { da: "Åbn videofilen", en: "Open the video file" },
  loadSpotify: { da: "Indlæs Spotify-afspiller", en: "Load Spotify player" },
  spotifyNote: {
    da: "Afspilleren indlæses fra Spotify, når du trykker.",
    en: "The player loads from Spotify when you press.",
  },
  openSpotify: { da: "Åbn i Spotify", en: "Open in Spotify" },
  cookieNote: {
    da: "Ingen cookies fra os. Spotify-afspilleren på Musik-siden kan sætte cookies fra Spotify.",
    en: "No cookies from us. The Spotify player on the Music page may set cookies from Spotify.",
  },
  listenOn: { da: "Lyt hos", en: "Listen on" },
  fromStage: { da: "Fra scenen", en: "From the stage" },
  pickShow: { da: "Video fra koncerter", en: "Video from the shows" },
  newRelease: { da: "Ny udgivelse", en: "New release" },
  releases: { da: "Udgivelser", en: "Releases" },
  watch: { da: "Se bandet", en: "Watch" },
  aboutEyebrow: { da: "Om bandet", en: "About" },
  aboutTitle: {
    da: "Når maskine og menneske slår i takt",
    en: "When machine and human play to the same beat",
  },
  jazz2026: { da: "Jazz anno 2026", en: "Jazz in 2026" },
  epkLede: {
    da: "Alt materiale til presse og arrangører, samlet ét sted.",
    en: "Everything press and promoters need, in one place.",
  },
  pressPhotos: { da: "Pressefotos", en: "Press photos" },
  pressPhotosHint: {
    da: "Klik på et foto for at hente det i fuld opløsning.",
    en: "Click a photo to download it at full resolution.",
  },
  photosBy: { da: "Fotos: Joachim Ladefoged", en: "Photos: Joachim Ladefoged" },
  coverPhoto: { da: "Cover foto: Joachim Ladefoged", en: "Cover photo: Joachim Ladefoged" },
  coverDesign: { da: "Cover design: Peter Ringtved", en: "Cover design: Peter Ringtved" },
  singleNote: {
    da: "Førstesinglen Alpaca Swagger blev udvalgt til Apple Music-playlisten New Music Daily.",
    en: "The first single, Alpaca Swagger, was picked for Apple Music's New Music Daily.",
  },
  shortBio: { da: "Kort biografi", en: "Short biography" },
  press: { da: "Presse: ", en: "Press: " },
  contact: { da: "Kontakt", en: "Contact" },
  contactLede: {
    da: "Du må meget gerne sende en sms på nummeret ovenfor — eller skrive en besked til bandet på Messenger.",
    en: "You are very welcome to send a text message to the number above — or write to us on Messenger.",
  },
  sendSms: { da: "Send en sms", en: "Send a text" },
  messenger: { da: "Skriv på Messenger", en: "Message on Messenger" },
  liveCaption: {
    da: "Fra Noget Bedre Festival, Silkeborg 2026",
    en: "From Noget Bedre Festival, Silkeborg 2026",
  },
  photoCredit: { da: "Foto: Nicoline S. Hansen", en: "Photo: Nicoline S. Hansen" },
  shopLede: {
    da: "Vinylen sælges gennem Gateway Music Shop.",
    en: "The vinyl is sold through Gateway Music Shop.",
  },
  buyAtGateway: { da: "Køb vinyl hos Gateway", en: "Buy vinyl at Gateway" },
  nlTitle: { da: "Modtag nyhedsbrev", en: "Get the newsletter" },
  nlLede: {
    da: "Vi skriver kun når der er noget nyt: udgivelser, videoer og koncerter.",
    en: "We only write when there is something new: releases, videos and shows.",
  },
  notFoundTitle: { da: "Siden findes ikke", en: "Page not found" },
  notFoundLede: {
    da: "Adressen findes ikke længere, eller den er skrevet forkert.",
    en: "That address no longer exists, or it was mistyped.",
  },
  backHome: { da: "Til forsiden", en: "Back to the home page" },
  otherLang: { da: "English", en: "Dansk" },
};

const SHORT_BIO = {
  da:
    "The Heart's Electrical System er en jazz quartet skabt af komponist, pianist og producer Jacob Salmon. Elektroniske beats og improviserende musikere mødes i et musikalsk rum, hvor programmerede grooves danner fundamentet for levende samspil mellem saxofon, trompet, guitar og klaver. Albummet " +
    ALBUM.title +
    " udkom " +
    ALBUM.released.da +
    ".",
  en:
    "The Heart's Electrical System is a jazz quartet created by composer, pianist and producer Jacob Salmon. Electronic beats meet improvising musicians in a space where programmed grooves form the foundation for live interplay between saxophone, trumpet, guitar and piano. The album " +
    ALBUM.title +
    " was released " +
    ALBUM.released.en +
    ".",
};

module.exports = {
  SITE, BOOKING, SOCIALS, ALBUM, MEDIA, INTRO, MEMBERS, GUESTS,
  PULLQUOTE, REVIEWS, COPY, SHOWS, CLIPS, FILES, PRESS_PHOTOS,
  PAGES, UI, SHORT_BIO, SERVICES,
};
