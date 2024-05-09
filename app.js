// Set up canvas
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Particle class
class Particle {
    constructor(x, y, radius, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocity = velocity;
    }

    // Draw particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text');
        ctx.fill();
    }

    // Update particle position
    update(particles) {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // Connect nearby particles with lines
        particles.forEach(particle => {
            const distance = Math.sqrt((this.x - particle.x) ** 2 + (this.y - particle.y) ** 2);
            if (distance < 100 && particle !== this) { // Adjust this value to control the connection distance
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(particle.x, particle.y);
                ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--text');
                ctx.lineWidth = 1 - distance / 100; // Thicker lines for closer particles
                ctx.stroke();
            }
        });

        // Handle canvas boundaries
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.velocity.x = -this.velocity.x;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.velocity.y = -this.velocity.y;
        }
    }
}

// Generate random number within a range
function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

// Create particles
const particles = [];
const numParticles = 180;

for (let i = 0; i < numParticles; i++) {
    const radius = randomRange(1, 3);
    const x = randomRange(radius, canvas.width - radius);
    const y = randomRange(radius, canvas.height - radius);
    const velocity = {
        x: randomRange(-2, 2),
        y: randomRange(-2, 2)
    };

    particles.push(new Particle(x, y, radius, velocity));
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update(particles);
    });
}

// Start animation
animate();

// Adjust canvas size on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
