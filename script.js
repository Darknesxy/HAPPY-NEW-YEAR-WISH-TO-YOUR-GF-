/* =========================
   FLOATING HEARTS ANIMATION
========================= */

const heartsContainer = document.getElementById("hearts");

function createHeart() {
  const heart = document.createElement("div");
  heart.innerHTML = "❤️";
  heart.style.position = "absolute";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.bottom = "-20px";
  heart.style.fontSize = Math.random() * 20 + 12 + "px";
  heart.style.opacity = Math.random() * 0.5 + 0.5;
  heart.style.animation = `floatUp ${Math.random() * 3 + 4}s linear`;

  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 7000);
}

setInterval(createHeart, 300);

/* =========================
   PHOTO GALLERY SCROLL ANIMATIONS
========================= */

const photoItems = document.querySelectorAll(".photo-item");

const observePhotos = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Staggered animation delay for each photo
        setTimeout(() => {
          entry.target.classList.add("animate");
        }, index * 200); // 200ms delay between each photo
        
        // Text effect on hover
        entry.target.addEventListener("mouseenter", () => {
          entry.target.style.transform = "scale(1.05) rotate(1deg)";
        });
        
        entry.target.addEventListener("mouseleave", () => {
          entry.target.style.transform = "scale(1) rotate(0deg)";
        });
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px"
  });

  photoItems.forEach(photo => observer.observe(photo));
};

observePhotos();

/* =========================
   TEXT EFFECT ANIMATIONS
========================= */

const animateText = (element) => {
  const text = element.textContent;
  element.innerHTML = "";
  
  text.split("").forEach((char, index) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? " " : char;
    span.style.opacity = "0";
    span.style.transform = "translateY(30px)";
    span.style.display = "inline-block";
    span.style.transition = `all 0.6s ease ${index * 0.05}s`;
    element.appendChild(span);
    
    // Trigger animation on scroll/view
    setTimeout(() => {
      span.style.opacity = "1";
      span.style.transform = "translateY(0)";
    }, 100);
  });
};

// Apply to all headings
document.querySelectorAll("h1, h2, h3").forEach((heading, index) => {
  setTimeout(() => {
    animateText(heading);
  }, index * 300);
});

/* =========================
   SCROLL REVEAL EFFECT (Updated)
========================= */

const revealElements = document.querySelectorAll(
  ".card, .promise, .final h2, .final p, #loveBtn, .photo-gallery h2"
);

const revealOnScroll = () => {
  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
      el.style.transition = "all 1s ease";
    } else {
      el.style.opacity = "0";
      el.style.transform = "translateY(40px)";
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* =========================
   LOVE BUTTON SURPRISE (Enhanced)
========================= */

const loveBtn = document.getElementById("loveBtn");

loveBtn.addEventListener("click", () => {
  // Heart explosion effect
  for(let i = 0; i < 20; i++) {
    setTimeout(() => createHeartExplosion(), i * 100);
  }
  
  loveBtn.innerText = "I Love You Forever ❤️";
  loveBtn.style.background = "linear-gradient(45deg, #ff4d6d, #ff6b9d)";
  loveBtn.style.color = "#ffffff";
  loveBtn.style.transform = "scale(1.2)";

  setTimeout(() => {
    alert("I love you today, tomorrow & forever ❤️💍");
  }, 500);
});

/* =========================
   HEART EXPLOSION EFFECT
========================= */

function createHeartExplosion() {
  const heart = document.createElement("div");
  heart.innerHTML = "💖";
  heart.style.position = "fixed";
  heart.style.left = "50%";
  heart.style.top = "50%";
  heart.style.fontSize = "20px";
  heart.style.pointerEvents = "none";
  heart.style.zIndex = "1000";
  
  const angle = (Math.PI * 2 * Math.random());
  const velocity = 150 + Math.random() * 100;
  const vx = Math.cos(angle) * velocity;
  const vy = Math.sin(angle) * velocity;
  
  document.body.appendChild(heart);
  
  let progress = 0;
  const animate = () => {
    progress += 0.05;
    heart.style.left = (parseFloat(heart.style.left) + vx * 0.016) + "px";
    heart.style.top = (parseFloat(heart.style.top) + vy * 0.016) + "px";
    heart.style.opacity = 1 - progress;
    heart.style.transform = `scale(${1 - progress})`;
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      heart.remove();
    }
  };
  animate();
}