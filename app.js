import { DESTINATIONS, getOrCreateDestination, readStoredDestination } from "./destinations.js";

const experience = document.querySelector(".experience");
const revealButton = document.querySelector("#reveal-button");
const shuffleCode = document.querySelector("#shuffle-code");
const shuffleCity = document.querySelector("#shuffle-city");
const announcement = document.querySelector("#announcement");
const planButton = document.querySelector("#plan-button");
const cityPlan = document.querySelector("#city-plan");
const planDays = document.querySelector("#plan-days");
const planDestinationSelect = document.querySelector("#plan-destination");
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

function renderTravelMeta(destination) {
  const note = document.querySelector(".pass__note");
  const existingMeta = document.querySelector(".pass__meta");
  if (existingMeta) existingMeta.remove();

  const meta = document.createElement("div");
  meta.className = "pass__meta";

  const flights = destination.flight.primary.split("/").map((segment) => {
    const match = segment.trim().match(/^(.+?)\s+\(([^)]+)\)$/);
    return {
      number: match?.[1] || segment.trim(),
      time: match?.[2] || "時間待確認",
    };
  });
  const alternatives = (destination.flight.backup || "").split("/").map((segment) => segment.trim());
  const cards = ["出發", "回程"].map((label, index) => ({
    label,
    value: flights[index]?.number || "航班待確認",
    time: flights[index]?.time || "時間待確認",
    alternative: alternatives[index] && alternatives[index].toUpperCase() !== "N/A"
      ? `備選 ${alternatives[index]}`
      : "",
  }));

  for (const card of cards) {
    const article = document.createElement("article");
    article.className = "detail-card detail-card--flight";

    const label = document.createElement("span");
    label.className = "pass__label";
    label.textContent = card.label;

    const value = document.createElement("strong");
    value.textContent = card.value;

    const time = document.createElement("small");
    time.textContent = card.time;

    article.append(label, value, time);
    if (card.alternative) {
      const alternative = document.createElement("small");
      alternative.className = "detail-card__alternative";
      alternative.textContent = card.alternative;
      article.append(alternative);
    }
    meta.append(article);
  }

  note.before(meta);
  note.textContent = "航班 · 行程已確認";
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
  renderTravelMeta(destination);
  renderCityPlan(destination);
  cityPlan.hidden = true;
  planButton.setAttribute("aria-expanded", "false");
}

function renderCityPlan(destination) {
  planDestinationSelect.value = destination.key;
  document.querySelector("#plan-city").textContent = destination.city;
  document.querySelector("#plan-description").textContent = destination.planIntro;
  planDays.replaceChildren(
    createFlightBoundary("departure", destination),
    ...destination.days.flatMap((day, index) => [
      createDayPlan(day, index),
      index === 0 ? createStayCard(destination) : null,
    ]).filter(Boolean),
    createFlightBoundary("return", destination),
  );
}

function createFlightBoundary(type, destination) {
  const outbound = type === "departure";
  const [outboundFlight, returnFlight] = destination.flight.primary
    .split("/")
    .map((segment) => segment.trim().match(/^(.+?)\s+\(([^)]+)\)$/));
  const flight = (outbound ? outboundFlight : returnFlight) || [];

  const article = document.createElement("article");
  article.className = `itinerary-flight itinerary-flight--${type}`;
  article.setAttribute("aria-label", outbound ? "去程航班" : "回程航班");

  const label = document.createElement("span");
  label.className = "itinerary-flight__label";
  label.textContent = outbound ? "出發航班 · 星期六 9月26日" : "回程航班 · 星期日 9月27日";

  const route = document.createElement("div");
  route.className = "itinerary-flight__route";
  const origin = document.createElement("div");
  const originCode = document.createElement("strong");
  originCode.textContent = outbound ? "HKG" : destination.arrival;
  const originName = document.createElement("small");
  originName.textContent = outbound ? "香港" : destination.city;
  origin.append(originCode, originName);

  const arrow = document.createElement("span");
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = outbound ? "→" : "→";

  const arrival = document.createElement("div");
  const arrivalCode = document.createElement("strong");
  arrivalCode.textContent = outbound ? destination.arrival : "HKG";
  const arrivalName = document.createElement("small");
  arrivalName.textContent = outbound ? destination.city : "香港";
  arrival.append(arrivalCode, arrivalName);
  route.append(origin, arrow, arrival);

  const details = document.createElement("p");
  const flightNumber = document.createElement("strong");
  flightNumber.textContent = flight[1] || "航班待確認";
  const flightTime = document.createElement("span");
  flightTime.textContent = flight[2] || "時間待確認";
  details.append(flightNumber, flightTime);

  article.append(label, route, details);
  return article;
}

function createStayCard(destination) {
  const article = document.createElement("article");
  article.className = "day-plan day-plan--stay";

  const label = document.createElement("span");
  label.className = "day-plan--stay__label";
  label.textContent = "住宿 · 1 晚";
  const details = document.createElement("div");
  const heading = document.createElement("h3");
  heading.textContent = destination.hotel_area;
  const note = document.createElement("p");
  note.textContent = "第 1 天結束後入住，第 2 天從這裡出發。";
  details.append(heading, note);

  article.append(label, details);
  return article;
}

function createDayPlan(day, index) {
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
    const titleRow = document.createElement("div");
    titleRow.className = "route-stop-heading";
    titleRow.append(name);
    if (stop.url) {
      const mapLink = document.createElement("a");
      mapLink.className = "route-stop-map";
      mapLink.href = stop.url;
      mapLink.target = "_blank";
      mapLink.rel = "noreferrer";
      mapLink.setAttribute("aria-label", `在 Google 地圖查看 ${stop.name}`);
      mapLink.textContent = "↗";
      titleRow.append(mapLink);
    }
    details.append(titleRow, note);
    item.append(time, details);
    stops.append(item);
  }

  const meals = createMealPlan(day);

  article.append(header, stops, meals);
  if (day.url) {
    const mapLink = document.createElement("a");
    mapLink.className = "map-link";
    mapLink.href = day.url;
    mapLink.target = "_blank";
    mapLink.rel = "noreferrer";
    mapLink.textContent = `在地圖開啟第 ${index + 1} 天路線 ↗`;
    article.append(mapLink);
  }
  return article;
}

function createMealPlan(day) {
  const section = document.createElement("section");
  section.className = "meal-plan";
  section.setAttribute("aria-label", "用餐安排");

  const heading = document.createElement("h4");
  heading.textContent = "用餐安排";
  section.append(heading);

  for (const [key, label] of [["breakfast", "早餐"], ["lunch", "午餐"], ["teatime", "下午茶"], ["dinner", "晚餐"]]) {
    const meal = day.meals?.[key];
    if (!meal) continue;

    const item = document.createElement("article");
    item.className = "meal-plan__item";

    const schedule = document.createElement("div");
    schedule.className = "meal-plan__schedule";
    const mealLabel = document.createElement("span");
    mealLabel.textContent = label;
    const time = document.createElement("time");
    time.textContent = meal.time;
    schedule.append(mealLabel, time);

    const details = document.createElement("div");
    details.className = "meal-plan__details";
    const name = document.createElement("strong");
    name.textContent = meal.name;
    const note = document.createElement("p");
    if (meal.choices?.length) {
      meal.choices.forEach((choice, index) => {
        if (index > 0) note.append(" / ");
        const choiceName = typeof choice === "string" ? choice : choice.name;
        if (choice.url) {
          const mapLink = document.createElement("a");
          mapLink.className = "meal-plan__map-link";
          mapLink.href = choice.url;
          mapLink.target = "_blank";
          mapLink.rel = "noreferrer";
          mapLink.textContent = choiceName;
          mapLink.setAttribute("aria-label", `在 Google 地圖查看 ${choiceName}`);
          note.append(mapLink);
        } else {
          note.append(choiceName);
        }
      });
    } else {
      note.textContent = meal.note || "";
    }
    details.append(name, note);

    item.append(schedule, details);
    section.append(item);
  }

  return section;
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

planDestinationSelect.replaceChildren(...DESTINATIONS.map((destination) => {
  const option = document.createElement("option");
  option.value = destination.key;
  option.textContent = destination.city;
  return option;
}));
planDestinationSelect.addEventListener("change", () => {
  const destination = DESTINATIONS.find(({ key }) => key === planDestinationSelect.value);
  if (!destination) return;
  renderCityPlan(destination);
  announcement.textContent = `正在查看${destination.city}的行程，已確認目的地保持不變。`;
});

revealButton.addEventListener("click", beginReveal);

const storedDestination = readStoredDestination(localStorage);
if (storedDestination) showReveal(getOrCreateDestination(localStorage).destination, false);
else setState("invitation");