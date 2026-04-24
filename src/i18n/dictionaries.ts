export const dictionaries = {
  en: {
    nav: {
      furniture: "FURNITURE",
      plants: "HOUSEPLANTS",
      living: "Living Room",
      bedroom: "Bedroom",
      workspace: "Workspace",
      search: "SEARCH",
      menu: "MENU",
      close: "CLOSE"
    },
    hero: {
      title: "ENVIRONMENTAL\nPSYCHOLOGY",
      subtitle: "Align your space. Eliminate the noise.",
      cta: "EXPLORE THE ELEMENTS"
    },
    footer: {
      collections: "COLLECTIONS",
      wood: "Wood (Growth)",
      fire: "Fire (Energy)",
      earth: "Earth (Grounding)",
      metal: "Metal (Clarity)",
      water: "Water (Flow)",
      spaces: "SPACES",
      philosophy: "PHILOSOPHY",
      philosophyLink1: "Environmental Psychology",
      philosophyLink2: "Geopathic Stress",
      philosophyLink3: "About YASHIRO",
      support: "SUPPORT",
      contact: "Contact"
    },
    elements: {
      wood: "Wood",
      fire: "Fire",
      earth: "Earth",
      metal: "Metal",
      water: "Water"
    }
  },
  ja: {
    nav: {
      furniture: "家具",
      plants: "観葉植物",
      living: "リビング",
      bedroom: "寝室",
      workspace: "書斎",
      search: "検索",
      menu: "メニュー",
      close: "閉じる"
    },
    hero: {
      title: "環境心理学に\n基づく空間最適化",
      subtitle: "ノイズを排除し、空間を調律する。",
      cta: "要素を探求する"
    },
    footer: {
      collections: "五行要素",
      wood: "木 (成長・発展)",
      fire: "火 (エネルギー)",
      earth: "土 (安定・グラウンディング)",
      metal: "金 (明確性・決断力)",
      water: "水 (循環・柔軟性)",
      spaces: "空間別",
      philosophy: "YASHIROの哲学",
      philosophyLink1: "環境心理学とは",
      philosophyLink2: "ジオパシック・ストレスの排除",
      philosophyLink3: "YASHIROについて",
      support: "お客様サポート",
      contact: "お問い合わせ"
    },
    elements: {
      wood: "木 (Wood)",
      fire: "火 (Fire)",
      earth: "土 (Earth)",
      metal: "金 (Metal)",
      water: "水 (Water)"
    }
  }
};

export type Locale = keyof typeof dictionaries;
export type DictionaryPath = string; // Simpler type mapping for dot notation
