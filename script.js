// Data for all celestial bodies
const bodyData = {
    sun: {
        name: "Sun",
        radius: 30,
        distance: 0,
        period: 0,
        color: "sun",
        info: {
            diameter: "1,392,700 km",
            mass: "1.989 × 10³⁰ kg",
            temperature: "5,778 K (surface)",
            composition: "73% Hydrogen, 25% Helium",
            facts: "The Sun contains 99.86% of the Solar System's mass and generates energy through nuclear fusion."
        }
    },
    mercury: {
        name: "Mercury",
        radius: 6,
        distance: 80,
        period: 88,
        color: "mercury",
        info: {
            diameter: "4,880 km",
            mass: "3.30 × 10²³ kg",
            distance: "57.9 million km from Sun",
            period: "88 days",
            facts: "The smallest planet, Mercury has the most eccentric orbit and huge temperature swings."
        }
    },
    venus: {
        name: "Venus",
        radius: 10,
        distance: 130,
        period: 225,
        color: "venus",
        info: {
            diameter: "12,104 km",
            mass: "4.87 × 10²⁴ kg",
            distance: "108.2 million km from Sun",
            period: "225 days",
            facts: "Venus rotates backward and is the hottest planet due to a runaway greenhouse effect."
        }
    },
    earth: {
        name: "Earth",
        radius: 12,
        distance: 200,
        period: 365,
        color: "earth",
        info: {
            diameter: "12,756 km",
            mass: "5.972 × 10²⁴ kg",
            distance: "149.6 million km from Sun",
            period: "365.25 days",
            facts: "Earth is the only known planet with life and liquid water on its surface."
        }
    },
    moon: {
        name: "Moon",
        radius: 4,
        distance: 30, // Distance from parent (Earth)
        period: 27.3,
        parent: "earth",
        color: "moon",
        info: {
            diameter: "3,475 km",
            mass: "7.342 × 10²² kg",
            distance: "384,400 km from Earth",
            period: "27.3 days",
            facts: "The Moon's gravitational pull causes Earth's tides and stabilizes our planet's axial tilt."
        }
    },
    mars: {
        name: "Mars",
        radius: 8,
        distance: 300,
        period: 687,
        color: "mars",
        info: {
            diameter: "6,792 km",
            mass: "6.39 × 10²³ kg",
            distance: "227.9 million km from Sun",
            period: "687 days",
            facts: "Mars has the largest volcano in the Solar System (Olympus Mons) and evidence of ancient water flows."
        }
    },
    jupiter: {
        name: "Jupiter",
        radius: 40,
        distance: 650,
        period: 4333,
        color: "jupiter",
        info: {
            diameter: "142,984 km",
            mass: "1.898 × 10²⁷ kg",
            distance: "778.5 million km from Sun",
            period: "4333 days",
            facts: "The largest planet, Jupiter has a massive storm called the Great Red Spot and 95 known moons."
        }
    },
    saturn: {
        name: "Saturn",
        radius: 35,
        distance: 900,
        period: 10759,
        color: "saturn",
        info: {
            diameter: "120,536 km",
            mass: "5.683 × 10²⁶ kg",
            distance: "1.434 billion km from Sun",
            period: "10,759 days",
            facts: "Known for its massive and complex ring system, Saturn is the least dense planet."
        }
    },
    uranus: {
        name: "Uranus",
        radius: 20,
        distance: 1100,
        period: 30687,
        color: "uranus",
        info: {
            diameter: "51,118 km",
            mass: "8.681 × 10²⁵ kg",
            distance: "2.871 billion km from Sun",
            period: "30,687 days",
            facts: "Uranus rotates on its side, making it unique in the solar system."
        }
    },
    neptune: {
        name: "Neptune",
        radius: 19,
        distance: 1300,
        period: 60190,
        color: "neptune",
        info: {
            diameter: "49,528 km",
            mass: "1.024 × 10²⁶ kg",
            distance: "4.498 billion km from Sun",
            period: "60,190 days",
            facts: "Neptune is known for its strong winds, making it the windiest planet in the solar system."
        }
    }
};

// Game state
let camera = { 
    x: 0, 
    y: 0, 
    isDragging: false, 
    lastMouse: { x: 0, y: 0 } 
};
let keys = {};
let timeSpeed = 1;
let startTime = Date.now();
let celestialBodies = [];
let spaceCanvas;

// Asteroid Belt Configuration
const ASTEROID_COUNT = 500;
const MARS_DISTANCE = 300; 
const JUPITER_DISTANCE = 650;

function createAsteroidBelt() {
    const centerX = spaceCanvas.offsetWidth / 2;
    const centerY = spaceCanvas.offsetHeight / 2;

    for (let i = 0; i < ASTEROID_COUNT; i++) {
        const asteroid = document.createElement('div');
        asteroid.className = 'asteroid';

        const distance = Math.random() * (JUPITER_DISTANCE - MARS_DISTANCE) + MARS_DISTANCE;
        const angle = Math.random() * Math.PI * 2;
        
        let x = centerX + Math.cos(angle) * distance;
        let y = centerY + Math.sin(angle) * distance;

        asteroid.style.width = asteroid.style.height = (Math.random() * 2 + 1) + 'px';
        asteroid.style.left = (x - parseFloat(asteroid.style.width) / 2) + 'px';
        asteroid.style.top = (y - parseFloat(asteroid.style.height) / 2) + 'px';
        
        spaceCanvas.appendChild(asteroid);
    }
}

// Initialize the space environment
function initSpace() {
    spaceCanvas = document.getElementById('spaceCanvas');
    
    // Create stars 
    for (let i = 0; i < 400; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = (Math.random() * 200 - 50) + '%'; 
        star.style.top = (Math.random() * 200 - 50) + '%';
        star.style.width = star.style.height = (Math.random() * 3 + 1) + 'px';
        star.style.animationDelay = Math.random() * 3 + 's';
        spaceCanvas.appendChild(star);
    }

    createAsteroidBelt();

    // Create orbit paths
    Object.entries(bodyData).forEach(([key, body]) => {
        if (body.distance > 0 && !body.parent) { 
            const orbit = document.createElement('div');
            orbit.className = 'orbit-path';
            orbit.style.width = orbit.style.height = (body.distance * 2) + 'px';
            orbit.style.left = '50%';
            orbit.style.top = '50%';
            orbit.style.transform = 'translate(-50%, -50%)';
            spaceCanvas.appendChild(orbit);
        }
    });

    // Create celestial bodies
    Object.entries(bodyData).forEach(([key, body]) => {
        const element = document.createElement('div');
        element.className = `celestial-body ${body.color}`;
        element.style.width = element.style.height = (body.radius * 2) + 'px';
        element.id = key;
        element.addEventListener('click', (e) => {
            e.stopPropagation();
            showInfo(body);
        });
        spaceCanvas.appendChild(element);
        
        celestialBodies.push({
            key,
            element,
            data: body,
            angle: Math.random() * Math.PI * 2
        });
    });
}

// Utility to get the current scale factor
function getCurrentScale() {
    const transform = spaceCanvas.style.transform;
    const currentScaleMatch = transform.match(/scale\(([\d.]+)\)/);
    return currentScaleMatch ? parseFloat(currentScaleMatch[1]) : 1;
}

// Applies the camera offset (panning) to the entire canvas container
function applyCameraOffset() {
    const currentScale = getCurrentScale();
    spaceCanvas.style.transform = `translate(${-camera.x}px, ${-camera.y}px) scale(${currentScale})`;
}

// Update celestial body positions
function updatePositions() {
    const currentTime = (Date.now() - startTime) * timeSpeed / 1000; 
    const centerX = spaceCanvas.offsetWidth / 2;
    const centerY = spaceCanvas.offsetHeight / 2;

    // Phase 1: Calculate the absolute, un-offset positions
    celestialBodies.forEach(body => {
        let calculatedX = centerX;
        let calculatedY = centerY;

        if (body.data.distance > 0) {
            
            body.angle += (2 * Math.PI / body.data.period) * (currentTime / 1000); 

            calculatedX = centerX + Math.cos(body.angle) * body.data.distance;
            calculatedY = centerY + Math.sin(body.angle) * body.data.distance;
        }

        body.absoluteX = calculatedX;
        body.absoluteY = calculatedY;
    });

    // Phase 2: Position all bodies relative to their parent's absolute position
    celestialBodies.forEach(body => {
        let finalX = body.absoluteX;
        let finalY = body.absoluteY;
        
        if (body.data.parent) {
            const parent = celestialBodies.find(b => b.key === body.data.parent);
            if (parent) {
                const orbitDistance = body.data.distance;
                
                // Moon's orbit around the parent (Earth)
                finalX = parent.absoluteX + Math.cos(body.angle) * orbitDistance;
                finalY = parent.absoluteY + Math.sin(body.angle) * orbitDistance;
            }
        }
        
        // Apply position to the element's style, centered on the calculated position
        body.element.style.left = (finalX - body.data.radius) + 'px';
        body.element.style.top = (finalY - body.data.radius) + 'px';
    });
}

// Show information panel
function showInfo(body) {
    const panel = document.getElementById('infoPanel');
    const title = document.getElementById('infoTitle');
    const content = document.getElementById('infoContent');

    title.textContent = body.name;
    
    const infoGrid = document.createElement('div');
    infoGrid.className = 'info-grid';
    
    // Populate data into grid items
    Object.entries(body.info).forEach(([key, value]) => {
        if (key !== 'facts') {
            const item = document.createElement('div');
            item.className = 'info-item';
            const displayKey = key.charAt(0).toUpperCase() + key.slice(1);
            item.innerHTML = `<strong>${displayKey}:</strong> ${value}`;
            infoGrid.appendChild(item);
        }
    });

    const facts = document.createElement('div');
    facts.style.marginTop = '15px';
    facts.innerHTML = `<strong>Interesting Facts:</strong><br>${body.info.facts}`;

    content.innerHTML = '';
    content.appendChild(infoGrid);
    content.appendChild(facts);
    
    panel.classList.add('visible');
}

// Hide information panel
function hideInfo() {
    document.getElementById('infoPanel').classList.remove('visible');
}

// Handle keyboard input (WASD movement)
function handleInput() {
    if (document.getElementById('infoPanel').classList.contains('visible')) return;
    
    const speed = keys['Shift'] ? 10 : 5; 
    
    // Update camera offsets (in the opposite direction of desired scene movement)
    if (keys['w'] || keys['W']) camera.y -= speed; 
    if (keys['s'] || keys['S']) camera.y += speed; 
    if (keys['a'] || keys['A']) camera.x -= speed; 
    if (keys['d'] || keys['D']) camera.x += speed; 
}

// --- EVENT LISTENERS ---

// Keyboard movement
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

document.getElementById('closeInfo').addEventListener('click', hideInfo);

// Handle Time Speed slider
document.getElementById('speedSlider').addEventListener('input', (e) => {
    timeSpeed = parseFloat(e.target.value);
    document.getElementById('speedValue').textContent = timeSpeed.toFixed(1) + 'x';
});

// Mouse wheel zoom 
document.addEventListener('wheel', (e) => {
    e.preventDefault();
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1; 
    const currentScale = getCurrentScale();

    const newScale = Math.max(0.1, Math.min(3, currentScale * zoomFactor));
    
    // Maintain the existing translation while updating scale
    const currentTranslateMatch = spaceCanvas.style.transform.match(/translate\(([-\d.]+)px, ([-\d.]+)px\)/);
    const translateX = currentTranslateMatch ? currentTranslateMatch[1] : -camera.x;
    const translateY = currentTranslateMatch ? currentTranslateMatch[2] : -camera.y;

    spaceCanvas.style.transform = `translate(${translateX}px, ${translateY}px) scale(${newScale})`;
});

// --- Panning / Click-and-Drag Movement ---

// Start drag
document.getElementById('gameContainer').addEventListener('mousedown', (e) => {
    if (e.target.closest('#ui, .celestial-body')) return;
    
    camera.isDragging = true;
    camera.lastMouse.x = e.clientX;
    camera.lastMouse.y = e.clientY;
    document.body.style.cursor = 'grabbing';
});

// End drag
document.addEventListener('mouseup', () => {
    camera.isDragging = false;
    document.body.style.cursor = 'crosshair';
});

// Dragging action
document.addEventListener('mousemove', (e) => {
    if (!camera.isDragging) return;

    const dx = e.clientX - camera.lastMouse.x;
    const dy = e.clientY - camera.lastMouse.y;
    
    // Update camera position
    camera.x -= dx;
    camera.y -= dy;
    
    camera.lastMouse.x = e.clientX;
    camera.lastMouse.y = e.clientY;
});


// Animation loop
function animate() {
    handleInput();
    updatePositions();
    applyCameraOffset(); 
    requestAnimationFrame(animate);
}

// Initialize everything on page load
document.addEventListener('DOMContentLoaded', () => {
    initSpace();
    animate();
});