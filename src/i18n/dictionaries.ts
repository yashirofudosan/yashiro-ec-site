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
      library: "Feng Shui Audit Library",
      magazine: "MAGAZINE",
      support: "SUPPORT",
      contact: "Contact",
      realestate: "YASHIRO Real Estate",
      company: "Company Profile",
      privacy: "Privacy Policy",
      tokushoho: "Act on Specified Commercial Transactions"
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
      title: "空間の最適化",
      subtitle: "パフォーマンスを最大化する、究極のハードウェア",
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
      library: "風水鑑定図書館",
      magazine: "MAGAZINE(記事)",
      support: "お客様サポート",
      contact: "お問い合わせ",
      realestate: "YASHIRO不動産",
      company: "企業情報",
      privacy: "プライバシーポリシー",
      tokushoho: "特定商取引法に基づく表記"
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
