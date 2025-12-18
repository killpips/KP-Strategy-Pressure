// Canvas Animation - Matrix/Stock Chart Effect
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

class Line {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.color = Math.random() > 0.5 ? '#00ff9d' : '#ff0055';
        this.alpha = Math.random() * 0.5;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

const lines = Array.from({ length: 50 }, () => new Line());

function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines
    lines.forEach((line, i) => {
        line.update();
        line.draw();

        lines.slice(i + 1).forEach(other => {
            const dx = line.x - other.x;
            const dy = line.y - other.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 150) {
                ctx.beginPath();
                ctx.moveTo(line.x, line.y);
                ctx.lineTo(other.x, other.y);
                ctx.strokeStyle = line.color;
                ctx.globalAlpha = 1 - dist / 150;
                ctx.stroke();
                ctx.globalAlpha = 1;
            }
        });
    });

    requestAnimationFrame(animate);
}

animate();

// Ticker Data Generation
const tickerContainer = document.querySelector('.ticker');
const symbols = ['NQ', 'ES', 'YM', 'RTY', 'GC', 'CL', 'BTC', 'ETH'];

function generateTickerItem() {
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    const price = (Math.random() * 10000).toFixed(2);
    const change = (Math.random() * 100 - 50).toFixed(2);
    const isUp = change > 0;

    return `<div class="ticker-item ${isUp ? 'up' : 'down'}">
        ${symbol}: ${price} <span style="font-size: 0.8em">(${isUp ? '+' : ''}${change}%)</span>
    </div>`;
}

// Fill ticker
let tickerContent = '';
for (let i = 0; i < 20; i++) {
    tickerContent += generateTickerItem();
}
tickerContainer.innerHTML = tickerContent + tickerContent; // Duplicate for seamless loop

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
