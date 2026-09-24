import { DESTINATIONS, getOrCreateDestination, readStoredDestination } from "./destinations.js";

const experience = document.querySelector(".experience");
const revealButton = document.querySelector("#reveal-button");
const shuffleCode = document.querySelector("#shuffle-code");
const shuffleCity = document.querySelector("#shuffle-city");
const announcement = document.querySelector("#announcement");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let drawing = false;

function setState(state) {
  experience.dataset.state = state;
  const activePanel = {
    invitation: "invitation",
    shuffling: "shuffle",
    revealed: "reveal",
  }[state];
  document.querySelectorAll(".panel").forEach((panel) => {
    panel.setAttribute("aria-hidden", String(!panel.classList.contains(activePanel)));
  });
}

function populateReveal(destination) {
  const photo = document.querySelector("#destination-photo");
  photo.src = destination.image;
  photo.alt = `${destination.city}的黃昏景色`;
  photo.style.objectPosition = destination.focalPoint;
  document.querySelector("#destination-city").textContent = destination.city;
  document.querySelector("#destination-country").textContent = destination.country;
  document.querySelector("#destination-line").textContent = destination.line;
  document.querySelector("#pass-code").textContent = destination.arrival;
  document.querySelector("#pass-city").textContent = destination.city;
}

function showReveal(destination, announce = true) {
  populateReveal(destination);
  setState("revealed");
  if (announce) announcement.textContent = `你的目的地是${destination.city}。`;
}

async function beginReveal() {
  if (drawing) return;
  drawing = true;
  revealButton.disabled = true;

  const { destination } = getOrCreateDestination(localStorage);
  populateReveal(destination);
  setState("shuffling");

  if (!prefersReducedMotion.matches) {
    const sequence = [...DESTINATIONS, ...DESTINATIONS, destination];
    for (const item of sequence) {
      shuffleCode.textContent = item.arrival;
      shuffleCity.textContent = item.city;
      await new Promise((resolve) => window.setTimeout(resolve, 180));
    }
  } else {
    await new Promise((resolve) => window.setTimeout(resolve, 250));
  }

  showReveal(destination);
}

revealButton.addEventListener("click", beginReveal);

const storedDestination = readStoredDestination(localStorage);
if (storedDestination) showReveal(storedDestination, false);
else setState("invitation");