export const STORAGE_KEY = "potato-private-journey:v1";

export const DESTINATIONS = Object.freeze([
  Object.freeze({
    key: "seoul",
    city: "首爾",
    country: "韓國",
    arrival: "ICN",
    line: "霓虹夜色、安靜早晨，還有值得慢慢探索的街區。",
    image: "./assets/seoul.jpg",
    focalPoint: "58% center",
  }),
  Object.freeze({
    key: "taipei",
    city: "台北",
    country: "台灣",
    arrival: "TPE",
    line: "河岸晚風、街角咖啡，還有一點點城市冒險。",
    image: "./assets/taichung.jpg",
    focalPoint: "center center",
  }),
  Object.freeze({
    key: "khh",
    city: "高雄",
    country: "台灣",
    arrival: "KHH",
    line: "海風和熱鬧街景，慢慢感受城市的節奏。",
    image: "./assets/taichung.jpg",
    focalPoint: "center center",
  }),
  Object.freeze({
    key: "bangkok",
    city: "曼谷",
    country: "泰國",
    arrival: "BKK",
    line: "金色夕陽、晚一點的晚餐，還有入夜後的活力。",
    image: "./assets/bangkok.jpg",
    focalPoint: "52% center",
  }),
]);

export function getDestination(key) {
  return DESTINATIONS.find((destination) => destination.key === key) ?? null;
}

export function readStoredDestination(storage) {
  try {
    const value = JSON.parse(storage.getItem(STORAGE_KEY));
    return value?.version === 1 ? getDestination(value.destination) : null;
  } catch {
    return null;
  }
}

export function chooseDestination(randomValues = crypto.getRandomValues.bind(crypto)) {
  const limit = Math.floor(0x100000000 / DESTINATIONS.length) * DESTINATIONS.length;
  const values = new Uint32Array(1);

  do {
    randomValues(values);
  } while (values[0] >= limit);

  return DESTINATIONS[values[0] % DESTINATIONS.length];
}

export function getOrCreateDestination(storage, randomValues) {
  const stored = readStoredDestination(storage);
  if (stored) return { destination: stored, restored: true };

  const destination = chooseDestination(randomValues);
  storage.setItem(
    STORAGE_KEY,
    JSON.stringify({ version: 1, destination: destination.key }),
  );

  return { destination, restored: false };
}