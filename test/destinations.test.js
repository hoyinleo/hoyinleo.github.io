import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

import {
  DESTINATIONS,
  STORAGE_KEY,
  chooseDestination,
  createMapsUrl,
  createPlaceMapsUrl,
  getOrCreateDestination,
  readStoredDestination,
} from "../destinations.js";

function createStorage(initialValue = null) {
  const values = new Map();
  if (initialValue !== null) values.set(STORAGE_KEY, initialValue);

  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };
}

test("maps random values to all four destinations", () => {
  assert.deepEqual(
    [0, 1, 2, 3].map((value) => chooseDestination((target) => { target[0] = value; }).key),
    DESTINATIONS.map(({ key }) => key),
  );
});

test("rejects malformed and unknown stored values", () => {
  assert.equal(readStoredDestination(createStorage("not json")), null);
  assert.equal(
    readStoredDestination(createStorage(JSON.stringify({ version: 1, destination: "paris" }))),
    null,
  );
});

test("stores the first choice and restores it without drawing again", () => {
  const storage = createStorage();
  let draws = 0;
  const randomValues = (target) => {
    draws += 1;
    target[0] = 1;
  };

  const first = getOrCreateDestination(storage, randomValues);
  const second = getOrCreateDestination(storage, randomValues);

  assert.equal(first.destination.key, "taipei");
  assert.equal(first.restored, false);
  assert.equal(second.destination.key, "taipei");
  assert.equal(second.restored, true);
  assert.equal(draws, 1);
});

test("keeps the final asset names and richer trip metadata in sync", () => {
  for (const destination of DESTINATIONS) {
    assert.ok(destination.flight?.primary, `${destination.city} is missing a primary flight`);
    assert.ok(destination.hotel_area, `${destination.city} is missing hotel details`);
    assert.ok(destination.itinerary?.length >= 1, `${destination.city} is missing itinerary details`);
    const assetPath = path.join(process.cwd(), destination.image.replace(/^\.?\//, ""));
    assert.ok(fs.existsSync(assetPath), `${destination.city} image is missing: ${destination.image}`);
  }
});

test("includes airport transport on arrival and departure for every destination", () => {
  for (const destination of DESTINATIONS) {
    for (const day of ["Saturday", "Sunday"]) {
      assert.ok(
        destination.itinerary.some((event) =>
          event.day === day
          && event.category.includes("交通")
          && /機場/.test(`${event.name} ${event.description}`),
        ),
        `${destination.city} is missing ${day} airport transport`,
      );
    }
  }
});

test("provides a relaxed two-day route with map links for every city", () => {
  for (const destination of DESTINATIONS) {
    assert.equal(destination.days.length, 2);
    for (const day of destination.days) {
      assert.ok(day.stops.length >= 1);
      assert.ok(day.meals.breakfast, `${destination.city} is missing breakfast for ${day.date}`);
      assert.ok(day.meals.lunch, `${destination.city} is missing lunch for ${day.date}`);
      assert.ok(day.meals.dinner, `${destination.city} is missing dinner for ${day.date}`);
      assert.match(createMapsUrl(day, destination.city), /^https:\/\/www\.google\.com\/maps\/dir\/\?/);
      const placeUrl = new URL(createPlaceMapsUrl(day.stops[0].name, destination.city));
      assert.equal(placeUrl.pathname, "/maps/search/");
      assert.equal(placeUrl.searchParams.get("query"), `${day.stops[0].name}, ${destination.city}`);
    }
  }
});

test("derives expanded day stops from itineraries and includes meal choices", () => {
  for (const destination of DESTINATIONS) {
    assert.ok(destination.itinerary.length >= 7, `${destination.city} itinerary is not expanded`);
    assert.equal(
      destination.itinerary.some((event) => event.category === "餐飲"),
      false,
      `${destination.city} itinerary should leave meals to the meal section`,
    );

    for (const [index, day] of destination.days.entries()) {
      const dayName = index === 0 ? "Saturday" : "Sunday";
      const expectedStops = destination.itinerary.filter(
        (event) => event.day === dayName,
      );
      assert.equal(day.stops.length, expectedStops.length);
    }

    assert.ok(
      destination.days.some((day) => day.meals.teatime?.choices?.length),
      `${destination.city} is missing teatime choices`,
    );
  }

  const bangkok = DESTINATIONS.find(({ key }) => key === "bangkok");
  const spaStop = bangkok.days[1].stops.find(({ name }) => name.includes("SPA"));
  assert.match(spaStop.note, /Divana Scentuara Spa/);
  assert.match(spaStop.note, /Let's Relax Spa/);
  assert.match(spaStop.note, /Panpuri Wellness/);
  assert.equal(bangkok.days[1].meals.spa, undefined);

  const kaohsiung = DESTINATIONS.find(({ key }) => key === "khh");
  const hamasenStop = kaohsiung.itinerary.find(({ time }) => time === "15:30 - 17:00");
  assert.equal(hamasenStop.name, "哈瑪星鐵道文化園區");
  assert.match(hamasenStop.description, /大港橋.*旗津夕陽散步/);
  assert.match(
    kaohsiung.itinerary.find(({ name }) => name.includes("高雄市立圖書館")).description,
    /營運狀況請於出發前確認/,
  );

  const taipei = DESTINATIONS.find(({ key }) => key === "taipei");
  assert.deepEqual(taipei.days[0].meals.dinner.choices, [
    "MUME (歐陸料理)",
    "logy",
    "Impromptu by Paul Lee",
    "Ad Astra",
  ]);

  assert.ok(bangkok.days[0].meals.dinner.choices.includes("Nusara"));
  assert.equal(bangkok.days[0].meals.dinner.choices.some((choice) => choice.includes("Sorn")), false);

  const seoul = DESTINATIONS.find(({ key }) => key === "seoul");
  assert.equal(
    seoul.itinerary.find(({ name }) => name.includes("北村韓屋村")).time,
    "10:00 - 12:00",
  );
  assert.equal(seoul.itinerary.some(({ name }) => name.includes("GoTo Mall")), false);
  assert.ok(seoul.days[0].stops.some(({ name }) => name.includes("聖水洞")));
});