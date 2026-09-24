import assert from "node:assert/strict";
import test from "node:test";

import {
  DESTINATIONS,
  STORAGE_KEY,
  chooseDestination,
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

test("maps random values to all three destinations", () => {
  assert.deepEqual(
    [0, 1, 2].map((value) => chooseDestination((target) => { target[0] = value; }).key),
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

  assert.equal(first.destination.key, "taichung");
  assert.equal(first.restored, false);
  assert.equal(second.destination.key, "taichung");
  assert.equal(second.restored, true);
  assert.equal(draws, 1);
});

test("provides destination details for every city", () => {
  for (const destination of DESTINATIONS) {
    assert.ok(destination.city);
    assert.ok(destination.country);
    assert.ok(destination.arrival);
    assert.ok(destination.image);
  }
});