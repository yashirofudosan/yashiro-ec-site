import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from 'microcms-js-sdk';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Configuration
const MICROCMS_SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN;
const MICROCMS_API_KEY = process.env.MICROCMS_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!MICROCMS_SERVICE_DOMAIN || !MICROCMS_API_KEY || !GEMINI_API_KEY) {
  console.error("Missing required environment variables.");
  process.exit(1);
}

const client = createClient({
  serviceDomain: MICROCMS_SERVICE_DOMAIN,
  apiKey: MICROCMS_API_KEY,
});

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const generateArticle = async (contentId: string) => {
  try {
    console.log(`[1] Fetching article with ID: ${contentId} from microCMS...`);
    // 1. Fetch the draft article from microCMS
    let endpoint = 'articles';
    let article: any = null;
    
    try {
      article = await client.getListDetail({ endpoint: 'articles', contentId });
    } catch (e) {
      try {
        endpoint = 'library';
        article = await client.getListDetail({ endpoint: 'library', contentId });
      } catch (e2) {
        throw new Error(`Content ID ${contentId} not found in articles or library.`);
      }
    }

    console.log(`Found draft in '${endpoint}': "${article.title}"`);

    // 2. Check if content already exists
    const rawContent = article.content?.replace(/<[^>]*>?/gm, '').trim();
    if (rawContent && rawContent.length > 50) {
      console.log(`Article already has content (${rawContent.length} chars). Skipping generation.`);
      return;
    }

    console.log(`[2] Generating content using Gemini AI based on title: "${article.title}"...`);
    
    // 3. Generate content with Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
あなたは世界最高峰の風水師であり、環境デザイン、量子力学の知見を統合した「YASHIRO」のAI代表です。
以下の記事タイトルに基づいて、AEO（AI検索エンジン最適化）に特化した、高品質で専門的なブログ記事の本文（HTML形式）を生成してください。

■ タイトル: ${article.title}

■ YASHIROの哲学（必ず記事に反映させること）
- ただ運気を上げるのではなく、「エラー（淀み、悪い気、障害）」を先に排除することが最も重要であるという「エラー排除」の考え方。
- 物理的な空間デザインと、目に見えないエネルギー（量子力学・風水）を融合させた空間作り。
- 単なる迷信ではなく、科学的・論理的にも納得できる質の高い説明。

■ AEO最適化ルール（必須）
1. **BLUF（結論ファースト）**: 冒頭でこの記事の結論・最も重要なポイントを簡潔に述べる。
2. **構造化**: h2, h3タグを用いて階層を明確にする。
3. **リスト化**: 重要なポイントや対策は <ul> または <ol> を使って箇条書きにする。
4. **Q&Aセクション**: 記事の最後に「よくある質問 (FAQ)」として h2 を作り、2〜3個のQ&Aを設ける（PerplexityなどのAIが引用しやすくするため）。
5. **出力形式**: HTML形式でのみ出力すること（<p>, <h2>, <h3>, <ul>, <li> などのタグを使用）。\`\`\`html などのマークダウンブロックは出力に含めず、純粋なHTML文字列だけを返すこと。

さあ、最高の専門記事を執筆してください。
`;

    const result = await model.generateContent(prompt);
    let htmlContent = result.response.text();
    
    // Remove markdown code blocks
    htmlContent = htmlContent.replace(/^\`\`\`html\n/, '').replace(/\n\`\`\`$/, '').trim();
    htmlContent = htmlContent.replace(/^\`\`\`\n/, '');

    console.log(`[3] Generated HTML content (${htmlContent.length} characters). Updating microCMS...`);

    // 4. Update the draft in microCMS
    await client.update({
      endpoint,
      contentId,
      content: {
        content: htmlContent,
      },
    });

    console.log(`✅ Successfully generated and updated article: ${contentId}`);

  } catch (error) {
    console.error(`❌ Error generating article:`, error);
    process.exit(1);
  }
};

const args = process.argv.slice(2);
const targetContentId = args[0];

if (!targetContentId) {
  console.error("Usage: npx ts-node scripts/generate-article.ts <contentId>");
  process.exit(1);
}

generateArticle(targetContentId);
