const menu = document.querySelector(".ri-information-line");
const menuscreen = document.querySelector(".menuscreen");
let tapcount = 0;

menu.addEventListener("click", () => {
    if (tapcount === 0) {
        // Slide the menu in from the right
        gsap.to(menuscreen, {
            right: "8%", // Bring it into view
            duration: 0.5, // Animation duration (0.5 seconds)
            ease: "power2.out" // Easing function for smoothness
        });
        tapcount = 1;
    } else {
        // Slide the menu back out to the right
        gsap.to(menuscreen, {
            right: "-100%", // Move it off-screen again
            duration: 0.5, // Animation duration
            ease: "power2.in" // Easing function for smoothness
        });
        tapcount = 0;
    }
});

const screen = document.querySelector(".main");
const bgtext = document.getElementById("bgtxt");
screen.addEventListener("mousemove", (e)=>{
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Calculate the center of the screen
    const centerX = windowWidth / 2;
    const centerY = windowHeight / 2;
    // console.log("Center o
    
    // Calculate the distance of the cursor from the center of the window
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Apply the correct rotation logic
    const rotationX = (deltaY / windowHeight) * 40;  // Up = positive tilt, Down = negative tilt
    const rotationY = (deltaX / windowWidth) * 40;   // Left = negative tilt, Right = positive tilt
    

    // Apply the transform with corrected rotation
    bgtext.style.transform = `translate(-50%, -50%) rotateX(${-rotationX}deg) rotateY(${rotationY}deg)`;
});

gsap.to("#scroll", {
    opacity: 0,
    duration: 1,
    scrollTrigger: {
        trigger: ".main",
        scroller: "body",
        start: "top",
        end: "bottom 95%",
        scrub: true,
        markers: false,
    },
});
gsap.to(".ri-arrow-down-double-line", {
    opacity: 0,
    duration: 1,
    scrollTrigger: {
        trigger: ".main",
        scroller: "body",
        start: "top",
        end: "bottom 95%",
        scrub: true,
        markers: false,
    },
});

let index = 0;
let card = document.querySelector(".card");
let cards = [];
let updation = document.querySelector("#rt");
let SK = document.querySelector("#SK");
let bg = document.querySelector(".bg");
let color = [
    "radial-gradient(rgba(0, 0, 0, 0.733), #321C60 15%, black 80%)",
    "radial-gradient(rgba(0, 0, 0, 0.733), #9D3657 15%, black 80%)",
    "radial-gradient(rgba(0, 0, 0, 0.733), #ed7032 15%, black 80%)",
    "radial-gradient(rgba(0, 0, 0, 0.733), #71B856 15%, black 80%)",
    "radial-gradient(rgba(0, 0, 0, 0.733), #1E94F3 15%, black 80%)",
    "radial-gradient(rgba(0, 0, 0, 0.733), #C46636 15%, black 80%)",
    "radial-gradient(rgba(0, 0, 0, 0.733), #543073 15%, black 80%)",
    "radial-gradient(rgba(0, 0, 0, 0.733), #4D2049 15%, black 80%)",
    "radial-gradient(rgba(0, 0, 0, 0.733), #1B2943 15%, black 80%)",
    "radial-gradient(rgba(0, 0, 0, 0.733), #E9800B 15%, black 80%)",
    "radial-gradient(rgba(0, 0, 0, 0.733), #14171F 15%, black 80%)",
    "radial-gradient(rgba(0, 0, 0, 0.733), #1C5674 15%, black 80%)",
    "radial-gradient(rgba(0, 0, 0, 0.733), #07203B 15%, black 80%)"
];

for(index = 0; index<=12; index++){
    cards[index] = document.querySelector(`.card${index}`);
}

console.log(cards);

cards.forEach((card, index) => {
    // Set initial scale and opacity
    gsap.set(card, { scale: 1, opacity: 1 });

    // Create a ScrollTrigger for each card
    ScrollTrigger.create({
        trigger: card,
        start: "top 15%", // The card will pin when its top reaches 15% of the viewport
        end: () => `+=${window.innerHeight}`, // Card remains pinned for the height of the viewport
        pin: true, // Pin the card
        pinSpacing: false, // Don't add extra space
        scrub: true, // Scrub ensures smooth scrolling animations
        markers: false, // Debugging markers (set to true if needed)
        onEnter: () => {
            card.style.zIndex = index - 1; // Bring the card to the front
            updation.innerHTML = `${index + 1 < 10 ? '0' : ''}${index + 1}/12`;
            // bg.style.backgroundImage = color[index + 1];   
            gsap.to(bg, {
                backgroundImage: color[index+1] ,
                duration: 0.5, // Set the animation duration for smoothness
                ease: "power1.inOut" // Smooth easing for the background transition
            });         
            
        },
        onLeave: () => {
        },
        onEnterBack: () => {
            card.style.zIndex = index - 1; // Bring the card back to the front when scrolling back
            updation.innerHTML = `${index + 1 < 10 ? '0' : ''}${index + 1}/12`;
            // bg.style.backgroundImage = color[index + 1];
            gsap.to(bg, {
                backgroundImage: color[index+1] ,
                duration: 0.5, // Set the animation duration for smoothness
                ease: "power1.inOut" // Smooth easing for the background transition
            }); 
        },
    });

    // Create a ScrollTrigger that controls the scale and opacity as the next card scrolls in
    if (cards[index + 1]) {
        let nextCard = cards[index + 1];
        // Scaling down the card as before
        gsap.to(card, {
            scale: 0.6, // Scale down the current card
            ease: "power1.out", // Smooth easing
            scrollTrigger: {
                trigger: nextCard,
                start: "top 85%", // When the next card's top reaches 85% of the viewport
                end: "top 15%", // When the next card reaches the center (15% from top)
                scrub: true, // Smooth transition tied to scroll position
                markers: false, // Debugging markers
            },
        });

        // Adding a slight delay to the opacity transition so it fades out after scaling completes
        gsap.to(card, {
            opacity: 0, // Fade out the current card
            ease: "power1.out", // Smooth easing
            scrollTrigger: {
                trigger: nextCard,
                start: "top 25%", // Opacity starts fading when the next card is further up
                end: "top 10%", // Opacity reaches 0 when the next card is almost centered
                scrub: true, // Smooth transition
                markers: false, // Debugging markers
            },
        });

    }
});

ScrollTrigger.create({
    trigger: ".main",
    start: "top top",
    end: "bottom top",
    onEnter: () => {
        updation.innerHTML = "00/12";  // When the home screen is in view
        gsap.to(bg, {
            backgroundImage: color[0] ,
            duration: 0.5, // Set the animation duration for smoothness
            ease: "power1.inOut" // Smooth easing for the background transition
        }); 
    },
    onEnterBack: () => {
        updation.innerHTML = "00/12";  // When scrolling back to the home screen
        gsap.to(bg, {
            backgroundImage: color[0] ,
            duration: 0.5, // Set the animation duration for smoothness
            ease: "power1.inOut" // Smooth easing for the background transition
        }); 
    },
});


cards[0].addEventListener("click", ()=>{
    window.location.href = "./Pages/aries.html"
});
cards[1].addEventListener("click", ()=>{
    window.location.href = "./Pages/tauras.html"
});
cards[2].addEventListener("click", ()=>{
    window.location.href = "./Pages/gemini.html"
});
cards[3].addEventListener("click", ()=>{
    window.location.href = "./Pages/cancer.html"
});
cards[4].addEventListener("click", ()=>{
    window.location.href = "./Pages/leo.html"
});
cards[5].addEventListener("click", ()=>{
    window.location.href = "./Pages/virgo.html"
});
cards[6].addEventListener("click", ()=>{
    window.location.href = "./Pages/libra.html"
});
cards[7].addEventListener("click", ()=>{
    window.location.href = "./Pages/scorpio.html"
});
cards[8].addEventListener("click", ()=>{
    window.location.href = "./Pages/sagitarius.html"
});
cards[9].addEventListener("click", ()=>{
    window.location.href = "./Pages/capricorn.html"
});
cards[10].addEventListener("click", ()=>{
    window.location.href = "./Pages/aquarius.html"
});
cards[11].addEventListener("click", ()=>{
    window.location.href = "./Pages/pieces.html"
});