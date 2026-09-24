export const STORAGE_KEY = "potato-private-journey:v1";

function itineraryToDays(itinerary, meals = {}) {
  const grouped = new Map();

  // 1. 初始化星期六與星期日
  const daysMap = {
    Saturday: {
      date: "星期六 · 9月26日",
      title: "輕鬆週六 · 購物與奢華晚宴",
      meals: meals.Saturday || {},
      stops: [],
    },
    Sunday: {
      date: "星期日 · 9月27日",
      title: "悠閒週日 · 晨間散步與返港",
      meals: meals.Sunday || {},
      stops: [],
    },
  };

  for (const [dayName, data] of Object.entries(daysMap)) {
    grouped.set(dayName, data);
  }

  // 2. 將行程按時間放入對應天數
  for (const event of itinerary) {
    const dayName = event.day;
    if (grouped.has(dayName)) {
      grouped.get(dayName).stops.push({
        time: event.time.split(" - ")[0],
        name: event.name,
        category: event.category,
        note: event.description,
        url: event.url || "",
      });
    }
  }

  return [...grouped.values()];
}

export const DESTINATIONS = Object.freeze([
  Object.freeze({
    key: "khh",
    city: "高雄 (Kaohsiung)",
    country: "台灣",
    arrival: "KHH",
    flight: {
      primary: "CX432 (08:50 - 10:20) / CX459 (19:15 - 20:45)",
      backup: "N/A",
    },
    line: "海風和熱鬧街景，慢慢感受城市的節奏。",
    image: "./assets/kaohsiung.jpg",
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
    days: itineraryToDays(
      [
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
      {
        Saturday: {
          breakfast: { time: "07:30", name: "機上輕食 (CX432)", note: "90分鐘極速飛行。" },
          lunch: { time: "12:00", name: "港園牛肉麵 / 鴨肉珍", note: "鹽埕區數十年老字號在地美食。" },
          dinner: { time: "19:30", name: "THOMAS CHIEN RESTAURANT", note: "高端法式精緻餐飲，極致海鮮奢華生日晚宴。" },
        },
        Sunday: {
          breakfast: { time: "09:00", name: "興隆居", note: "高雄超人氣湯包與燒餅油條早餐。" },
          lunch: { time: "12:30", name: "旗津海鮮小吃 / 渡船頭海之冰", note: "新鮮海產與招牌大碗冰。" },
          dinner: { time: "17:30", name: "高雄小港機場貴賓室", note: "搭乘 CX459 返港。" },
        },
      }
    ),
  }),
  Object.freeze({
    key: "taipei",
    city: "台北 (Taipei)",
    country: "台灣",
    arrival: "TPE",
    flight: {
      primary: "CX488 (08:00 - 09:55) / CX531 (20:15 - 22:15)",
      backup: "CX564, CX530 / CX451",
    },
    line: "河岸晚風、街角咖啡，還有一點點城市冒險。",
    image: "./assets/taipei.jpg",
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
    days: itineraryToDays(
      [
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
      {
        Saturday: {
          breakfast: { time: "06:30", name: "機上早餐 (CX488)", note: "搭乘 CX488 直飛台北。" },
          lunch: { time: "12:00", name: "阜杭豆漿 / 永康牛肉麵", note: "品嚐台北經典在地美食。" },
          dinner: { time: "19:30", name: "MUME (米芝蓮一星)", note: "現代歐陸料理，極致浪漫的燭光生日晚餐。" },
        },
        Sunday: {
          breakfast: { time: "09:00", name: "真芳碳烤吐司", note: "台北超人氣古早味早餐。" },
          lunch: { time: "12:30", name: "鼎泰豐 (信義店)", note: "享受經典小籠包與精緻點心。" },
          dinner: { time: "18:00", name: "桃園機場國泰貴賓室", note: "準備搭乘 CX531 返港。" },
        },
      }
    ),
  }),
  Object.freeze({
    key: "bangkok",
    city: "曼谷 (Bangkok)",
    country: "泰國",
    arrival: "BKK",
    flight: {
      primary: "CX705 (08:15 - 10:05) / CX704 (19:10 - 23:05)",
      backup: "CX717 / CX708",
    },
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
    days: itineraryToDays(
      [
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
      {
        Saturday: {
          breakfast: { time: "06:40", name: "香港機場國泰貴賓室 / 機上早餐", note: "搭乘 CX705。" },
          lunch: { time: "12:30", name: "Siam Paragon Food Hall / Nara Thai", note: "抵達後於商場享用精緻泰菜。" },
          dinner: { time: "19:30", name: "Gaa (米芝蓮星級)", note: "泰式大宅內的米芝蓮前衛精緻料理。" },
        },
        Sunday: {
          breakfast: { time: "08:30", name: "酒店奢華自助早餐", note: "悠閒享用熱帶水果與晨間咖啡。" },
          lunch: { time: "12:30", name: "Rung Rueang Pork Noodles (榮泰米粉湯)", note: "米芝蓮必比登推薦泰式米粉湯。" },
          dinner: { time: "17:00", name: "曼谷 Suvarnabhumi 機場貴賓室", note: "搭乘 CX704 返港。" },
        },
      }
    ),
  }),
  Object.freeze({
    key: "seoul",
    city: "首爾 (Seoul)",
    country: "韓國",
    arrival: "ICN",
    flight: {
      primary: "CX434 (07:50 - 12:30) / CX419 (20:15 - 23:05)",
      backup: "CX410 / CX411",
    },
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
    days: itineraryToDays(
      [
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
      {
        Saturday: {
          breakfast: { time: "06:30", name: "香港機場國泰貴賓室 / 機上早餐", note: "搭乘 CX434 輕鬆享用早餐。" },
          lunch: { time: "13:30", name: "明洞神仙雪濃湯 / 本粥", note: "抵達落機 Check-in 後暖胃首選。" },
          dinner: { time: "19:30", name: "Mingles (米芝蓮三星)", note: "新派精緻韓式 Fine Dining，尊享生日晚宴。" },
        },
        Sunday: {
          breakfast: { time: "09:00", name: "Onion Anguk (韓屋咖啡廳)", note: "北村超人氣韓屋麵包咖啡店。" },
          lunch: { time: "12:30", name: "土俗村蔘雞湯", note: "傳統名店溫補蔘雞湯。" },
          dinner: { time: "17:30", name: "仁川機場貴賓室", note: "搭乘 CX419 前於機場輕鬆用餐。" },
        },
      }
    ),
  }),
]);

export function createMapsUrl(day, city) {
  const places = day.stops.map(({ name }) => `${name}, ${city}`);
  if (!places.length) return "";
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
  try {
    storage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: 1, destination: destination.key }),
    );
  } catch (e) {
    console.warn("Unable to save to storage", e);
  }

  return { destination, restored: false };
}