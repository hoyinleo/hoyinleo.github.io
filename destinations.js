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
    days: [
      {
        date: "星期六 · 9月26日",
        title: "輕鬆逛首爾",
        stops: [
          { time: "11:30", name: "首爾林", note: "抵達後先放慢腳步，在樹蔭下散散步。" },
          { time: "14:00", name: "聖水洞", note: "喝杯咖啡、逛逛小店，不設固定行程。" },
          { time: "18:30", name: "漢南洞", note: "看過黃昏，再慢慢享用晚餐。" },
        ],
      },
      {
        date: "星期日 · 9月27日",
        title: "老街與悠閒早晨",
        stops: [
          { time: "10:00", name: "西村", note: "在安靜小巷與韓屋之間吃頓早午餐。" },
          { time: "12:30", name: "景福宮", note: "只選一個漂亮景點，照自己的步調慢慢看。" },
          { time: "15:00", name: "清溪川", note: "回程前沿著河道輕鬆走一段。" },
        ],
      },
    ],
  }),
  Object.freeze({
    key: "taichung",
    city: "台中",
    country: "台灣",
    arrival: "RMQ",
    line: "悠閒午後、熱鬧夜市，留點時間隨意走走。",
    image: "./assets/taichung.jpg",
    focalPoint: "center center",
    days: [
      {
        date: "星期六 · 9月26日",
        title: "藝術與好味道",
        stops: [
          { time: "11:30", name: "臺中國家歌劇院", note: "從建築、咖啡和寬敞空間開始一天。" },
          { time: "14:30", name: "草悟道", note: "沿著綠蔭散步，順道逛逛勤美誠品。" },
          { time: "18:00", name: "審計新村", note: "看看小店和工作室，再到附近慢慢吃晚餐。" },
        ],
      },
      {
        date: "星期日 · 9月27日",
        title: "經典台中",
        stops: [
          { time: "09:30", name: "台中第二市場", note: "趁街道還沒熱鬧起來，先吃一頓地道早餐。" },
          { time: "11:30", name: "宮原眼科", note: "看看漂亮老建築，再一起分享一客冰淇淋。" },
          { time: "14:00", name: "柳川水岸步道", note: "在市中心附近，用安靜的河畔散步作結。" },
        ],
      },
    ],
  }),
  Object.freeze({
    key: "bangkok",
    city: "曼谷",
    country: "泰國",
    arrival: "BKK",
    line: "金色夕陽、晚一點的晚餐，還有入夜後的活力。",
    image: "./assets/bangkok.jpg",
    focalPoint: "52% center",
    days: [
      {
        date: "星期六 · 9月26日",
        title: "河畔曼谷",
        stops: [
          { time: "11:30", name: "噠叻仔", note: "喝杯咖啡，看看老店屋，慢慢拍照散步。" },
          { time: "14:30", name: "曼谷河城藝術中心", note: "吹吹冷氣、看看藝術，再欣賞河景。" },
          { time: "18:00", name: "嵩越路", note: "傍晚隨意逛逛，然後好好吃一頓晚餐。" },
        ],
      },
      {
        date: "星期日 · 9月27日",
        title: "悠閒星期日",
        stops: [
          { time: "10:00", name: "阿里區", note: "避開人潮，在悠閒社區吃頓早午餐。" },
          { time: "12:30", name: "金湯普森故居博物館", note: "在花園裡安排一個安靜的文化景點。" },
          { time: "15:00", name: "倫披尼公園", note: "在樹蔭與湖邊散步，不急著去任何地方。" },
        ],
      },
    ],
  }),
]);

export function createMapsUrl(day, city) {
  const places = day.stops.map(({ name }) => `${name}, ${city}`);
  const parameters = new URLSearchParams({
    api: "1",
    origin: places[0],
    destination: places.at(-1),
    travelmode: "transit",
  });
  if (places.length > 2) parameters.set("waypoints", places.slice(1, -1).join("|"));
  return `https://www.google.com/maps/dir/?${parameters}`;
}

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