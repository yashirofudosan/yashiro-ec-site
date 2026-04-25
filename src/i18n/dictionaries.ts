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
      close: "CLOSE",
      about: "ABOUT YASHIRO",
      fiveElements: "FIVE ELEMENTS"
    },
    hero: {
      title: "ENVIRONMENTAL PSYCHOLOGY",
      subtitle: "Defining space as hardware that supports occupant performance.\nLogical spatial optimization for the modern lifestyle.",
      cta: "EXPLORE THE ARCHITECTURE"
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
      philosophyLink1: "About YASHIRO",
      philosophyLink2: "The Five Elements",
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
      close: "閉じる",
      about: "YASHIROとは",
      fiveElements: "五行とは"
    },
    hero: {
      title: "環境心理学に基づいた空間最適化",
      subtitle: "空間を居住者のパフォーマンスを支える「ハードウェア」として定義し、電磁波や視覚的ノイズを論理的に排除（デバッグ）する。",
      cta: "アーキテクチャを見る"
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
      philosophyLink1: "YASHIROとは",
      philosophyLink2: "五行とは",
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
export type DictionaryPath = string;
