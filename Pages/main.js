gsap.set("#mainimage",{
    opacity: 0,
    y: 300
})

gsap.to("#mainimage",{
    opacity: 1,
    y: 0,
    duration: 2,
    ease: "power3.inOut"
})


let aries = document.querySelector("#aries");
let taurus = document.querySelector("#taurus");
let gemini = document.querySelector("#gemini");
let cancer = document.querySelector("#cancer");
let leo = document.querySelector("#leo");
let virgo = document.querySelector("#virgo");
let libra = document.querySelector("#libra");
let scorpio = document.querySelector("#scorpio");
let sagittarius = document.querySelector("#sagittarius");
let capricorn = document.querySelector("#capricorn");
let aquarius = document.querySelector("#aquarius");
let pisces = document.querySelector("#pisces");

aries.addEventListener('click', () => {
    window.location.href = './aries.html';
});

taurus.addEventListener('click', () => {
    window.location.href = './tauras.html';
});

gemini.addEventListener('click', () => {
    window.location.href = './gemini.html';
});

cancer.addEventListener('click', () => {
    window.location.href = './cancer.html';
});

leo.addEventListener('click', () => {
    window.location.href = './leo.html';
});

virgo.addEventListener('click', () => {
    window.location.href = './virgo.html';
});

libra.addEventListener('click', () => {
    window.location.href = './libra.html';
});

scorpio.addEventListener('click', () => {
    window.location.href = './scorpio.html';
});

sagittarius.addEventListener('click', () => {
    window.location.href = './sagitarius.html';
});

capricorn.addEventListener('click', () => {
    window.location.href = './capricorn.html';
});

aquarius.addEventListener('click', () => {
    window.location.href = './aquarius.html';
});

pisces.addEventListener('click', () => {
    window.location.href = './pieces.html';
});

const screen = document.querySelector(".main");
const bg = document.querySelector(".bg");
const white = document.querySelector(".white");

screen.addEventListener('mousemove', (e) => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const centerX = windowWidth / 2;
    const centerY = windowHeight / 2;

    // Calculate the cursor's position relative to the center of the window
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Scaling effect (same as before)
    const distanceFromCenterX = Math.abs(deltaX);
    const distanceFromCenterY = Math.abs(deltaY);
    const deltaMax = Math.max(distanceFromCenterX, distanceFromCenterY);
    const scaleFactor = 1 + (deltaMax / Math.max(centerX, centerY)) * 0.5;

    // Movement logic
    let translateX = 0;
    let translateY = (deltaY / centerY) * 50;  // Vertical movement (follow up and down)

    if (e.clientX > centerX) {
        // Only follow the cursor horizontally if it's on the right side
        translateX = (deltaX / centerX) * 50;  // Horizontal movement on the right side
    }

    // Apply the scaling and movement to both elements
    bg.style.transform = `translate(calc(-50% + ${translateX}px), calc(-50% + ${translateY}px)) scale(${scaleFactor})`;
    white.style.transform = `translate(calc(-50% + ${translateX}px), calc(-50% + ${translateY}px)) scale(${scaleFactor})`;

    // Optional: You can add easing for smoother transitions using CSS
});

const mainImage = document.querySelector(".mainimg img");
screen.addEventListener('mousemove', (e) => {
    const imageRect = mainImage.getBoundingClientRect();
    const imageCenterX = imageRect.left + imageRect.width / 2;

    // Calculate the cursor's position relative to the center of the image
    const deltaX = e.clientX - imageCenterX;

    // Rotation logic for 3D card effect
    let rotationY = (deltaX / imageRect.width) * 20; // Adjust the multiplier for desired rotation sensitivity

    // Limit the rotation to prevent the card from flipping too much
    const maxRotation = 50; // Maximum rotation in degrees
    if (rotationY > maxRotation) {
        rotationY = maxRotation;
    } else if (rotationY < -maxRotation) {
        rotationY = -maxRotation;
    }

    // Apply the rotation to the image without moving it
    mainImage.style.transform = `perspective(1000px) rotateY(${rotationY}deg)`;
    mainImage.style.transformOrigin = 'center center'; // Ensure the rotation is from the center

    // Optional: You can add easing for smoother transitions using CSS
    mainImage.style.transition = 'transform 0.7s ease-out';
});
gsap.registerPlugin(ScrollTrigger);

// Create a gsap timeline
const tl = gsap.timeline({
    scrollTrigger: {
        trigger: "body",  // Make sure body is large enough to have scrolling
        start: "top top",  // Trigger when the top of body hits the top of the viewport
        end: () => "+=" + document.querySelector(".scroll").scrollWidth,  // Ensure correct scroll distance
        markers: {
            startColor: "rgba(255, 0, 0, 0)",  // Setting opacity of start marker to 0
            endColor: "rgba(0, 255, 0, 0)",  // Setting opacity of end marker to 0
            fontSize: "12px",
            indent: 20
        },  // Display markers for debugging with reduced opacity
        scrub: true,  // Smoothly scrub through the animation based on scroll position
    }
});

// Move .maintxt towards the left, but not on mobile devices
if (window.innerWidth > 768) {
    tl.to(".maintxt", {
        x: -700,  // Move to the left by 700px
        duration: 1
    });
} else{
    tl.to(".btm h3", {
        opacity: 0,  // Move to the left by 700px
        duration: 1
    });
} 

// On completion, set transform translateX of .whitescreengroup to 0
tl.to(".whitescreengroup", {
    x: 0,  // Move whitescreengroup to the left (adjust value based on layout)
    duration: 1
}, "-=0.5");  // Overlap the timing of the previous animation

// Start scrolling .scroll horizontally
if (window.innerWidth > 768) {
    tl.to(".baju", {
        x: () => -(document.querySelector(".scroll").scrollWidth - window.innerWidth),  // Move .scroll horizontally to the left based on its width
        duration: 2
    }, "-=0.5");  // Slight overlap with the previous animation
} else {
    tl.to(".baju", {
        x: () => -(document.querySelector(".baju").scrollWidth - window.innerWidth),  // Move .baju horizontally to the left based on its width
        duration: 2
    }, "-=0.5");  // Slight overlap with the previous animation
}

// Finally, hide .decoy by setting autoAlpha to 0 (use visibility)
tl.to(".decoy", {
    autoAlpha: 0,  // This hides the element (opacity + visibility)
    duration: 0.5
});
