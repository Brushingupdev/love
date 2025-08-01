let hearts = [];
let score = 0;
let messages = [
    "Eres mi razón para sonreír cada día.",
    "Contigo, cada momento es una aventura.",
    "Tu risa es mi melodía favorita.",
    "Gracias por ser mi todo, siempre.",
    "Te amo más de lo que las palabras pueden decir."
];

function setup() {
    let canvas = createCanvas(400, 384);
    canvas.parent('game-container');
    textAlign(CENTER, CENTER);
    textSize(16);
}

function draw() {
    background(255, 245, 247);
    fill(233, 30, 99);
    text(`Corazones atrapados: ${score}`, width / 2, 30);
    
    for (let i = hearts.length - 1; i >= 0; i--) {
        let heart = hearts[i];
        heart.y += heart.speed;
        drawHeart(heart.x, heart.y, heart.size);
        
        if (heart.y > height + heart.size) {
            hearts.splice(i, 1);
        }
    }

    if (frameCount % 60 === 0 && hearts.length < 5) {
        hearts.push({
            x: random(width),
            y: -20,
            size: random(20, 40),
            speed: random(2, 5)
        });
    }
}

function drawHeart(x, y, size) {
    fill(233, 30, 99);
    noStroke();
    beginShape();
    vertex(x, y - size / 2);
    quadraticVertex(x - size / 2, y - size, x - size, y);
    quadraticVertex(x - size / 2, y + size, x, y + size / 2);
    quadraticVertex(x + size / 2, y + size, x + size, y);
    quadraticVertex(x + size / 2, y - size, x, y - size / 2);
    endShape(CLOSE);
}

function mousePressed() {
    for (let i = hearts.length - 1; i >= 0; i--) {
        let heart = hearts[i];
        if (dist(mouseX, mouseY, heart.x, heart.y) < heart.size) {
            score++;
            document.getElementById('message').innerText = messages[Math.floor(random(messages.length))];
            hearts.splice(i, 1);
            break;
        }
    }
}

document.getElementById('restartButton').addEventListener('click', () => {
    hearts = [];
    score = 0;
    document.getElementById('message').innerText = '';
});