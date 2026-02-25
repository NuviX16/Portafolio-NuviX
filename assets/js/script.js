// ==========================================
// 1. SISTEMA DE TRADUCCIÓN (i18n)
// ==========================================

const translations = {
    es: {
        hero_role: "Full Stack Developer",
        hero_subtitle: "Estudiante de TSU en Desarrollo de Software Multiplataforma",
        btn_projects: "Ver proyectos",
        btn_contact: "Contactar",
        about_title: "Sobre mí",
        about_text: "Soy un estudiante con enfoque Full Stack. Trabajo con HTML, CSS, PHP y MySQL, y actualmente refuerzo mis conocimientos en JavaScript. Me interesa crear aplicaciones web funcionales y orientadas a resolver problemas reales.",
        skills_title: "Habilidades & Tecnologías",
        skills_frontend: "Frontend",
        skills_backend: "Backend",
        skills_db: "Base de Datos",
        skills_tools: "Herramientas",
        projects_title: "Mis Proyectos",
        proj1_title: "Página Institucional",
        proj1_desc: "Sitio web institucional con diseño responsivo, animaciones suaves y estructura profesional.",
        status_dev: "En desarrollo",
        proj2_title: "To Do List App",
        proj2_desc: "Aplicación interactiva para gestión de tareas diarias con persistencia de datos.",
        status_plan: "Planeado",
        proj3_title: "Sistema CRUD Completo",
        proj3_desc: "Aplicación web robusta para gestión de usuarios y registros (Crear, Leer, Actualizar, Borrar).",
        contact_title: "Trabajemos Juntos",
        contact_form_title: "Envíame un mensaje",
        label_name: "Nombre",
        ph_name: "Tu nombre",
        label_email: "Email",
        ph_email: "tu@email.com",
        label_message: "Mensaje",
        ph_message: "Escribe tu mensaje aquí...",
        btn_send: "Enviar Mensaje",
        contact_p1: "Me encanta trabajar en equipo, aprender cosas nuevas todos los días y siempre estoy abierto a integrarme a proyectos creativos.",
        contact_p2: "Ya sea que busques un desarrollador dispuesto a crecer junto a tu equipo o tengas una idea específica en mente, ¡me encantaría conectar!",
        service_1: "• Desarrollo Web & Móvil",
        service_2: "• Diseño UI/UX",
        service_3: "• Consultoría Técnica",
        social_title: "Mis Redes",
        footer_copy: "© 2026 Brandon Hernandez. Todos los derechos reservados."
    },
    en: {
        hero_role: "Full Stack Developer",
        hero_subtitle: "TSU Student in Multiplatform Software Development",
        btn_projects: "View Projects",
        btn_contact: "Contact Me",
        about_title: "About Me",
        about_text: "I am a student with a Full Stack focus. I work with HTML, CSS, PHP, and MySQL, and I am currently strengthening my JavaScript skills. I am interested in creating functional web applications aimed at solving real problems.",
        skills_title: "Skills & Technologies",
        skills_frontend: "Frontend",
        skills_backend: "Backend",
        skills_db: "Database",
        skills_tools: "Tools",
        projects_title: "My Projects",
        proj1_title: "Institutional Page",
        proj1_desc: "Institutional website with a responsive design, smooth animations, and a professional structure.",
        status_dev: "In Development",
        proj2_title: "To Do List App",
        proj2_desc: "Interactive application for daily task management with data persistence.",
        status_plan: "Planned",
        proj3_title: "Complete CRUD System",
        proj3_desc: "Robust web application for user and record management (Create, Read, Update, Delete).",
        contact_title: "Let's Work Together",
        contact_form_title: "Send me a message",
        label_name: "Name",
        ph_name: "Your name",
        label_email: "Email",
        ph_email: "you@email.com",
        label_message: "Message",
        ph_message: "Write your message here...",
        btn_send: "Send Message",
        contact_p1: "I love working in a team, learning new things every day, and I'm always open to joining creative projects.",
        contact_p2: "Whether you're looking for a developer eager to grow alongside your team or have a specific idea in mind, I'd love to connect!",
        service_1: "• Web & Mobile Development",
        service_2: "• UI/UX Design",
        service_3: "• Technical Consulting",
        social_title: "My Socials",
        footer_copy: "© 2026 Brandon Hernandez. All rights reserved."
    }
};

const langBtn = document.getElementById('lang-btn');
let currentLang = 'es';

langBtn.addEventListener('click', () => {
    // Alternar idioma
    currentLang = currentLang === 'es' ? 'en' : 'es';
    langBtn.innerText = currentLang === 'es' ? 'EN' : 'ES';

    // Traducir todos los elementos
    const elementsToTranslate = document.querySelectorAll('[data-i18n]');
    
    elementsToTranslate.forEach(element => {
        const key = element.getAttribute('data-i18n');
        
        if (translations[currentLang][key]) {
            // Si es un input o textarea, cambia el placeholder
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[currentLang][key];
            } else {
                element.innerText = translations[currentLang][key];
            }
        }
    });
});


// ==========================================
// 2. FONDO ANIMADO DE NIEVE (CANVAS)
// ==========================================

const canvas = document.getElementById('snow-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;
const numberOfParticles = 150; 

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5; 
        this.speedX = Math.random() * 1 - 0.5; 
        this.speedY = Math.random() * 1.5 + 0.5; 
        
        const opacity = Math.random() * 0.5 + 0.2;
        this.color = `rgba(255, 255, 255, ${opacity})`; 
    }
    
    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        
        if (this.y > canvas.height) {
            this.y = 0 - this.size;
            this.x = Math.random() * canvas.width;
        }
        if (this.x > canvas.width) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = canvas.width;
        }
    }
    
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
}

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init(); 
});

init();
animate();