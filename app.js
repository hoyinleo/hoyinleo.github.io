import { createMapsUrl, DESTINATIONS, getOrCreateDestination, readStoredDestination } from "./destinations.js";

const experience = document.querySelector(".experience");
const revealButton = document.querySelector("#reveal-button");
const shuffleCode = document.querySelector("#shuffle-code");
const shuffleCity = document.querySelector("#shuffle-city");
const announcement = document.querySelector("#announcement");
const planButton = document.querySelector("#plan-button");
const cityPlan = document.querySelector("#city-plan");
const planDays = document.querySelector("#plan-days");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let activeDestination = null;
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
  activeDestination = destination;
  const photo = document.querySelector("#destination-photo");
  photo.src = destination.image;
  photo.alt = `${destination.city}的黃昏景色`;
  photo.style.objectPosition = destination.focalPoint;
  document.querySelector("#destination-city").textContent = destination.city;
  document.querySelector("#destination-country").textContent = destination.country;
  document.querySelector("#destination-line").textContent = destination.line;
  document.querySelector("#pass-code").textContent = destination.arrival;
  document.querySelector("#pass-city").textContent = destination.city;
  document.querySelector("#plan-city").textContent = destination.city;
  planDays.replaceChildren(...destination.days.map((day, index) => createDayPlan(day, destination.city, index)));
  cityPlan.hidden = true;
  planButton.setAttribute("aria-expanded", "false");
}

function createDayPlan(day, city, index) {
  const article = document.createElement("article");
  article.className = "day-plan";

  const header = document.createElement("header");
  const dayNumber = document.createElement("span");
  dayNumber.textContent = `第 ${index + 1} 天`;
  const heading = document.createElement("h3");
  heading.textContent = day.title;
  const date = document.createElement("p");
  date.textContent = day.date;
  header.append(dayNumber, heading, date);

  const stops = document.createElement("ol");
  stops.className = "route-stops";
  for (const stop of day.stops) {
    const item = document.createElement("li");
    const time = document.createElement("time");
    time.textContent = stop.time;
    const details = document.createElement("div");
    const name = document.createElement("strong");
    name.textContent = stop.name;
    const note = document.createElement("p");
    note.textContent = stop.note;
    details.append(name, note);
    item.append(time, details);
    stops.append(item);
  }

  const mapLink = document.createElement("a");
  mapLink.className = "map-link";
  mapLink.href = createMapsUrl(day, city);
  mapLink.target = "_blank";
  mapLink.rel = "noreferrer";
  mapLink.textContent = `在地圖開啟第 ${index + 1} 天路線 ↗`;
  article.append(header, stops, mapLink);
  return article;
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
    for (const item of [...sequence, ...sequence]) {
      shuffleCode.textContent = item.arrival;
      shuffleCity.textContent = item.city;
      await new Promise((resolve) => window.setTimeout(resolve, 180));
    }
  } else {
    await new Promise((resolve) => window.setTimeout(resolve, 250));
  }

  showReveal(destination);
}

planButton.addEventListener("click", () => {
  cityPlan.hidden = false;
  planButton.setAttribute("aria-expanded", "true");
  cityPlan.scrollIntoView({ behavior: prefersReducedMotion.matches ? "auto" : "smooth" });
});

revealButton.addEventListener("click", beginReveal);

const storedDestination = readStoredDestination(localStorage);
if (storedDestination) showReveal(storedDestination, false);
else setState("invitation");