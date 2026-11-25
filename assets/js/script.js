// ==========================================
// 1. Temas: las mismas paletas de mi escritorio (Serpantinum / Hyprland)
// ==========================================
const THEMES = {
    "Reze Bomb Devil":  { bg: "#0c070e", bg2: "#1a1020", bg3: "#26182e", text: "#f0e4ee", muted: "#b8a4b8", accent: "#a96bd8", accent2: "#c48fe0", accent3: "#e3a6c4", ok: "#5fe08a", warm: "#d99a8c" },
    "Rei Winter":       { bg: "#11131a", bg2: "#1b1f2a", bg3: "#262b39", text: "#e8ecf4", muted: "#a9b0c2", accent: "#a8c4ec", accent2: "#b9b8e0", accent3: "#e89aa6", ok: "#a9cfc4", warm: "#e8b4a8" },
    "Persona 3 Reload": { bg: "#0b1024", bg2: "#162142", bg3: "#1f2d55", text: "#e3f1f8", muted: "#a3bcd0", accent: "#34b1d0", accent2: "#8fa8ff", accent3: "#f08fb0", ok: "#5fd4b8", warm: "#f59e7a" },
    "Arlecchino":       { bg: "#121013", bg2: "#1f1b1f", bg3: "#2c262b", text: "#eceef1", muted: "#b7bcc4", accent: "#e5484d", accent2: "#d9dde3", accent3: "#f4a3a8", ok: "#c9ced6", warm: "#ff8a65" },
    "Reze Sunset":      { bg: "#100e0c", bg2: "#1e1a16", bg3: "#2a241f", text: "#efe4d4", muted: "#bcae9e", accent: "#e0a57a", accent2: "#c9a7c4", accent3: "#e8b4b0", ok: "#8fcfaa", warm: "#f0b48a" },
    "Reze Crazy Smile": { bg: "#061620", bg2: "#0d2533", bg3: "#133447", text: "#f6ebec", muted: "#a9bcc6", accent: "#c99be8", accent2: "#9c7fd8", accent3: "#e8a8d0", ok: "#8fe08a", warm: "#e8a07a" },
    "Rei Ayanami":      { bg: "#170e0e", bg2: "#261716", bg3: "#33201f", text: "#f2e2de", muted: "#c4aaa6", accent: "#c7a5e0", accent2: "#d2b0e8", accent3: "#f0b8c8", ok: "#b8d4c0", warm: "#e6a9a1" },
    "Event Horizon":    { bg: "#09090b", bg2: "#17181b", bg3: "#232429", text: "#e6e9ef", muted: "#a9b0bd", accent: "#b6c2d4", accent2: "#c3bcd8", accent3: "#d8b9c9", ok: "#a9c4b4", warm: "#d8c7a8" },
};
const DEFAULT_THEME = "Reze Bomb Devil";
const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* modo privado: no pasa nada */ } },
};
const rgb = hex => [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16)).join(", ");
let starColors = ["255,255,255"];

function applyTheme(name) {
    const t = THEMES[name] || THEMES[DEFAULT_THEME];
    if (!THEMES[name]) name = DEFAULT_THEME;
    const r = document.documentElement.style;
    r.setProperty("--bg", t.bg); r.setProperty("--bg-2", t.bg2); r.setProperty("--bg-3", t.bg3);
    r.setProperty("--text", t.text); r.setProperty("--muted", t.muted);
    r.setProperty("--accent", t.accent); r.setProperty("--accent-2", t.accent2); r.setProperty("--accent-3", t.accent3);
    r.setProperty("--ok", t.ok); r.setProperty("--warm", t.warm);
    r.setProperty("--rgb-accent", rgb(t.accent)); r.setProperty("--rgb-accent-3", rgb(t.accent3));
    r.setProperty("--card", `rgba(${rgb(t.bg2)}, 0.62)`);
    document.querySelector('meta[name="theme-color"]').content = t.bg;
    starColors = ["255,255,255", rgb(t.accent), rgb(t.accent2), rgb(t.accent3)];
    stars.forEach(s => s.c = pickColor());
    document.getElementById("theme-name").textContent = name;
    document.querySelectorAll("[data-theme]").forEach(el => {
        const on = el.dataset.theme === name;
        el.setAttribute(el.classList.contains("swatch") ? "aria-pressed" : "aria-checked", on);
    });
    store.set("theme", name);
}

function buildThemeUI() {
    const list = document.getElementById("theme-list");
    const sw = document.getElementById("swatches");
    for (const [name, t] of Object.entries(THEMES)) {
        const opt = document.createElement("button");
        opt.className = "theme-opt"; opt.setAttribute("role", "menuitemradio"); opt.dataset.theme = name;
        opt.innerHTML = `<span class="dots">${[t.accent, t.accent2, t.accent3].map(c => `<i style="background:${c}"></i>`).join("")}</span>`;
        opt.append(document.createTextNode(name));
        opt.insertAdjacentHTML("beforeend", '<i class="fa-solid fa-check check"></i>');
        opt.addEventListener("click", () => { applyTheme(name); closeMenu(); });
        list.append(opt);

        const b = document.createElement("button");
        b.className = "swatch"; b.dataset.theme = name; b.title = name; b.setAttribute("aria-label", name);
        b.style.background = `linear-gradient(135deg, ${t.accent} 0 50%, ${t.accent3} 50% 100%)`;
        b.addEventListener("click", () => applyTheme(name));
        sw.append(b);
    }
}

const themeBtn = document.getElementById("theme-btn");
const themeMenu = document.getElementById("theme-menu");
function closeMenu() { themeMenu.hidden = true; themeBtn.setAttribute("aria-expanded", "false"); }
themeBtn.addEventListener("click", e => {
    e.stopPropagation();
    themeMenu.hidden = !themeMenu.hidden;
    themeBtn.setAttribute("aria-expanded", String(!themeMenu.hidden));
});
document.addEventListener("click", e => { if (!themeMenu.hidden && !themeMenu.contains(e.target)) closeMenu(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(); });

// ==========================================
// 2. Idioma (ES / EN): el español se toma del HTML, aquí solo va el inglés
// ==========================================
const EN = {
    nav_about: "About", nav_projects: "Projects", nav_awards: "Awards", nav_stack: "Stack", nav_contact: "Contact",
    theme_title: "My desktop themes",
    hero_hi: "Hi, I'm Brandon · Nuvi",
    hero_role_a: "Full Stack", hero_role_b: "Developer",
    hero_subtitle: "I build systems people actually use: from talking with the client to the database, the server and the interface.",
    hero_award: "Honorable mention · NASA Space Apps Challenge 2026",
    btn_projects: "See projects", btn_contact: "Contact me",
    about_title: "Code with a purpose",
    about_text: "I hold an associate degree (TSU) in Multiplatform Software Development and I'm now studying Information Technology and Digital Innovation Engineering at UT de Nayarit. I like taking projects all the way to production and seeing people actually use them.",
    about_text2: "I work with JavaScript, Node.js, Python and PostgreSQL, and deploy on Linux and Google Cloud. Outside of class I turned my Arch Linux into a desktop that changes its theme with the wallpaper, and I run a Discord bot 24/7 in the cloud.",
    fact1_t: "Associate in Software Development", fact1_d: "UT de Nayarit · graduated 2026",
    fact2_t: "ITID Engineering", fact2_d: "Information Technology and Digital Innovation · in progress",
    fact3_d: "\"Local Impact\" honorable mention with team Gravizen",
    fact4_d: "Daily driver: Hyprland, terminal and automation",
    projects_title: "What I've built",
    st_dev: "In development · professional internship",
    p1_title: "Workshop system",
    p1_desc: "System for a suspension workshop in Tepic: inventory, work orders, credit sales, warranties and finances for the owner. Works on phones and on the counter PC, online and offline.",
    case_problem: "The problem", case_decisions: "The decisions", case_process: "The process",
    p1_problem: "Orders are written on paper notes, prices from five suppliers change every month and the WiFi drops for up to 4 hours in the rainy season.",
    p1_d1: "Installable web app (PWA) that works offline and syncs later",
    p1_d2: "Inventory as movements: quantities are never edited, everything keeps a history",
    p1_d3: "Price = factory cost + margin, recalculated when a supplier changes prices",
    p1_d4: "Nothing is deleted: it's cancelled with a reason, because money is involved",
    p1_process: "Requirements gathering with the workshop's management (32 questions), requirements, data model, architecture and a 5-phase plan with Scrum.",
    st_live247: "In production · 24/7", st_live: "In production", st_daily: "Daily use", st_school: "University project",
    p2_title: "NuviX Bot",
    p2_desc: "Python Discord bot that lives on a Google Cloud VM and talks to an agent on my laptop.",
    p2_h1: "Personal agenda with a daily summary, weather and phone alerts",
    p2_h2: "Anime, manga and game-deal tracking with public APIs",
    p2_h3: "Levels, economy, tickets, polls and automatic moderation",
    p2_h4: "Private web dashboard and monitoring with Uptime Kuma",
    p3_title: "NuviX Desktop",
    p3_desc: "Arch Linux with Hyprland: the animated wallpaper decides the colors of the whole system, from the terminal and browser to Discord, Spotify and the login screen.",
    p3_hint: "Tap a color: this page uses the same palettes.",
    link_page: "See page",
    st_award: "Honorable mention · NASA",
    p7_desc: "Health dashboard for the crew of a space mission, built at the NASA Space Apps Challenge 2026 with team Gravizen.",
    p7_h1: "Daily check-in for each crew member: mood, sleep and symptoms",
    p7_h2: "Trends and autonomous alerts for the mission's hazards",
    p7_h3: "Link with Earth and a transmission log",
    p7_h4: "Tells real NASA data apart from simulated data",
    tag_nasa: "NASA open data",
    p4_title: "Muelles Tepic · Inventory",
    p4_desc: "First version of the workshop's inventory system: products, stock and movements, used by the business every day.",
    p5_desc: "Pre-orders, pickup and seating for campus cafeterias: order ahead, choose a pickup time and save a seat. Customer, kitchen and admin update in real time.",
    p6_title: "Lab monitoring",
    p6_desc: "Arduino node with temperature, humidity and light sensors. With 1,440 readings I trained SVM and KNN models that detect out-of-range conditions with up to 100% accuracy.",
    awards_title: "Awards and certifications",
    cert1_kind: "Honorable mention · 2026", cert1_desc: "\"Local Impact\" category with team Gravizen.",
    cert2_kind: "Participation · Nov 14–15, 2026", cert2_desc: "NASA recognition for tackling challenges on Earth and in space.",
    cert3_title: "Network addressing and basic troubleshooting",
    cert4: "ECO0305 · Customer service · Instituto de Capacitación para el Trabajo (2024)",
    skills_title: "What I work with",
    skills_frontend: "Frontend", skills_backend: "Backend", skills_data: "Data", skills_infra: "Infrastructure", skills_tools: "Tools",
    contact_title: "Let's work", contact_title2: "together",
    contact_p: "Got a project, a job opening or an idea? Write me and let's talk.",
    footer_copy: "handmade with",
};
const ES = {};
document.querySelectorAll("[data-i18n]").forEach(el => { ES[el.dataset.i18n] ??= el.textContent; });

const langBtn = document.getElementById("lang-btn");
function setLang(lang) {
    const dict = lang === "en" ? EN : ES;
    document.documentElement.lang = lang;
    langBtn.textContent = lang === "es" ? "EN" : "ES";
    langBtn.setAttribute("aria-label", lang === "es" ? "Change language to English" : "Cambiar idioma a español");
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const t = dict[el.dataset.i18n];
        if (t) el.textContent = t;
    });
    store.set("lang", lang);
}
langBtn.addEventListener("click", () => setLang(document.documentElement.lang === "es" ? "en" : "es"));

// ==========================================
// 3. Aparición al hacer scroll
// ==========================================
const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// ==========================================
// 4. Cielo de estrellas (titilan, siguen al mouse y a veces cae una fugaz), con los colores del tema
// ==========================================
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let W, H, DPR, stars = [], shooting = null, mx = 0, my = 0;
const pickColor = () => starColors[Math.random() < 0.78 ? 0 : 1 + Math.floor(Math.random() * (starColors.length - 1))];

function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * DPR; canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    stars = Array.from({ length: Math.round(W * H / 5200) }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.3 + 0.2, z: Math.random() * 0.8 + 0.2, c: pickColor(),
        p: Math.random() * Math.PI * 2, s: Math.random() * 0.02 + 0.005,
    }));
}

function frame() {
    ctx.clearRect(0, 0, W, H);
    for (const st of stars) {
        st.p += st.s;
        const a = 0.35 + Math.sin(st.p) * 0.35 + 0.3 * st.z;
        const x = st.x + mx * st.z * 14, y = st.y + my * st.z * 14 - (window.scrollY * st.z * 0.05) % H;
        ctx.beginPath();
        ctx.arc(x, (y + H) % H, st.r * st.z + 0.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${st.c},${Math.max(0.05, Math.min(1, a))})`;
        ctx.fill();
    }
    if (!reduce && !shooting && Math.random() < 0.004) {
        shooting = { x: Math.random() * W * 0.7 + W * 0.2, y: Math.random() * H * 0.4, l: 0, v: 9 + Math.random() * 6 };
    }
    if (shooting) {
        const s = shooting; s.l += s.v;
        const x = s.x - s.l, y = s.y + s.l * 0.45;
        const g = ctx.createLinearGradient(x, y, x + 90, y - 40);
        g.addColorStop(0, "rgba(255,255,255,0.9)"); g.addColorStop(1, `rgba(${starColors[3] || starColors[0]},0)`);
        ctx.strokeStyle = g; ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 90, y - 40); ctx.stroke();
        if (s.l > W * 0.6) shooting = null;
    }
    if (!reduce) requestAnimationFrame(frame);
}
window.addEventListener("resize", () => { resize(); if (reduce) frame(); });
window.addEventListener("mousemove", e => { mx = e.clientX / W - 0.5; my = e.clientY / H - 0.5; });

// ==========================================
// 5. Arranque
// ==========================================
resize();
buildThemeUI();
applyTheme(store.get("theme") || DEFAULT_THEME);
const savedLang = store.get("lang");
if ((savedLang || ((navigator.language || "es").startsWith("es") ? "es" : "en")) === "en") setLang("en");
frame();
if (reduce) {
    // sin animación, el cielo se pinta una vez y se repinta al cambiar de tema
    document.querySelectorAll("[data-theme]").forEach(b => b.addEventListener("click", () => frame()));
}
