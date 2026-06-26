document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // Opening Animations for Hero
    const openTimeline = gsap.timeline();
    openTimeline.from(".hero-inner-frame", {
        opacity: 0,
        y: 50,
        duration: 1.4,
        ease: "power4.out"
    });

    // 6-Photo Grid Scroll Reveal Mechanics
    gsap.from(".premium-polaroid-card", {
        opacity: 0,
        y: 70,
        scale: 0.95,
        duration: 1,
        stagger: 0.12,
        ease: "back.out(1.1)",
        scrollTrigger: {
            trigger: ".premium-photo-grid",
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });

    initializePremiumTiltEffects();

    // Constant background layout animation generators
    for (let i = 0; i < 25; i++) {
        spawnCelebrationParticle(false, null);
    }
});

/* ==========================================
   NAVIGATION
========================================== */
function navigateToCake() {
    const ritualSection = document.getElementById("cake-ritual-zone");
    if(ritualSection) {
        ritualSection.scrollIntoView({ behavior: "smooth" });
    }
}

/* ==========================================
   🎂 CANDLE BLOW & CAKE CUT MODULE
========================================== */
let blownCandlesCount = 0;

function extinguishCandle(candleElement) {
    if (!candleElement.classList.contains("blown")) {
        candleElement.classList.add("blown");
        blownCandlesCount++;

        const headline = document.getElementById("status-headline");
        const subtext = document.getElementById("status-subtext");
        const cutBtn = document.getElementById("cake-cut-btn");

        if (blownCandlesCount === 1) {
            headline.textContent = "Almost there... 🌸";
            subtext.textContent = "One candle left! Blow out the final one to unlock the cake knife.";
            for(let i=0; i<10; i++) spawnCelebrationParticle(true, null);
        } else if (blownCandlesCount === 2) {
            headline.textContent = "Make Your Wish! 💫";
            subtext.textContent = "The candles are out! Now tap the button below to cut your cake and launch the firework celebration!";
            
            cutBtn.removeAttribute("disabled");
            cutBtn.classList.remove("style-disabled");
            
            for(let i=0; i<20; i++) spawnCelebrationParticle(true, null);
        }
    }
}

function executeCakeCut() {
    const cutLine = document.getElementById("cake-cut-line");
    const headline = document.getElementById("status-headline");
    const subtext = document.getElementById("status-subtext");
    const cutBtn = document.getElementById("cake-cut-btn");

    if (cutLine) {
        cutLine.classList.add("slice-active");
        headline.textContent = "🎉 HAPPY BIRTHDAY! 🎉";
        subtext.innerHTML = "<span style='color: #ff4da6; font-weight: 700;'>Wishing you the most magical year ahead! You deserve the world!</span>";
        
        cutBtn.style.display = "none";
        triggerMassiveFireworksDisplay();
    }
}

function triggerMassiveFireworksDisplay() {
    for (let i = 0; i < 70; i++) {
        setTimeout(() => { spawnCelebrationParticle(true, null); }, Math.random() * 400);
    }
    let burstInterval = setInterval(() => {
        for(let j=0; j<20; j++) { spawnCelebrationParticle(true, null); }
    }, 300);
    setTimeout(() => { clearInterval(burstInterval); }, 5000);
}

/* ==========================================
   🍦 VIRTUAL BUCKET ADVENTURE FLAVORS MACHINE
========================================== */
function triggerFlavorBurst(flavor) {
    let customTokens = [];
    
    // Custom firework elements tailored to her traveler mood!
    if (flavor === 'strawberry') {
        customTokens = ["🍓", "⛰️", "💖", "🌸", "🏔️"];
    } else if (flavor === 'vanilla') {
        customTokens = ["🍦", "🌊", "✨", "🌟", "🐬"];
    } else if (flavor === 'chocolate') {
        customTokens = ["🍫", "🧭", "💝", "🍿", "✈️"];
    }

    // High intensity splash wave matching the picker color
    for (let i = 0; i < 35; i++) {
        spawnCelebrationParticle(true, customTokens);
    }
}

/* ==========================================
   💌 STICKY NOTE / DIGITAL GREETING TOGGLE
========================================== */
function toggleStickyNote() {
    const note = document.getElementById("secret-postit");
    if (note) {
        if (note.style.display === "block") {
            note.style.display = "none";
        } else {
            note.style.display = "block";
            gsap.fromTo(note, 
                { scale: 0.8, opacity: 0, rotation: -5 }, 
                { scale: 1, opacity: 1, rotation: -1, duration: 0.4, ease: "back.out(1.4)" }
            );
            for(let i=0; i<15; i++) spawnCelebrationParticle(true, null);
        }
    }
}

/* ==========================================
   3D PARALLAX INTERACTIVE TILT MODULE
========================================== */
function initializePremiumTiltEffects() {
    const cards = document.querySelectorAll('.premium-polaroid-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top; 
            const tiltX = (rect.height / 2 - y) * 0.07;
            const tiltY = (x - rect.width / 2) * 0.07;
            
            gsap.to(card, {
                rotateX: tiltX, rotateY: tiltY,
                transformPerspective: 1000,
                scale: 1.02, duration: 0.3, ease: "power2.out"
            });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.5, ease: "power2.out" });
        });
    });
}

/* ==========================================
   CELEBRATION PARTICLE EMITTER
========================================== */
function spawnCelebrationParticle(isExplosion, overrideTokens) {
    const layer = document.getElementById("canvas-hearts-layer");
    if(!layer) return;

    const atomicElement = document.createElement("div");
    const dynamicTokens = overrideTokens || ["💖", "🌸", "✨", "💝", "🎉", "🎈", "🌟", "🎂"];
    
    atomicElement.textContent = dynamicTokens[Math.floor(Math.random() * dynamicTokens.length)];
    atomicElement.style.position = "fixed";
    atomicElement.style.pointerEvents = "none";
    
    if(isExplosion) {
        atomicElement.style.left = `${Math.random() * 60 + 20}vw`;
        atomicElement.style.top = `${Math.random() * 50 + 20}vh`;
        atomicElement.style.fontSize = `${Math.random() * 20 + 22}px`;
        
        gsap.to(atomicElement, {
            x: `${Math.random() * 500 - 250}px`,
            y: `${Math.random() * -500 - 50}px`,
            rotation: Math.random() * 360,
            opacity: 0,
            duration: Math.random() * 1.4 + 0.8,
            ease: "power3.out",
            onComplete: () => atomicElement.remove()
        });
    } else {
        atomicElement.style.left = `${Math.random() * 100}vw`;
        atomicElement.style.top = `-30px`;
        atomicElement.style.fontSize = `${Math.random() * 12 + 14}px`;
        atomicElement.style.opacity = Math.random() * 0.5 + 0.4;

        gsap.to(atomicElement, {
            y: "105vh",
            x: `+=${Math.random() * 100 - 50}`,
            rotation: Math.random() * 360,
            duration: Math.random() * 6 + 5,
            ease: "none",
            onComplete: () => {
                atomicElement.remove();
                spawnCelebrationParticle(false, null);
            }
        });
    }

    layer.appendChild(atomicElement);
}

/* ==========================================
   THEATER REVEAL CONTROL POPUPS
========================================== */
const popupModal = document.getElementById("luxury-theater-popup");
const popupImg = document.getElementById("modal-target-img");
const popupCaption = document.getElementById("modal-target-caption");

function openLuxuryPopup(src, text) {
    if(popupModal && popupImg && popupCaption) {
        popupImg.src = src;
        popupCaption.textContent = text;
        popupModal.style.display = "flex";
        
        gsap.fromTo(popupImg, 
            { scale: 0.88, opacity: 0 }, 
            { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.15)" }
        );
    }
}

function closeLuxuryPopup() {
    if(popupModal) {
        gsap.to(popupImg, {
            scale: 0.88, opacity: 0, duration: 0.3,
            onComplete: () => { popupModal.style.display = "none"; }
        });
    }
}

document.addEventListener("keydown", (e) => {
    if(e.key === "Escape" && popupModal && popupModal.style.display === "flex") {
        closeLuxuryPopup();
    }
});