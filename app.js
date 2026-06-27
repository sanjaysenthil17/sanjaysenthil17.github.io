/* ==========================================
   NEURAL NET CANVAS BACKGROUND
   ========================================== */
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
let mouse = {
  x: null,
  y: null,
  radius: 150
};

// Set canvas dimensions
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', () => {
  resizeCanvas();
  initParticles();
});
resizeCanvas();

// Track mouse position
window.addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener('mouseout', () => {
  mouse.x = null;
  mouse.y = null;
});

// Particle Class
class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }
  
  // Draw individual particle
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  
  // Update particle position and bounce off edges
  update() {
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }
    
    // Check collision with mouse
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < mouse.radius + this.size) {
      if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
        this.x += 1;
      }
      if (mouse.x > this.x && this.x > this.size * 10) {
        this.x -= 1;
      }
      if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
        this.y += 1;
      }
      if (mouse.y > this.y && this.y > this.size * 10) {
        this.y -= 1;
      }
    }
    
    // Move particle
    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }
}

// Initialize particles array
function initParticles() {
  particlesArray = [];
  // Scale particle count based on screen width
  const numberOfParticles = Math.min(80, Math.floor(window.innerWidth / 15));
  
  for (let i = 0; i < numberOfParticles; i++) {
    let size = (Math.random() * 2) + 1;
    let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
    let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
    
    // Calm, slow movement speeds
    let directionX = (Math.random() * 0.4) - 0.2;
    let directionY = (Math.random() * 0.4) - 0.2;
    
    // Semi-transparent glowing colors (purple/teal/blue)
    const colorVal = Math.random();
    let color = 'rgba(168, 85, 247, 0.4)'; // Purple
    if (colorVal > 0.6) {
      color = 'rgba(6, 182, 212, 0.4)'; // Teal
    } else if (colorVal > 0.3) {
      color = 'rgba(59, 130, 246, 0.4)'; // Blue
    }
    
    particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}

// Connect particles close to each other
function connect() {
  let opacityValue = 1;
  const maxConnectDistance = 120;
  
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let dx = particlesArray[a].x - particlesArray[b].x;
      let dy = particlesArray[a].y - particlesArray[b].y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < maxConnectDistance) {
        opacityValue = 1 - (distance / maxConnectDistance);
        ctx.strokeStyle = `rgba(168, 85, 247, ${opacityValue * 0.15})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
    
    // Connect mouse to particles
    if (mouse.x !== null && mouse.y !== null) {
      let dx = particlesArray[a].x - mouse.x;
      let dy = particlesArray[a].y - mouse.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < mouse.radius) {
        opacityValue = 1 - (distance / mouse.radius);
        ctx.strokeStyle = `rgba(6, 182, 212, ${opacityValue * 0.35})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }
  }
}

// Animation loop
function animate() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
  connect();
  requestAnimationFrame(animate);
}

initParticles();
animate();

/* ==========================================
   DYNAMIC TYPING EFFECT
   ========================================== */
const words = [
  "AI & Data Science Engineer.",
  "Machine Learning Specialist.",
  "Data Infrastructure Builder.",
  "Computer Vision Enthusiast."
];
let i = 0;
let timer;

function typingEffect() {
  let word = words[i].split("");
  var loopTyping = function() {
    if (word.length > 0) {
      document.getElementById('typing-text').innerHTML += word.shift();
    } else {
      setTimeout(deletingEffect, 2000);
      return false;
    }
    timer = setTimeout(loopTyping, 100);
  };
  loopTyping();
}

function deletingEffect() {
  let word = words[i].split("");
  var loopDeleting = function() {
    if (word.length > 0) {
      word.pop();
      document.getElementById('typing-text').innerHTML = word.join("");
    } else {
      if (words.length > (i + 1)) {
        i++;
      } else {
        i = 0;
      }
      setTimeout(typingEffect, 500);
      return false;
    }
    timer = setTimeout(loopDeleting, 50);
  };
  loopDeleting();
}

typingEffect();

/* ==========================================
   SCROLL REVEAL ANIMATIONS
   ========================================== */
const revealElements = document.querySelectorAll('.scroll-reveal');

const revealOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target); // Stop observing once revealed
    }
  });
}, {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(element => {
  revealOnScroll.observe(element);
});

/* ==========================================
   MOBILE NAVIGATION
   ========================================== */
const menuToggle = document.getElementById('menuToggle');
const closeMenu = document.getElementById('closeMenu');
const mobileNav = document.getElementById('mobileNav');
const mobileLinks = document.querySelectorAll('.mobile-link');

function openMobileMenu() {
  mobileNav.classList.add('active');
}

function closeMobileMenu() {
  mobileNav.classList.remove('active');
}

menuToggle.addEventListener('click', openMobileMenu);
closeMenu.addEventListener('click', closeMobileMenu);

mobileLinks.forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// Close drawer on background click (click anywhere except menu or drawer)
document.addEventListener('click', (event) => {
  if (mobileNav.classList.contains('active')) {
    if (!mobileNav.contains(event.target) && !menuToggle.contains(event.target)) {
      closeMobileMenu();
    }
  }
});

/* ==========================================
   CONTACT FORM SUBMISSION HANDLER
   ========================================== */
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  formStatus.className = 'form-status';
  formStatus.innerHTML = 'Sending message...';
  
  // Prepare form data
  const formData = new FormData(contactForm);
  const action = contactForm.getAttribute('action');

  // Check if Formspree action placeholder is still present
  if (action.includes('placeholder')) {
    // Simulated submission behavior for local testing
    setTimeout(() => {
      formStatus.className = 'form-status success';
      formStatus.innerHTML = '✓ Message sent successfully! (Demo Mode - Setup Formspree in code for actual mail delivery)';
      contactForm.reset();
    }, 1500);
  } else {
    // Actual submission to Formspree
    fetch(action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        formStatus.className = 'form-status success';
        formStatus.innerHTML = '✓ Thank you! Your message has been sent successfully.';
        contactForm.reset();
      } else {
        response.json().then(data => {
          if (Object.prototype.hasOwnProperty.call(data, 'errors')) {
            formStatus.innerHTML = data.errors.map(error => error.message).join(", ");
          } else {
            formStatus.innerHTML = "Oops! There was a problem submitting your form.";
          }
          formStatus.className = 'form-status error';
        });
      }
    })
    .catch(error => {
      formStatus.className = 'form-status error';
      formStatus.innerHTML = "Oops! There was a network issue. Please check your connection and try again.";
    });
  }
});

/* ==========================================
   RESUME TRIGGER WARNING
   ========================================== */
document.getElementById('resumeBtn').addEventListener('click', function(e) {
  const currentHref = this.getAttribute('href');
  if (currentHref === '#' || currentHref === '') {
    e.preventDefault();
    alert("Please add your resume PDF path (e.g. 'resume.pdf') inside the 'index.html' file under the ID 'resumeBtn' to enable downloads!");
  }
});
