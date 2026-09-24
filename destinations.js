export const STORAGE_KEY = "potato-private-journey:v1";

function itineraryToDays(itinerary) {
  const grouped = new Map();

  for (const event of itinerary) {
    const dayName = event.day;
    if (!grouped.has(dayName)) {
      grouped.set(dayName, {
        date: dayName === "Saturday" ? "星期六 · 9月26日" : "星期日 · 9月27日",
        title: dayName === "Saturday" ? "輕鬆週六" : "悠閒週日",
        stops: [],
      });
    }

    grouped.get(dayName).stops.push({
      time: event.time.split(" - ")[0],
      name: event.name,
      note: event.description,
    });
  }

  return [...grouped.values()];
}

export const DESTINATIONS = Object.freeze([
  Object.freeze({
    key: "khh",
    city: "高雄 (Kaohsiung)",
    country: "台灣",
    arrival: "KHH",
    line: "海風和熱鬧街景，慢慢感受城市的節奏。",
    image: "./assets/taichung.jpg",
    focalPoint: "center center",
    hotel_area: "鹽埕區 / 前鎮區（近高雄港灣，環境休閒，方便行文創區及海邊）",
    itinerary: [
      {
        day: "Saturday",
        time: "14:00 - 17:00",
        name: "駁二藝術特區 (文創手作 / 獨立設計小店)",
        category: "景點/購物",
        description: "舊倉庫改建文創園區，適合散步、逛手作設計小店及看海景。",
        url: "https://maps.google.com/?cid=12683955627221081586",
      },
      {
        day: "Saturday",
        time: "17:00 - 18:30",
        name: "高雄流行音樂中心",
        category: "景點",
        description: "沿愛河灣散步，欣賞日落與現代建築地標。",
        url: "https://maps.google.com/?cid=14328514104278453457",
      },
      {
        day: "Saturday",
        time: "19:30 - 22:00",
        name: "THOMAS CHIEN RESTAURANT",
        category: "餐飲",
        description: "高級法式精緻餐飲，高雄頂級求婚/生日首選餐廳。",
        url: "https://maps.google.com/?cid=14889269557434523554",
      },
      {
        day: "Sunday",
        time: "10:00 - 12:30",
        name: "旗津區",
        category: "景點",
        description: "搭 5 分鐘渡輪到旗津吹海風、看燈塔，享受輕鬆港都風情。",
        url: "https://maps.google.com/?cid=18290264024626100953",
      },
    ],
    days: itineraryToDays([
      {
        day: "Saturday",
        time: "14:00 - 17:00",
        name: "駁二藝術特區 (文創手作 / 獨立設計小店)",
        description: "舊倉庫改建文創園區，適合散步、逛手作設計小店及看海景。",
      },
      {
        day: "Saturday",
        time: "17:00 - 18:30",
        name: "高雄流行音樂中心",
        description: "沿愛河灣散步，欣賞日落與現代建築地標。",
      },
      {
        day: "Saturday",
        time: "19:30 - 22:00",
        name: "THOMAS CHIEN RESTAURANT",
        description: "高級法式精緻餐飲，高雄頂級求婚/生日首選餐廳。",
      },
      {
        day: "Sunday",
        time: "10:00 - 12:30",
        name: "旗津區",
        description: "搭 5 分鐘渡輪到旗津吹海風、看燈塔，享受輕鬆港都風情。",
      },
    ]),
  }),
  Object.freeze({
    key: "taipei",
    city: "台北 (Taipei)",
    country: "台灣",
    arrival: "TPE",
    line: "河岸晚風、街角咖啡，還有一點點城市冒險。",
    image: "./assets/hong-kong.jpg",
    focalPoint: "center center",
    hotel_area: "大安區 / 信義區（交通極方便，鄰近高級餐廳與精緻商圈）",
    itinerary: [
      {
        day: "Saturday",
        time: "14:00 - 16:30",
        name: "華山1914文化創意產業園區",
        category: "景點/購物",
        description: "經典文青景點，有大量展覽、獨立品牌選物店及手作小店。",
        url: "https://maps.google.com/?cid=17422499956913495153",
      },
      {
        day: "Saturday",
        time: "16:30 - 18:30",
        name: "誠品生活松菸店",
        category: "購物",
        description: "集結台灣原創設計、質感生活用品、香氛及文具。",
        url: "https://maps.google.com/?cid=707633478795868600",
      },
      {
        day: "Saturday",
        time: "19:30 - 22:00",
        name: "MUME",
        category: "餐飲",
        description: "米芝蓮一星現代歐陸料理，氣氛浪漫燭光美酒。",
        url: "https://maps.google.com/?cid=30843212879507871",
      },
      {
        day: "Sunday",
        time: "09:30 - 11:30",
        name: "象山步道",
        category: "景點",
        description: "晨間輕鬆散步，遠眺台北 101 與城市全景。",
        url: "https://maps.google.com/?cid=7929780517551711520",
      },
    ],
    days: itineraryToDays([
      {
        day: "Saturday",
        time: "14:00 - 16:30",
        name: "華山1914文化創意產業園區",
        description: "經典文青景點，有大量展覽、獨立品牌選物店及手作小店。",
      },
      {
        day: "Saturday",
        time: "16:30 - 18:30",
        name: "誠品生活松菸店",
        description: "集結台灣原創設計、質感生活用品、香氛及文具。",
      },
      {
        day: "Saturday",
        time: "19:30 - 22:00",
        name: "MUME",
        description: "米芝蓮一星現代歐陸料理，氣氛浪漫燭光美酒。",
      },
      {
        day: "Sunday",
        time: "09:30 - 11:30",
        name: "象山步道",
        description: "晨間輕鬆散步，遠眺台北 101 與城市全景。",
      },
    ]),
  }),
  Object.freeze({
    key: "bangkok",
    city: "曼谷 (Bangkok)",
    country: "泰國",
    arrival: "BKK",
    line: "金色夕陽、晚一點的晚餐，還有入夜後的活力。",
    image: "./assets/bangkok.jpg",
    focalPoint: "52% center",
    hotel_area: "Sukhumvit (Soi 53 / 55 通羅區) 或 河畔區 (Chao Phraya Riverside)",
    itinerary: [
      {
        day: "Saturday",
        time: "14:00 - 16:30",
        name: "Siam Paragon",
        category: "購物",
        description: "冷氣極足的高端商場，可逛泰國本土香薰品牌及國際精品。",
        url: "https://maps.google.com/?cid=11476178565854079331",
      },
      {
        day: "Saturday",
        time: "16:30 - 18:30",
        name: "ICONSIAM",
        category: "購物",
        description: "河畔奢華地標商場，內有室內水上市場及泰國特色選物。",
        url: "https://maps.google.com/?cid=1612497051803357940",
      },
      {
        day: "Saturday",
        time: "19:30 - 22:00",
        name: "Gaa",
        category: "餐飲",
        description: "米芝蓮星級前衛精緻餐飲，位於傳統泰式大宅內。",
        url: "https://maps.google.com/?cid=3827914840427442108",
      },
      {
        day: "Sunday",
        time: "09:00 - 11:00",
        name: "大皇宮 (The Grand Palace)",
        category: "景點",
        description: "晨間參觀泰國標誌性皇宮建築，感受東南亞宮廷文化。",
        url: "https://maps.google.com/?cid=3061266857947704385",
      },
    ],
    days: itineraryToDays([
      {
        day: "Saturday",
        time: "14:00 - 16:30",
        name: "Siam Paragon",
        description: "冷氣極足的高端商場，可逛泰國本土香薰品牌及國際精品。",
      },
      {
        day: "Saturday",
        time: "16:30 - 18:30",
        name: "ICONSIAM",
        description: "河畔奢華地標商場，內有室內水上市場及泰國特色選物。",
      },
      {
        day: "Saturday",
        time: "19:30 - 22:00",
        name: "Gaa",
        description: "米芝蓮星級前衛精緻餐飲，位於傳統泰式大宅內。",
      },
      {
        day: "Sunday",
        time: "09:00 - 11:00",
        name: "大皇宮 (The Grand Palace)",
        description: "晨間參觀泰國標誌性皇宮建築，感受東南亞宮廷文化。",
      },
    ]),
  }),
  Object.freeze({
    key: "seoul",
    city: "首爾 (Seoul)",
    country: "韓國",
    arrival: "ICN",
    line: "霓虹夜色、安靜早晨，還有值得慢慢探索的街區。",
    image: "./assets/seoul.jpg",
    focalPoint: "58% center",
    hotel_area: "清潭洞 / 江南區，或 弘大 / 明洞周邊（方便掃貨及前往高級餐廳）",
    itinerary: [
      {
        day: "Saturday",
        time: "13:00 - 14:30",
        name: "Olive Young 明洞總店",
        category: "購物",
        description: "K-Beauty 美妝護膚旗艦店，貨源最齊可即時退稅。",
        url: "https://maps.google.com/?q=Olive+Young+Myeongdong+Town",
      },
      {
        day: "Saturday",
        time: "14:30 - 16:30",
        name: "高速巴士客運站地下街 (GoTo Mall)",
        category: "購物",
        description: "超平民女裝天堂，平價流行衣服集中地。",
        url: "https://maps.google.com/?q=Express+Bus+Terminal+Underground+Shopping+Center",
      },
      {
        day: "Saturday",
        time: "16:30 - 18:30",
        name: "弘大購物街",
        category: "購物",
        description: "年輕潮流服飾、韓系潮牌及個性小店街區。",
        url: "https://maps.google.com/?q=Hongdae+Shopping+Street",
      },
      {
        day: "Saturday",
        time: "19:30 - 22:00",
        name: "Mingles",
        category: "餐飲",
        description: "米芝蓮三星新派韓式 Fine Dining，極具質感風格。",
        url: "https://maps.google.com/?cid=14962252277158308427",
      },
      {
        day: "Sunday",
        time: "09:30 - 11:30",
        name: "北村韓屋村",
        category: "景點",
        description: "星期日早晨漫步傳統韓屋巷弄，拍照打卡十分愜意。",
        url: "https://maps.google.com/?cid=15926527581702415770",
      },
    ],
    days: itineraryToDays([
      {
        day: "Saturday",
        time: "13:00 - 14:30",
        name: "Olive Young 明洞總店",
        description: "K-Beauty 美妝護膚旗艦店，貨源最齊可即時退稅。",
      },
      {
        day: "Saturday",
        time: "14:30 - 16:30",
        name: "高速巴士客運站地下街 (GoTo Mall)",
        description: "超平民女裝天堂，平價流行衣服集中地。",
      },
      {
        day: "Saturday",
        time: "16:30 - 18:30",
        name: "弘大購物街",
        description: "年輕潮流服飾、韓系潮牌及個性小店街區。",
      },
      {
        day: "Saturday",
        time: "19:30 - 22:00",
        name: "Mingles",
        description: "米芝蓮三星新派韓式 Fine Dining，極具質感風格。",
      },
      {
        day: "Sunday",
        time: "09:30 - 11:30",
        name: "北村韓屋村",
        description: "星期日早晨漫步傳統韓屋巷弄，拍照打卡十分愜意。",
      },
    ]),
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