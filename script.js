// Menú Responsivo
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Cerrar menú al hacer click en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Gráfico Canvas para Usuarios
function drawBarChart(canvasId, data, labels) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    canvas.width = width;
    canvas.height = height;

    const barWidth = width / (data.length * 1.5);
    const maxValue = Math.max(...data);
    const scaling = (height - 40) / maxValue;

    // Dibujar barras
    data.forEach((value, index) => {
        const x = index * (width / data.length) + barWidth;
        const barHeight = value * scaling;
        const y = height - 30 - barHeight;

        // Gradiente
        const gradient = ctx.createLinearGradient(0, y, 0, height - 30);
        gradient.addColorStop(0, '#6366f1');
        gradient.addColorStop(1, '#ec4899');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, barHeight);

        // Texto
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(value + 'K', x + barWidth / 2, height - 10);
    });

    // Línea base
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, height - 30);
    ctx.lineTo(width, height - 30);
    ctx.stroke();
}

// Gráfico Canvas para Líneas (Proyectos)
function drawLineChart(canvasId, data, labels) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    canvas.width = width;
    canvas.height = height;

    const padding = 40;
    const graphHeight = height - padding * 1.5;
    const graphWidth = width - padding * 2;

    const maxValue = Math.max(...data);
    const step = graphWidth / (data.length - 1);

    // Dibujar grid
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = padding + (graphHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }

    // Dibujar línea
    ctx.strokeStyle = '#14b8a6';
    ctx.lineWidth = 3;
    ctx.beginPath();

    data.forEach((value, index) => {
        const x = padding + index * step;
        const y = height - padding - (value / maxValue) * graphHeight;

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();

    // Dibujar puntos
    data.forEach((value, index) => {
        const x = padding + index * step;
        const y = height - padding - (value / maxValue) * graphHeight;

        ctx.fillStyle = '#14b8a6';
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();

        // Valor
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(value + 'K', x, y - 15);
    });
}

// Datos para gráficos
const usuariosData = [5, 12, 25, 35, 42, 50];
const usuariosLabels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];

const proyectosData = [10, 25, 40, 55, 80, 150];
const proyectosLabels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];

// Dibujar gráficos al cargar
setTimeout(() => {
    drawBarChart('chartUsuarios', usuariosData, usuariosLabels);
    drawLineChart('chartProyectos', proyectosData, proyectosLabels);
}, 100);

// Re-dibujar gráficos al redimensionar
window.addEventListener('resize', () => {
    drawBarChart('chartUsuarios', usuariosData, usuariosLabels);
    drawLineChart('chartProyectos', proyectosData, proyectosLabels);
});

// Filtrado de Planes
const filterButtons = document.querySelectorAll('.filter-btn');
const planCards = document.querySelectorAll('.plan-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Actualizar botón activo
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        // Filtrar planes
        planCards.forEach(card => {
            const category = card.getAttribute('data-category');

            if (filterValue === 'all' || category === filterValue) {
                card.classList.add('visible');
            } else {
                card.classList.remove('visible');
            }
        });
    });
});

// Mostrar todos al iniciar
planCards.forEach(card => card.classList.add('visible'));

// Formulario de Contacto
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Mostrar mensaje de éxito
    const inputs = contactForm.querySelectorAll('input, textarea');
    const successMsg = document.createElement('div');
    successMsg.textContent = '✓ Mensaje enviado exitosamente';
    successMsg.style.cssText = `
        background: #22c55e;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        margin-top: 1rem;
        text-align: center;
        font-weight: 600;
    `;

    contactForm.appendChild(successMsg);

    // Limpiar inputs
    inputs.forEach(input => input.value = '');

    // Remover mensaje después de 3 segundos
    setTimeout(() => {
        successMsg.remove();
    }, 3000);
});

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});