import Link from "next/link";
import "../philosophy/philosophy.css";
import "./five-elements.css";

export const metadata = {
  title: "五行とは | YASHIRO",
  description: "五行（木・火・土・金・水）と風水の関係性。YASHIROが空間設計に活用する古代の知恵と現代科学の融合。",
};

const elements = [
  {
    kanji: "木", romaji: "WOOD", color: "var(--element-wood-light)",
    jp: "成長・発展・生命力",
    en: "Growth · Expansion · Vitality",
    desc_jp: "木の気は上昇し、成長を促します。観葉植物や木製家具は「木」のエネルギーを空間に呼び込み、創造性・前進力・健康を高めます。風水では東・東南に配置することで効果を最大化します。",
    desc_en: "Wood energy rises and encourages growth. Houseplants and wooden furniture bring Wood energy into your space, amplifying creativity, forward momentum, and vitality. In Feng Shui, placement in the East or Southeast maximizes its effect.",
    fengshui_jp: "方位：東・東南 ／ 季節：春",
    fengshui_en: "Direction: East & SE / Season: Spring",
  },
  {
    kanji: "火", romaji: "FIRE", color: "var(--element-fire-light)",
    jp: "情熱・活力・明晰さ",
    en: "Passion · Vitality · Clarity",
    desc_jp: "火の気は拡散し、エネルギーを解放します。赤・橙・強い光を帯びたオブジェは空間のトーンを上げ、社交性・認知度・情熱の炎を灯します。南方向に配置することで、注目と評価を引き寄せます。",
    desc_en: "Fire energy expands and releases. Objects in red, orange, or strong light raise the tone of a space, igniting sociability, recognition, and passion. Placement in the South direction attracts attention and reputation.",
    fengshui_jp: "方位：南 ／ 季節：夏",
    fengshui_en: "Direction: South / Season: Summer",
  },
  {
    kanji: "土", romaji: "EARTH", color: "var(--element-earth-light)",
    jp: "安定・信頼・グラウンディング",
    en: "Stability · Trust · Grounding",
    desc_jp: "土の気は中心に宿り、重心を整えます。陶器・天然石・テラコッタ素材の家具は安定感と信頼感を生み出し、精神的な軸を固めます。中央・北東・南西が風水上の最適配置です。",
    desc_en: "Earth energy dwells at the center, balancing gravity. Pottery, natural stone, and terracotta-toned furniture generate stability and trust, solidifying your mental axis. Center, Northeast, and Southwest are optimal Feng Shui placements.",
    fengshui_jp: "方位：中央・北東・南西 ／ 季節：土用",
    fengshui_en: "Direction: Center, NE & SW / Season: Transition",
  },
  {
    kanji: "金", romaji: "METAL", color: "var(--element-metal-light)",
    jp: "明確性・決断力・精密さ",
    en: "Clarity · Decisiveness · Precision",
    desc_jp: "金の気は収縮し、本質を研ぎ澄まします。白・グレー・スチール系の素材は思考の明瞭さと決断力を高め、不要なものを削ぎ落とす力をもたらします。西・北西に配置すると、ビジネス・財運に好影響を与えます。",
    desc_en: "Metal energy contracts and sharpens essence. White, gray, and steel-toned materials enhance mental clarity and decisiveness, stripping away the inessential. Placement in the West and Northwest benefits business and prosperity.",
    fengshui_jp: "方位：西・北西 ／ 季節：秋",
    fengshui_en: "Direction: West & NW / Season: Autumn",
  },
  {
    kanji: "水", romaji: "WATER", color: "var(--element-water-light)",
    jp: "循環・柔軟性・知恵",
    en: "Flow · Flexibility · Wisdom",
    desc_jp: "水の気は流れ、万物を潤します。曲線的なフォルム、ガラス、流動的なテキスタイルは空間のエネルギーをスムーズに循環させ、洞察・コミュニケーション・変化への適応力を育みます。北方向への配置が最も有効です。",
    desc_en: "Water energy flows and nourishes all things. Curved forms, glass, and fluid textiles circulate space energy smoothly, nurturing insight, communication, and adaptability to change. Placement to the North is most effective.",
    fengshui_jp: "方位：北 ／ 季節：冬",
    fengshui_en: "Direction: North / Season: Winter",
  },
];

export default function FiveElementsPage() {
  return (
    <main className="main-content philosophy-page">
      <section className="philosophy-hero">
        <div className="bg-glow"></div>
        <h1 className="philosophy-title">
          五行<br/>
          <span style={{ fontSize: "0.45em", letterSpacing: "0.35em", fontWeight: 300 }}>
            THE FIVE ELEMENTS
          </span>
        </h1>
        <p className="philosophy-subtitle">
          五行と風水の関係性 — Ancient Wisdom Meets Modern Space Design
        </p>
      </section>

      {/* Intro */}
      <section className="five-intro">
        <div className="five-intro-inner">
          <div>
            <h2 className="five-intro-title">五行と風水の関係性</h2>
            <p className="five-intro-text">
              五行思想（Wood・Fire・Earth・Metal・Water）は、紀元前から東洋思想の中核を担ってきた宇宙モデルです。
              风水（フェンシュイ）はこの五行を空間へ応用した実践体系であり、「気（エネルギー）の流れ」を方位・素材・色・形を通じてコントロールします。
              YASHIROはこの哲学を現代の環境心理学・空間デザインと融合させ、
              居住者がパフォーマンスを最大化できる「最適化された空間」を設計します。
            </p>
            <p className="five-intro-text" style={{ color: "#999", marginTop: "1rem", fontSize: "0.95rem" }}>
              The Five Elements theory (木火土金水) is a cosmological model at the core of Eastern philosophy since antiquity.
              Feng Shui applies this framework to physical space — controlling the flow of "Qi (energy)" through direction, materials, color, and form.
              YASHIRO merges this philosophy with modern environmental psychology and spatial design
              to architect optimized environments where occupants can maximize their performance.
            </p>
          </div>
          <div className="five-cycle-diagram">
            <span className="cycle-label top">木 WOOD</span>
            <span className="cycle-label right">火 FIRE</span>
            <span className="cycle-label bottom-right">土 EARTH</span>
            <span className="cycle-label bottom-left">金 METAL</span>
            <span className="cycle-label left">水 WATER</span>
            <div className="cycle-center">五行<br/><span>CYCLE</span></div>
          </div>
        </div>
      </section>

      {/* Interaction Cycles (相生・相剋) */}
      <section className="five-cycles-section">
        <div className="cycles-inner">
          <h2 className="cycles-title">五行の相互作用（相生と相剋）</h2>
          <p className="cycles-desc">
            五行のエレメントは単独で存在するのではなく、お互いに影響を与え合いながら空間のエネルギーを形成します。
            このエネルギーのダイナミクスを理解し、適切に配置することで、環境のバグを取り除き、理想的な空間を創り出すことができます。
          </p>
          
          <div className="cycles-grid">
            <div className="cycle-card sousei">
              <h3 className="cycle-card-title">相生（そうしょう）- Generative Cycle</h3>
              <p className="cycle-card-subtitle">相手を生み出し、力を強める「良い影響」のサイクル</p>
              <div className="cycle-flow">
                <span>木</span> ➔ <span>火</span> ➔ <span>土</span> ➔ <span>金</span> ➔ <span>水</span> ➔ <span>木</span>
              </div>
              <p className="cycle-card-text">
                あるエレメントが別のエレメントを育て、エネルギーを増幅させる関係です。
                例えば、木は燃えて火を生み、火は燃え尽きて灰（土）となり、土の中からは鉱物（金）が生まれ、金は冷えて水滴（水）を生み、水は木を育てます。
                <strong>空間デザインへの応用:</strong> 高めたい運気がある場合、そのエレメントそのものだけでなく、それを「生み出す」エレメントを配置することで、より自然で強力なエネルギーの好循環が生まれます。
              </p>
            </div>

            <div className="cycle-card soukoku">
              <h3 className="cycle-card-title">相剋（そうこく）- Destructive Cycle</h3>
              <p className="cycle-card-subtitle">相手の力を抑え込み、弱める「抑制」のサイクル</p>
              <div className="cycle-flow">
                <span>木</span> ➔ <span>土</span> ➔ <span>水</span> ➔ <span>火</span> ➔ <span>金</span> ➔ <span>木</span>
              </div>
              <p className="cycle-card-text">
                あるエレメントが別のエレメントのエネルギーを奪い、または破壊する関係です。
                例えば、木は根を張って土の養分を奪い、土は水を堰き止め、水は火を消し、火は金を溶かし、金（刃物）は木を切り倒します。
                <strong>空間デザインへの応用（化殺）:</strong> 飛星盤などで「悪い気（凶星）」が巡る方位がある場合、この相剋の法則を利用して、悪いエネルギーを打ち消す（化殺する）エレメントを配置し、空間のエラーを無効化します。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Five Elements Detail */}
      <section className="five-elements-grid">
        {elements.map((el, i) => (
          <div key={el.romaji} className="element-detail-card fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="element-card-header" style={{ borderColor: el.color }}>
              <span className="el-kanji" style={{ color: el.color }}>{el.kanji}</span>
              <div>
                <div className="el-romaji">{el.romaji}</div>
                <div className="el-jp-desc">{el.jp}</div>
                <div className="el-en-desc">{el.en}</div>
              </div>
            </div>
            <p className="el-body">{el.desc_jp}</p>
            <p className="el-body en">{el.desc_en}</p>
            <div className="el-fengshui">
              <span>{el.fengshui_jp}</span>
              <span className="el-fengshui-en">{el.fengshui_en}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="philosophy-footer">
        <h2>五行を知れば、空間が変わる。<br/>
          <span style={{ fontSize: "0.6em", fontWeight: 300 }}>Know the elements. Transform your space.</span>
        </h2>
        <Link href="/" className="action-btn hover-lift">
          商品を見る / SHOP NOW →
        </Link>
      </section>
    </main>
  );
}
