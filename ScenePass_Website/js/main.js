/*
=====================================================
ScenePass Premium Landing Page
main.js
=====================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       Scroll Reveal
    ========================================== */

    const revealElements = document.querySelectorAll(
        ".feature, .feature-card, .timeline-item, .support-card, .glass-panel, .poster, .download-panel, .section-title"
    );

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

            }

        });

    }, {

        threshold: 0.15

    });

    revealElements.forEach(el => {

        el.classList.add("reveal");
        revealObserver.observe(el);

    });

    /* ==========================================
       Sticky Navbar Background
    ========================================== */

    const header = document.querySelector("header");

    function updateNavbar() {

        if (window.scrollY > 40) {

            header.style.background = "rgba(2,8,18,.82)";
            header.style.boxShadow =
                "0 10px 35px rgba(0,0,0,.35)";

        } else {

            header.style.background =
                "rgba(3,9,18,.45)";

            header.style.boxShadow = "none";

        }

    }

    window.addEventListener("scroll", updateNavbar);

    updateNavbar();

    /* ==========================================
       Hero Parallax
    ========================================== */

    const heroImage =
        document.querySelector(".hero-background img");

    window.addEventListener("scroll", () => {

        const y = window.scrollY;

        if (heroImage) {

            heroImage.style.transform =
                `translateY(${y * 0.18}px) scale(1.08)`;

        }

    });

    /* ==========================================
       Floating Mouse Glow
    ========================================== */

    const glow = document.createElement("div");

    glow.className = "mouse-glow";

    document.body.appendChild(glow);

    document.addEventListener("mousemove", e => {

        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";

    });

    /* ==========================================
       Counter Animation
    ========================================== */

    const counters =
        document.querySelectorAll(".hero-stats h2");

    counters.forEach(counter => {

        const text = counter.innerText;

        if (isNaN(text)) return;

        const target = parseInt(text);

        let current = 0;

        const speed = Math.max(12, target / 50);

        function animate() {

            current += speed;

            if (current >= target) {

                counter.innerText = target;

            } else {

                counter.innerText =
                    Math.floor(current);

                requestAnimationFrame(animate);

            }

        }

        animate();

    });

    /* ==========================================
       Feature Card Tilt
    ========================================== */

    document.querySelectorAll(".feature").forEach(card => {

        card.addEventListener("mousemove", e => {

            const rect = card.getBoundingClientRect();

            const x =
                e.clientX - rect.left;

            const y =
                e.clientY - rect.top;

            const rotateX =
                (y - rect.height / 2) / 18;

            const rotateY =
                -(x - rect.width / 2) / 18;

            card.style.transform =
                `perspective(900px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-8px)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "perspective(900px) rotateX(0) rotateY(0)";

        });

    });

    /* ==========================================
       Smooth Anchor Scroll
    ========================================== */

    document.querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener("click", function (e) {

                const target =
                    document.querySelector(this.getAttribute("href"));

                if (!target) return;

                e.preventDefault();

                window.scrollTo({

                    top: target.offsetTop - 70,

                    behavior: "smooth"

                });

            });

        });

    /* ==========================================
       Active Navigation
    ========================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(".navbar a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 120;

            if (window.scrollY >= top) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    });

    /* ==========================================
       Poster Hover Zoom
    ========================================== */

    document.querySelectorAll(".poster img")
        .forEach(img => {

            img.addEventListener("mousemove", e => {

                const rect = img.getBoundingClientRect();

                const x =
                    ((e.clientX - rect.left) / rect.width) * 100;

                const y =
                    ((e.clientY - rect.top) / rect.height) * 100;

                img.style.transformOrigin =
                    `${x}% ${y}%`;

            });

        });

    /* ==========================================
       Random Star Twinkle
    ========================================== */

    const stars =
        document.querySelector(".stars");

    if (stars) {

        setInterval(() => {

            stars.style.opacity =
                0.10 + Math.random() * 0.10;

        }, 1800);

    }

    /* ==========================================
       Theme Picker (App Themes — total customization)
    ========================================== */

    const THEMES = [
        { blue: "#32C8FF", orange: "#FF981E" },
        { blue: "#FF6B35", orange: "#FFD23F" },
        { blue: "#A855F7", orange: "#EC4899" },
        { blue: "#10B981", orange: "#22D3EE" }
    ];

    function hexToRgb(hex) {

        const n = parseInt(hex.replace("#", ""), 16);

        return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;

    }

    function setTheme(index, persist = true) {

        const theme = THEMES[index] || THEMES[0];
        const root = document.documentElement;

        root.style.setProperty("--blue", theme.blue);
        root.style.setProperty("--orange", theme.orange);
        root.style.setProperty("--blue-rgb", hexToRgb(theme.blue));
        root.style.setProperty("--orange-rgb", hexToRgb(theme.orange));

        document.querySelectorAll(".theme-swatch").forEach(sw => {

            sw.classList.toggle(
                "is-active",
                Number(sw.dataset.themeIndex) === index
            );

        });

        if (persist) {

            localStorage.setItem("scenepass_theme", String(index));

        }

    }

    document.querySelectorAll(".theme-swatch").forEach(sw => {

        sw.addEventListener("click", () => {

            setTheme(Number(sw.dataset.themeIndex));

        });

    });

    const savedTheme = parseInt(
        localStorage.getItem("scenepass_theme"),
        10
    );

    setTheme(isNaN(savedTheme) ? 0 : savedTheme, false);

    /* ==========================================
       Language Switch (Localization — en / es)
    ========================================== */

    const I18N = {

        en: {
            navNew: "What's New", navFeatures: "Features", navHow: "How It Works",
            navDownload: "Download", navSupport: "Support",
            heroTag: "Audio Fingerprinting • Monitor • Scheduler • Family Share • Remote",
            heroHeadA: "Skip the Intro & Recap.",
            heroHeadB: "Now It Watches Your Whole Household.",
            heroBody: "ScenePass finds intros and recaps automatically, then keeps working after the scan: watching for new episodes, running on a schedule, sharing profiles with your family, and following you to your phone.",
            primaryBtn: "Download Latest Release", secondaryBtn: "See What's New",
            statPortable: "Local", statFeatures: "Major Features", statLang: "Languages", statMod: "Video Modification",
            newTag: "New In This Release", newTitle: "Six ways ScenePass got bigger",
            newBody: "Everything below runs locally, right alongside the detection engine you already trust.",
            monitorTitle: "Background Monitor",
            monitorBody: "Watches your mounted libraries from the system tray and scans new episodes automatically the moment they land — no manual re-scan.",
            schedTitle: "Scheduled Scans",
            schedBody: "Set a nightly or weekly window and ScenePass runs quietly in the background, so scans never compete with the TV you're actually watching.",
            familyTitle: "Family Share",
            familyBody: "Give everyone in the house their own profile. Held, unconfirmed results stay read-only for family members — only you confirm a boundary.",
            remoteTitle: "Mobile Remote",
            remoteBody: "Control ScenePass from your phone: check scan status, browse the held queue, and skip intros from the couch.",
            themeTitle: "App Themes",
            themeBody: "Total color customization — pick an accent, and every panel, glow, and button follows. Try it on this page.",
            localeTitle: "Localization",
            localeBody: "The full app interface in English or Spanish today, with more languages on the way. Flip the switch below.",
            tryTheme: "Try a theme", tryLang: "Try a language",
            howTag: "Pipeline", howTitle: "One pass through the library, six stages",
            step1: "01 · Mount", step1b: "Point ScenePass at a folder of shows. It reads the tree once and remembers it.",
            step2: "02 · Scan", step2b: "The Consensus intro engine fingerprints audio across a season; a three-lane pipeline (subtitles → Whisper → OCR) catches recap cues.",
            step3: "03 · Review", step3b: "Every result lands in a confidence tier — confident-deploy or verify-hold — so you know what to trust and what to eyeball.",
            step4: "04 · Export", step4b: "Markers are written as sidecar files in whatever format your player reads. Your video files are never touched.",
            step5: "05 · Monitor & Schedule", step5b: "A background watcher and an optional nightly window keep the library current without you lifting a finger.",
            step6: "06 · Share & Remote", step6b: "Family profiles and a mobile remote bring the results to everyone in the house.",
            dlTag: "Get Started", dlTitle: "Ready to skip the intro?",
            dlBody: "Download the latest installer, run it, and point ScenePass at your library. No account, no cloud upload — everything runs on your machine.",
            kodiKicker: "Companion add-on · Kodi 19+", kodiTitle: "Watch in Kodi? Get the skip button.",
            kodiBody: "The free ScenePass service add-on reads the markers this app writes and puts a Skip Intro / Skip Recap button on screen at exactly the right second.",
            kodiCta: "Get the Kodi add-on",
            footTagline: "Local-first TV intelligence."
        },

        es: {
            navNew: "Novedades", navFeatures: "Funciones", navHow: "Cómo Funciona",
            navDownload: "Descargar", navSupport: "Soporte",
            heroTag: "Huella de Audio • Monitor • Programador • Compartir en Familia • Remoto",
            heroHeadA: "Omite la Intro y el Resumen.",
            heroHeadB: "Ahora Vigila la Biblioteca de Toda tu Familia.",
            heroBody: "ScenePass detecta intros y resúmenes automáticamente, y luego sigue trabajando: vigila episodios nuevos, se ejecuta en un horario, comparte perfiles con tu hogar y te sigue hasta tu teléfono.",
            primaryBtn: "Descargar Última Versión", secondaryBtn: "Ver Novedades",
            statPortable: "Local", statFeatures: "Funciones Nuevas", statLang: "Idiomas", statMod: "Modificación de Video",
            newTag: "Nuevo en Esta Versión", newTitle: "Seis formas en que ScenePass creció",
            newBody: "Todo esto funciona localmente, junto al mismo motor de detección en el que ya confías.",
            monitorTitle: "Monitor en Segundo Plano",
            monitorBody: "Vigila tus bibliotecas montadas desde la bandeja del sistema y escanea episodios nuevos automáticamente al llegar — sin re-escaneo manual.",
            schedTitle: "Escaneos Programados",
            schedBody: "Define una ventana nocturna o semanal y ScenePass se ejecuta discretamente en segundo plano, sin competir con lo que estás viendo.",
            familyTitle: "Compartir en Familia",
            familyBody: "Dale a cada persona en casa su propio perfil. Los resultados retenidos quedan de solo lectura para la familia — solo tú puedes confirmar un límite.",
            remoteTitle: "Control Remoto Móvil",
            remoteBody: "Controla ScenePass desde tu teléfono: revisa el estado del escaneo, la cola retenida, y omite intros desde el sofá.",
            themeTitle: "Temas de la App",
            themeBody: "Personalización total de color — elige un acento y cada panel, brillo y botón lo sigue. Pruébalo en esta página.",
            localeTitle: "Localización",
            localeBody: "La interfaz completa en inglés o español hoy, con más idiomas en camino. Cambia el interruptor abajo.",
            tryTheme: "Prueba un tema", tryLang: "Prueba un idioma",
            howTag: "Proceso", howTitle: "Un recorrido por la biblioteca, seis etapas",
            step1: "01 · Montar", step1b: "Apunta ScenePass a una carpeta de series. Lee el árbol una vez y lo recuerda.",
            step2: "02 · Escanear", step2b: "La huella de audio y un flujo de tres vías detectan intros y resúmenes.",
            step3: "03 · Revisar", step3b: "Cada resultado cae en un nivel de confianza, para saber qué confiar y qué revisar.",
            step4: "04 · Exportar", step4b: "Los marcadores se escriben como archivos anexos. Tus videos nunca se tocan.",
            step5: "05 · Monitorear y Programar", step5b: "Un vigilante en segundo plano y una ventana nocturna opcional mantienen la biblioteca al día sin esfuerzo.",
            step6: "06 · Compartir y Control Remoto", step6b: "Los perfiles familiares y un control remoto móvil llevan los resultados a toda la casa.",
            dlTag: "Comenzar", dlTitle: "¿Listo para omitir la intro?",
            dlBody: "Descarga el instalador más reciente, ejecútalo y apunta ScenePass a tu biblioteca. Sin cuenta, sin subida a la nube — todo corre en tu máquina.",
            kodiKicker: "Complemento compañero · Kodi 19+", kodiTitle: "¿Ves tus series en Kodi? Consigue el botón para omitir.",
            kodiBody: "El complemento de servicio gratuito de ScenePass lee los marcadores que escribe esta app y muestra un botón Omitir Intro / Omitir Resumen en pantalla justo en el segundo exacto.",
            kodiCta: "Obtener el complemento de Kodi",
            footTagline: "Inteligencia de TV, local ante todo."
        }

    };

    function applyLanguage(lang, persist = true) {

        const dict = I18N[lang] || I18N.en;

        document.querySelectorAll("[data-i18n]").forEach(el => {

            const key = el.getAttribute("data-i18n");

            if (dict[key] !== undefined) {

                el.textContent = dict[key];

            }

        });

        document.documentElement.lang = lang;

        document.querySelectorAll(".lang-chip").forEach(chip => {

            chip.classList.toggle("is-active", chip.dataset.lang === lang);

        });

        if (persist) {

            localStorage.setItem("scenepass_lang", lang);

        }

    }

    document.querySelectorAll(".lang-chip").forEach(chip => {

        chip.addEventListener("click", () => {

            applyLanguage(chip.dataset.lang);

        });

    });

    const savedLang = localStorage.getItem("scenepass_lang");

    applyLanguage(savedLang === "es" ? "es" : "en", false);

});

/*
=====================================================
Mouse Glow Styling
=====================================================
*/

const glowStyle = document.createElement("style");

glowStyle.innerHTML = `

.mouse-glow{

position:fixed;

width:220px;

height:220px;

background:

radial-gradient(circle,

rgba(var(--blue-rgb),.16),

transparent 70%);

pointer-events:none;

border-radius:50%;

transform:translate(-50%,-50%);

filter:blur(35px);

z-index:-1;

transition:left .06s linear,
top .06s linear;

}

.navbar a.active{

color:var(--blue);

}

`;

document.head.appendChild(glowStyle);