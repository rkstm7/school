const track = document.getElementById("carouselTrack");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const slides = document.querySelectorAll(".slide");

let currentIndex = 0;
let autoSlideInterval;
const slideInterval = 4000; // 4 seconds

function updateCarousel() {
    const slideWidth = slides[0].clientWidth;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

function showNextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
}

function showPrevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
}

function startAutoSlide() {
    stopAutoSlide(); // Clear any existing
    autoSlideInterval = setInterval(showNextSlide, slideInterval);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Event listeners
nextBtn.addEventListener("click", () => {
    showNextSlide();
    startAutoSlide();
});

prevBtn.addEventListener("click", () => {
    showPrevSlide();
    startAutoSlide();
});

window.addEventListener("load", () => {
    updateCarousel();
    startAutoSlide();
});

window.addEventListener("resize", updateCarousel);

// Pause on hover
const carouselContainer = document.querySelector(".carousel-container");

carouselContainer.addEventListener("mouseenter", stopAutoSlide);
carouselContainer.addEventListener("mouseleave", startAutoSlide);

// Teacher Section Tilt Effect
function handleTilt(event, card) {
    const rect = card.getBoundingClientRect();
    const cardWidth = rect.width;
    const cardHeight = rect.height;
    const centerX = rect.left + cardWidth / 2;
    const centerY = rect.top + cardHeight / 2;

    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Max 15 deg tilt
    const rotateX = ((mouseY - centerY) / (cardHeight / 2)) * 15;
    const rotateY = ((mouseX - centerX) / (cardWidth / 2)) * -15;

    const percentX = (mouseX - rect.left) / cardWidth;
    const startColor = [255, 255, 255];
    const hoverColor = [236, 72, 153]; // rose-500

    const r = Math.round(startColor[0] + (hoverColor[0] - startColor[0]) * percentX);
    const g = Math.round(startColor[1] + (hoverColor[1] - startColor[1]) * percentX);
    const b = Math.round(startColor[2] + (hoverColor[2] - startColor[2]) * percentX);

    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    card.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}
function resetTilt(card) {
    card.style.transform = `perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)`;
    card.style.backgroundColor = 'white';
}
// If you have teacher cards, add event listeners like:
// document.querySelectorAll('.teacher-card').forEach(card => {
//   card.addEventListener('mousemove', (e) => handleTilt(e, card));
//   card.addEventListener('mouseleave', () => resetTilt(card));
// });

// Vertical Ticker Scrolling (Important Links / Updates)
function startVerticalTicker(containerId, tickerId, speed = 0.5) {
    const container = document.getElementById(containerId);
    const ticker = document.getElementById(tickerId);
    if (!container || !ticker) {
        console.error("Invalid container or ticker ID");
        return;
    }

    // Clone ticker for infinite scroll
    const cloned = ticker.cloneNode(true);
    cloned.id = "";
    cloned.classList.add("ticker-list");
    container.appendChild(cloned);

    let offset = 0;
    let paused = false;

    container.addEventListener("mouseenter", () => (paused = true));
    container.addEventListener("mouseleave", () => (paused = false));

    function scroll() {
        if (!paused) {
            offset += speed;

            ticker.style.transform = `translateY(-${offset}px)`;
            cloned.style.transform = `translateY(${ticker.offsetHeight - offset}px)`;

            if (offset >= ticker.offsetHeight) {
                offset = 0;
            }
        }
        requestAnimationFrame(scroll);
    }

    scroll();
}

startVerticalTicker("ugContainer", "ugTicker", 0.5);
startVerticalTicker("pgContainer", "pgTicker", 0.5);

// Why Choose Us - 3D Animated Heading & Feature Boxes
const heading = document.getElementById("whyHeading");
const boxes = document.querySelectorAll(".feature-box");

if (heading) {
    let headingRotation = 0;
    function animateHeading() {
        headingRotation += 0.2; // degrees per frame
        heading.style.transform = `perspective(800px) rotateX(${headingRotation * 0.3}deg) rotateY(${headingRotation}deg)`;
        requestAnimationFrame(animateHeading);
    }
    animateHeading();
}

boxes.forEach((box) => {
    let angle = 0;
    let animating = true;

    function animateBox() {
        if (!animating) return;
        angle += 0.15;
        box.style.transform = `rotateX(${Math.sin(angle) * 3}deg) rotateY(${Math.cos(angle) * 3}deg)`;
        requestAnimationFrame(animateBox);
    }
    animateBox();

    box.addEventListener("mouseenter", () => {
        animating = false;
        box.style.transition = "transform 0.4s ease, box-shadow 0.4s ease";
        box.style.transform = "scale(1.1) rotateX(15deg) rotateY(10deg)";
        box.style.boxShadow = "0 15px 30px rgba(59, 130, 246, 0.5)";
        box.style.zIndex = "10";
    });

    box.addEventListener("mouseleave", () => {
        box.style.transition = "transform 0.6s ease, box-shadow 0.6s ease";
        box.style.transform = "rotateX(0deg) rotateY(0deg)";
        box.style.boxShadow = "";
        box.style.zIndex = "";
        animating = true;
        angle = 0;
        animateBox();
    });
});

// School Introduction Tabs
const tabContents = {
    "tab-about": `Primary School Hari Mushar Tol, Bathanaha, Sitamarhi, Bihar is a
      government-recognized institution dedicated to providing quality
      foundational education to young learners. As a state-organized primary
      school, it serves as a pillar of inclusive learning, especially for
      students from rural and underprivileged backgrounds. With a strong
      focus on literacy, values, discipline, and overall development, the
      school nurtures students in a safe and encouraging environment. Our
      dedicated teachers work passionately to ensure that each child
      receives equal opportunities to grow academically, socially, and
      emotionally. We aim not only to educate but to empower — building a
      future where every child is equipped with the knowledge, confidence,
      and compassion needed to succeed.`,

    "tab-mission": `Our mission is to cultivate a nurturing and inclusive academic environment where every student receives quality education, personalized support, and the tools to succeed in all areas of life. We strive to empower learners with knowledge, creativity, and moral values, preparing them to contribute meaningfully to society.`,

    "tab-vision": `We envision a community where education is accessible to all, fostering lifelong learners who are confident, responsible, and compassionate. Our vision is to become a leading institution recognized for academic excellence, innovation, and holistic development.`,

    "tab-values": `Our core values emphasize integrity, respect, inclusivity, and excellence. We believe in developing not just scholars but empathetic individuals who positively impact their community and the world.`
};

const tabs = document.querySelectorAll("#tabs a.tab-link");
const contentBox = document.getElementById("content-box");

tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
        e.preventDefault();

        tabs.forEach((t) => t.classList.remove("active", "text-red-600", "border-red-600"));
        tab.classList.add("active", "text-red-600", "border-red-600");

        contentBox.style.opacity = 0;
        contentBox.style.transform = "translateY(20px)";

        setTimeout(() => {
            contentBox.innerText = tabContents[tab.id];
            contentBox.style.opacity = 1;
            contentBox.style.transform = "translateY(0)";
        }, 300);
    });
});


// For Our Department
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.relative.transition-all.duration-500.group');

    cards.forEach(card => {
        // 3D Tilt Effect
        card.style.perspective = '900px';

        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * 10;  // max 10 deg
            const rotateY = ((x - centerX) / centerX) * -10;

            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            card.style.transition = 'transform 0.1s ease';
            card.style.zIndex = '10';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
            card.style.transition = 'transform 0.5s ease';
            card.style.zIndex = '0';
            card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
    });
});

//School Overview Section
document.addEventListener("DOMContentLoaded", () => {
    const pageWrapper = document.getElementById("pageWrapper");

    // Attach click handlers to all internal links
    document
        .querySelectorAll("a[href^='/'], a[href^='./'], a[href^='../']")
        .forEach((link) => {
            link.addEventListener("click", function (event) {
                event.preventDefault();
                const href = this.getAttribute("href");

                // Add fade out class to wrapper
                pageWrapper.classList.add("fade-out");

                // After animation ends, navigate
                pageWrapper.addEventListener(
                    "animationend",
                    () => {
                        window.location.href = href;
                    },
                    { once: true }
                );
            });
        });
});

// Base file script
const balls = document.querySelectorAll("#animatedObjectsContainer .ball");

function animate() {
    const time = Date.now() / 1000;
    balls.forEach((ball, i) => {
        const angle = time + i;

        switch (i) {
            case 0: // Bounce (vertical oscillation)
                const x0 = Math.sin(angle * 1.5) * 20;
                const y0 = Math.abs(Math.sin(angle * 3)) * 40;
                ball.style.transform = `translate(${x0}px, ${y0}px)`;
                break;

            case 1: // Spin around fixed point
                const radius1 = 30;
                const x1 = Math.cos(angle * 2) * radius1;
                const y1 = Math.sin(angle * 2) * radius1;
                ball.style.transform = `translate(${x1}px, ${y1}px) rotate(${angle * 180}deg)`;
                break;

            case 2: // Floating diagonally
                const x2 = Math.sin(angle * 1.3) * 30;
                const y2 = Math.cos(angle * 1.3) * 30;
                ball.style.transform = `translate(${x2}px, ${y2}px)`;
                break;

            case 3: // Morph shape + horizontal slide
                const r1 = 30 + 20 * Math.sin(angle * 2);
                const r2 = 70 - 20 * Math.sin(angle * 2);
                const x3 = Math.sin(angle) * 40;
                ball.style.borderRadius = `${r1}% ${r2}% ${r2}% ${r1}%`;
                ball.style.transform = `translateX(${x3}px)`;
                break;

            case 4: // Shake and dance (scale and rotate)
                const scale = 1 + 0.1 * Math.sin(angle * 6);
                const rotate = 10 * Math.sin(angle * 8);
                ball.style.transform = `rotate(${rotate}deg) scale(${scale})`;
                break;
        }
    });

    requestAnimationFrame(animate);
}

animate();