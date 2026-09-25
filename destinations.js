export const STORAGE_KEY = "potato-private-journey:v1";

function itineraryToDays(itinerary, meals = {}, titles = {}, urls = {}) {
  const grouped = new Map();

  // 1. 初始化星期六與星期日
  const daysMap = {
    Saturday: {
      date: "星期六 · 9月26日",
      title: titles.Saturday || "週六行程",
      url: urls.Saturday || "",
      meals: meals.Saturday || {},
      stops: [],
    },
    Sunday: {
      date: "星期日 · 9月27日",
      title: titles.Sunday || "週日行程",
      url: urls.Sunday || "",
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
    planIntro: "從駁二與愛河灣出發，留點時間給海風、老店和港邊晚餐。",
    image: "./assets/kaohsiung.jpg",
    focalPoint: "center center",
    hotel_area: "鹽埕區 / 前鎮區（近高雄港灣，方便前往駁二與高流）",
    itinerary: [
      {
        day: "Saturday",
        time: "10:20 - 12:00",
        name: "抵達高雄小港機場 & 前往市區飯店寄行李",
        category: "交通",
        description: "抵達小港機場後搭乘捷運或計程車前往飯店寄存行李，再到鹽埕區用午餐。",
        url: "",
      },
      {
        day: "Saturday",
        time: "12:30 - 15:30",
        name: "駁二藝術特區 & 棧貳庫 KW2",
        category: "景點/購物",
        description: "舊倉庫文創園區散步，逛獨立手作小店、看海景與棧貳庫旋轉木馬。",
        url: "https://maps.google.com/?cid=12683955627221081586",
      },
      {
        day: "Saturday",
        time: "15:30 - 17:00",
        name: "哈瑪星鐵道文化園區",
        category: "景點",
        description: "以哈瑪星鐵道文化園區為主；可依時間與天氣改走大港橋，或安排旗津夕陽散步。",
        url: "https://maps.google.com/?q=Hamasen+Railway+Cultural+Park+Kaohsiung",
      },
      {
        day: "Saturday",
        time: "17:00 - 18:45",
        name: "高雄流行音樂中心 & 愛河灣夕陽",
        category: "景點",
        description: "沿愛河灣散步，欣賞音浪塔日落與現代建築地標，感受港都晚風。",
        url: "https://maps.google.com/?cid=14328514104278453457",
      },
      {
        day: "Saturday",
        time: "18:45 - 19:30",
        name: "交通緩衝 & 換裝準備",
        category: "交通",
        description: "返回飯店稍作打扮換裝，搭車前往 THOMAS CHIEN 用餐。",
        url: "",
      },
      {
        day: "Sunday",
        time: "09:30 - 12:00",
        name: "旗津區 (搭渡輪 / 旗後燈塔 / 旗津天后宮)",
        category: "景點",
        description: "搭乘 5 分鐘渡輪前往旗津，登上旗後燈塔俯瞰高雄港，享受輕鬆港都晨景。",
        url: "https://maps.google.com/?cid=18290264024626100953",
      },
      {
        day: "Sunday",
        time: "13:30 - 15:30",
        name: "高雄市立圖書館總館 & 遠雄 68 樓展望",
        category: "景點",
        description: "漫步綠建築空中花園圖書館；遠雄 68 樓展望台營運狀況請於出發前確認。",
        url: "https://maps.google.com/?q=Kaohsiung+Main+Public+Library+Farglory+68+Observatory",
      },
      {
        day: "Sunday",
        time: "15:30 - 17:00",
        name: "三多商圈購物 / 購買伴手禮",
        category: "購物",
        description: "採買高雄在地伴手禮（如舊振南、吳寶春麥方店）。",
        url: "https://maps.google.com/?q=Sanduo+Shopping+District+Kaohsiung",
      },
      {
        day: "Sunday",
        time: "17:00 - 17:30",
        name: "前往小港機場",
        category: "交通",
        description: "搭乘捷運紅線直達高雄小港機場（預留 2 小時前報到與貴賓室休息）。",
        url: "",
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
          breakfast: { time: "07:30", name: "機上輕食 (CX432)", choices: ["機上輕食", "香港機場貴賓室早餐"] },
          lunch: { time: "11:30", name: "鹽埕在地美食", choices: ["港園牛肉麵", "鴨肉珍", "米糕城", "冬粉王"] },
          teatime: { time: "15:30", name: "質感下午茶", choices: ["SOi 咖啡", "駁二微熱山丘", "光家烘焙"] },
          dinner: { time: "19:30", name: "THOMAS CHIEN RESTAURANT", choices: ["THOMAS CHIEN (法餐)", "Marc L3 (新現代料理)", "Sho 承 (日本料理)"] },
        },
        Sunday: {
          breakfast: { time: "09:00", name: "傳統人氣早餐", choices: ["興隆居 (湯包燒餅)", "果貿來來豆漿", "寬來順早餐店"] },
          lunch: { time: "12:00", name: "旗津海鮮與冰品", choices: ["旗津鴨角海鮮", "渡船頭海之冰", "萬三小吃部"] },
          teatime: { time: "15:30", name: "甜點伴手禮", choices: ["吳寶春麵包", "舊振南餅店", "猜心泡芙"] },
          dinner: { time: "17:30", name: "高雄小港機場貴賓室", choices: ["華航/國泰特約貴賓室", "機場限定餐飲"] },
        },
      },
      {
        Saturday: "鹽埕文創 · 愛河灣夕景 · 法餐晚宴",
        Sunday: "旗津海風 · 港灣全景 · 慢行伴手禮",
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
    planIntro: "穿梭文創園區與街角小吃，午後登高看一眼台北天際線。",
    image: "./assets/taipei.jpg",
    focalPoint: "center center",
    hotel_area: "大安區 / 信義區（交通極方便，鄰近高級餐廳與精緻商圈）",
    itinerary: [
      {
        day: "Saturday",
        time: "10:00 - 11:30",
        name: "搭乘機場捷運至台北市區 & 飯店寄行李",
        category: "交通",
        description: "桃園機場（TPE）出關後搭乘直達車約 39 分鐘至台北車站，再轉乘捷運至飯店。",
        url: "",
      },
      {
        day: "Saturday",
        time: "13:00 - 15:30",
        name: "華山1914文化創意產業園區",
        category: "景點/購物",
        description: "經典文青景點，逛展覽、獨立品牌選物店及手作小店。",
        url: "https://maps.google.com/?cid=17422499956913495153",
      },
      {
        day: "Saturday",
        time: "15:30 - 18:00",
        name: "誠品生活松菸店 & 松山文創園區",
        category: "購物",
        description: "集結台灣原創設計、質感生活用品、香氛及文具，並可在園區生態池散步。",
        url: "https://maps.google.com/?cid=707633478795868600",
      },
      {
        day: "Saturday",
        time: "18:00 - 19:15",
        name: "飯店 Check-in 休息 & 換裝預備",
        category: "休息",
        description: "回飯店稍作休息與換裝，為夜晚的 Fine Dining 做準備。",
        url: "",
      },
      {
        day: "Sunday",
        time: "09:00 - 11:30",
        name: "象山步道 (遠眺台北 101 與全景)",
        category: "景點",
        description: "晨間輕鬆散步，登上六巨石拍攝台北天際線的最佳視野。",
        url: "https://maps.google.com/?cid=7929780517551711520",
      },
      {
        day: "Sunday",
        time: "13:30 - 16:00",
        name: "中山站南西商圈 / 赤峰街巷弄選物",
        category: "購物/景點",
        description: "探索台北最紅的赤峰街獨立咖啡館、服飾選品店與古著店。",
        url: "https://maps.google.com/?q=Zhongshan+Station+Chifeng+Street+Taipei",
      },
      {
        day: "Sunday",
        time: "16:00 - 17:00",
        name: "搭乘機場捷運前往桃園機場",
        category: "交通",
        description: "從台北車站搭乘機捷直達車至桃園機場（預留 2 小時前報到及貴賓室時間）。",
        url: "",
      },
      {
        day: "Sunday",
        time: "18:00 - 20:15",
        name: "桃園機場國泰貴賓室休息",
        category: "餐飲/休息",
        description: "享用國泰貴賓室招牌牛肉麵與調酒，準備登機返港。",
        url: "https://maps.google.com/?q=Cathay+Pacific+Lounge+Taoyuan+International+Airport",
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
          breakfast: { time: "06:30", name: "機上早餐 (CX488)", choices: ["CX488 機上早餐", "香港機場寰宇堂貴賓室"] },
          lunch: { time: "11:30", name: "台北經典牛肉麵/小吃", choices: ["永康牛肉麵", "林東芳牛肉麵", "阜杭豆漿 (清晨)", "阿宗麵線"] },
          teatime: { time: "16:00", name: "松菸咖啡小憩", choices: ["CAMA COFFEE ROASTERS 豆留文青", "春水堂 (松菸店)", "一之軒"] },
          dinner: { time: "19:30", name: "MUME (米芝蓮一星)", choices: ["MUME (歐陸料理)", "logy", "Impromptu by Paul Lee", "Ad Astra"] },
        },
        Sunday: {
          breakfast: { time: "08:30", name: "古早味早餐", choices: ["真芳碳烤吐司", "鼎元豆漿", "豐盛號"] },
          lunch: { time: "12:00", name: "精緻精選午餐", choices: ["鼎泰豐 (信義A4/101店)", "欣葉台菜", "老四川巴蜀麻辣鴛鴦鍋"] },
          teatime: { time: "14:30", name: "赤峰街質感甜點", choices: ["Melange Café 米朗琪咖啡", "SPOT Taipei", "FAVVI 選物咖啡"] },
          dinner: { time: "18:00", name: "桃園機場國泰貴賓室", choices: ["國泰航空貴賓室 (牛肉麵/雲吞麵)", "Plaza Premium Lounge"] },
        },
      },
      {
        Saturday: "華山松菸文創 · 台北浪漫餐桌",
        Sunday: "象山晨景 · 中山赤峰街巷弄 · 返港",
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
    planIntro: "從暹羅商圈逛到昭披耶河畔，夜晚留給泰式料理與城市燈火。",
    image: "./assets/bangkok.jpg",
    focalPoint: "52% center",
    hotel_area: "Sukhumvit (Soi 53 / 55 通羅區) 或 河畔區 (Chao Phraya Riverside)",
    itinerary: [
      {
        day: "Saturday",
        time: "10:05 - 12:00",
        name: "抵達曼谷機場 (BKK) & 機場包車/Grab 至飯店寄行李",
        category: "交通",
        description: "入境曼谷，搭車前往市區飯店寄存行李（預留 1.5 小時車程與塞車緩衝）。",
        url: "",
      },
      {
        day: "Saturday",
        time: "14:00 - 16:15",
        name: "Siam Paragon 商圈購物",
        category: "購物",
        description: "高端商場逛街，採購泰國香氛品牌（Karmakamet, HARNN）與國際精品。",
        url: "https://maps.google.com/?cid=11476178565854079331",
      },
      {
        day: "Saturday",
        time: "16:15 - 18:30",
        name: "ICONSIAM (河畔奢華地標)",
        category: "購物",
        description: "搭乘 BTS Gold Line 直達，體驗室內水上市場 SOOKSiam 與河畔夕陽。",
        url: "https://maps.google.com/?cid=1612497051803357940",
      },
      {
        day: "Saturday",
        time: "18:30 - 19:30",
        name: "交通轉乘緩衝 (乘船/BTS 前往通羅區 Gaa)",
        category: "交通",
        description: "避開公路塞車，建議先搭乘河畔接駁船轉乘 BTS 至 Thong Lo 站前往餐廳。",
        url: "",
      },
      {
        day: "Sunday",
        time: "09:00 - 11:30",
        name: "大皇宮 (The Grand Palace) & 玉佛寺",
        category: "景點",
        description: "晨間參觀泰國標誌性皇宮建築，感受東南亞宮廷文化。",
        url: "https://maps.google.com/?cid=3061266857947704385",
      },
      {
        day: "Sunday",
        time: "13:00 - 15:00",
        name: "泰式頂級 SPA 按摩體驗 (2 小時)",
        category: "休息/體驗",
        description: "搭機返港前安排一次全身精油按摩或泰式古法舒壓，消除疲勞。可選 Divana Scentuara Spa、Let's Relax Spa 或 Panpuri Wellness。",
        url: "https://maps.google.com/?q=Divana+Scentuara+Spa+Bangkok",
      },
      {
        day: "Sunday",
        time: "15:00 - 16:30",
        name: "Emsphere / EmQuartier 潮牌採購",
        category: "購物",
        description: "曼谷最新開幕奢華潮牌商場逛街兼買伴手禮。",
        url: "https://maps.google.com/?q=Emsphere+EmQuartier+Bangkok",
      },
      {
        day: "Sunday",
        time: "16:30 - 17:30",
        name: "專車前往 Suvarnabhumi 機場 (BKK)",
        category: "交通",
        description: "預留 1 小時車程與塞車緩衝，提前 2 小時抵達機場。",
        url: "",
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
          breakfast: { time: "06:40", name: "機上早餐 (CX705)", choices: ["CX705 機上早餐", "香港機場玉衡堂貴賓室"] },
          lunch: { time: "12:30", name: "Siam 精緻泰菜", choices: ["Nara Thai Cuisine", "Somtum Der (Somtum 涼拌木瓜絲)", "Inter Restaurants (Siam Soi 9)"] },
          teatime: { time: "15:30", name: "河畔/商場下午茶", choices: ["After You Dessert Cafe (蜜糖吐司)", "ChaTraMue (手標泰式奶茶)", "Karmakamet Tearoom"] },
          dinner: { time: "19:30", name: "Gaa (米芝蓮二星)", choices: ["Gaa (前衛泰/印融合)", "Nusara", "Le Du", "Paste Bangkok"] },
        },
        Sunday: {
          breakfast: { time: "08:30", name: "酒店奢華自助早餐", choices: ["酒店早餐", "Kay's Boutique Breakfast"] },
          lunch: { time: "12:00", name: "平民必比登美食", choices: ["Rung Rueang Pork Noodles (榮泰米粉湯)", "Go-Ang Pratunam Chicken Rice (紅大哥海南雞)", "Thip Samai (鬼門炒пад泰)"] },
          dinner: { time: "17:30", name: "曼谷機場貴賓室", choices: ["國泰航空 BKK 貴賓室", "Miracle Lounge"] },
        },
      },
      {
        Saturday: "暹羅購物 · ICONSIAM 河畔 · 米芝蓮晚宴",
        Sunday: "大皇宮晨遊 · 頂級 SPA 舒壓 · 返港",
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
    planIntro: "入住仁寺洞心臟地帶，首日深度探索聖水洞潮牌，次日根據戰利品彈性切換明洞掃貨或北村漫步。",
    image: "./assets/seoul.jpg",
    focalPoint: "58% center",
    hotel_area: "宜必思首爾仁寺洞大使酒店 (Ibis Ambassador Seoul Insadong)",
    itinerary: [
      {
        day: "Saturday",
        time: "12:30 - 14:00",
        name: "入境首爾 & 搭乘 AREX 前往宜必思仁寺洞飯店",
        category: "交通",
        description: "抵達仁川機場 (ICN) 後搭乘直通列車至首爾站，轉乘地鐵/計程車至飯店 Check-in 或寄放行李。",
        url: "https://www.google.com/maps/search/?api=1&query=Ibis+Ambassador+Seoul+Insadong",
      },
      {
        day: "Saturday",
        time: "14:30 - 18:30",
        name: "聖水洞深度潮流購物 (Seongsu-dong)",
        category: "購物",
        description: "探索聖水洞潮流街區、韓系美妝/服飾品牌 (Ader Error, Tamburins, fwee) 與個性選物店。",
        url: "https://www.google.com/maps/search/?api=1&query=Seongsu-dong+Seoul",
      },
      {
        day: "Saturday",
        time: "18:30 - 19:30",
        name: "返回飯店換裝 & 前往晚宴地點",
        category: "交通/休息",
        description: "回飯店整理戰利品稍作休息換裝，搭車前往晚宴地點（建議可現場登記/排隊的高品質韓牛或烤肉）。",
        url: "https://www.google.com/maps/search/?api=1&query=Ibis+Ambassador+Seoul+Insadong",
      },
      {
        day: "Sunday",
        time: "10:00 - 15:30",
        name: "彈性行程：明洞美妝掃貨 OR 北村韓屋漫步",
        category: "景點/購物",
        description: "若 Day 1 戰利品不足則前往明洞旗艦店補貨；若已滿足則前往北村韓屋村與三清洞悠閒散步。",
        url: "https://www.google.com/maps/search/?api=1&query=Bukchon+Hanok+Village+Seoul",
      },
      {
        day: "Sunday",
        time: "16:30 - 17:45",
        name: "搭乘 AREX 直通列車前往仁川機場",
        category: "交通",
        description: "返飯店取行李後前往首爾站搭乘 AREX 直達仁川機場（預留 2.5 小時機場時間）。",
        url: "https://www.google.com/maps/search/?api=1&query=Seoul+Station",
      },
      {
        day: "Sunday",
        time: "18:00 - 20:15",
        name: "仁川機場貴賓室享用美食 & 退稅辦理",
        category: "餐飲/購物",
        description: "辦理 Tax Refund、免稅店最後採購，並於貴賓室休息準備登機。",
        url: "https://www.google.com/maps/search/?api=1&query=Incheon+International+Airport+Terminal+1",
      },
    ],
    days: itineraryToDays(
      [
        {
          day: "Saturday",
          time: "14:30 - 18:30",
          name: "聖水洞 (Seongsu-dong)",
          category: "購物",
          description: "探索聖水洞潮流街區、韓系品牌與個性選物店。",
          url: "https://www.google.com/maps/search/?api=1&query=Seongsu-dong+Seoul",
        },
        {
          day: "Sunday",
          time: "10:00 - 15:30",
          name: "北村韓屋村 / 明洞商圈（彈性二選一）",
          category: "景點/購物",
          description: "視乎前一日購物成果，選擇去明洞 Olive Young 旗艦店掃貨或漫步北村韓屋村。",
          url: "https://www.google.com/maps/search/?api=1&query=Bukchon+Hanok+Village+Seoul",
        },
      ],
      {
        Saturday: {
          breakfast: {
            time: "06:30",
            name: "機上早餐 (CX434)",
            choices: [
              { name: "CX434 機上早餐" }
            ]
          },
        lunch: {
          time: "14:30",
          name: "仁寺洞 / 益善洞暖胃午餐（可 Walk-in）",
          choices: [
            { name: "里門雪濃湯 (百年老店/步行約6分鐘/翻桌快)", url: "https://www.google.com/maps/search/?api=1&query=Imun+Seolleongtang+Seoul" },
            { name: "黃生家刀削麵 (米芝蓮必比登/現場排隊)", url: "https://www.google.com/maps/search/?api=1&query=Hwangsaengga+Kalguksu" },
            { name: "神仙雪濃湯 (明洞店/需搭地鐵或步行約18分鐘)", url: "https://www.google.com/maps/search/?api=1&query=Sinseon+Seolleongtang+Myeongdong" }
          ]
        },
          teatime: {
            time: "16:30",
            name: "聖水洞質感 Cafe",
            choices: [
              {
                name: "Cafe Onion Seongsu",
                url: "https://www.google.com/maps/search/?api=1&query=Cafe+Onion+Seongsu"
              },
              {
                name: "Standard Bread Seongsu",
                url: "https://www.google.com/maps/search/?api=1&query=Standard+Bread+Seongsu"
              },
              {
                name: "Daelim Changgo Cafe",
                url: "https://www.google.com/maps/search/?api=1&query=Daelim+Changgo+Seongsu"
              }
            ]
          },
          dinner: {
            time: "19:30",
            name: "益善洞韓屋氛圍 / 新派韓式創意定食",
            choices: [
              { name: "Bangida (반기다 / 韓式創意料理 / 必點牛肉餅與辣醬麵)", url: "https://www.google.com/maps/search/?api=1&query=Bangida+Ikseon+Seoul" },
              { name: "Ikseonaetteut (익선애뜻 / 韓屋簡約風 / 韓式蓋飯與煎餅)", url: "https://www.google.com/maps/search/?api=1&query=Ikseonaetteut+Ikseon+Seoul" }
            ]
          },
        },
        Sunday: {
          breakfast: {
            time: "09:00",
            name: "安國 / 益善洞早午餐",
            choices: [
              { name: "Dotori Garden (安國希臘優格)", url: "https://www.google.com/maps/search/?api=1&query=Dotori+Garden+Anguk" },
              { name: "Mil Toast (益善洞蒸吐司)", url: "https://www.google.com/maps/search/?api=1&query=Mil+Toast+Ikseondong" },
              { name: "Onion Anguk", url: "https://www.google.com/maps/search/?api=1&query=Cafe+Onion+Anguk" },
              { name: "Artist Bakery", url: "https://www.google.com/maps/search/?api=1&query=Artist+Bakery+Anguk" }
            ]
          },
          lunch: {
            time: "12:30",
            name: "在地熱門名店午餐（可 Walk-in / 現場排隊）",
            choices: [
              { name: "土俗村參雞湯 (店面大/排隊快)", url: "https://www.google.com/maps/search/?api=1&query=Tosokchon+Samgyetang" },
              { name: "明洞餃子 (刀削麵/蒸餃/翻桌極快)", url: "https://www.google.com/maps/search/?api=1&query=Myeongdong+Kyoja" },
              { name: "三清洞麵片湯", url: "https://www.google.com/maps/search/?api=1&query=Samcheongdong+Sujeobi" },
              { name: "王妃家燒肉 (明洞店)", url: "https://www.google.com/maps/search/?api=1&query=Wangbijib+Myeongdong" }
            ]
          },
          teatime: {
            time: "15:00",
            name: "漢南洞 / 益善洞下午茶",
            choices: [
              { name: "Lowcoffee Hannam", url: "https://www.google.com/maps/search/?api=1&query=Lowcoffee+Hannam" },
              { name: "Wet Coffee", url: "https://www.google.com/maps/search/?api=1&query=Wet+Coffee+Hannam" },
              { name: "Ader Error Space Cafe", url: "https://www.google.com/maps/search/?api=1&query=Ader+Hannam+Space" },
              { name: "mtl Hannam", url: "https://www.google.com/maps/search/?api=1&query=mtl+Hannam" }
            ]
          },
          dinner: {
            time: "18:00",
            name: "仁川機場貴賓室",
            choices: [
              { name: "Matina Lounge (韓式炸雞/辣炒年糕)", url: "https://www.google.com/maps/search/?api=1&query=Matina+Lounge+Incheon+Airport" },
              { name: "Asiana Business Lounge", url: "https://www.google.com/maps/search/?api=1&query=Asiana+Business+Lounge+Incheon+Airport" },
              { name: "Sky Hub Lounge", url: "https://www.google.com/maps/search/?api=1&query=Sky+Hub+Lounge+Incheon+Airport" }
            ]
          },
        },
      },
      {
        Saturday: "聖水潮流探索 · 高質感韓式晚宴",
        Sunday: "北村韓屋/明洞掃貨 · 益善洞美食 · 仁川返港",
      },
      {
        Saturday: "https://www.google.com/maps/dir/?api=1&destination=Seongsu-dong+Seoul",
        Sunday: "https://www.google.com/maps/dir/?api=1&destination=Bukchon+Hanok+Village+Seoul"
      }
    ),
  })
].map((destination) => {
  const [saturday, sunday] = destination.days;
  return Object.freeze({
    ...destination,
    days: itineraryToDays(
      destination.itinerary,
      { Saturday: saturday.meals, Sunday: sunday.meals },
      { Saturday: saturday.title, Sunday: sunday.title },
      { Saturday: saturday.url, Sunday: sunday.url },
    ),
  });
}));

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

export function chooseDestination() {
  return getDestination("seoul");
}

export function getOrCreateDestination(storage) {
  const stored = readStoredDestination(storage);
  const destination = chooseDestination();
  if (stored?.key === destination.key) return { destination, restored: true };

  try {
    storage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: 1, destination: destination.key }),
    );
  } catch (e) {
    console.warn("Unable to save to storage", e);
  }

  return { destination, restored: Boolean(stored) };
}