import { createClient, MicroCMSQueries } from 'microcms-js-sdk';

export interface Product {
  id: string;
  name: string;
  price: number;
  price_s?: number;
  price_m?: number;
  price_l?: number;
  element: string[];
  desc?: string;
  image?: {
    url: string;
    height: number;
    width: number;
  };
  image_s?: {
    url: string;
    height: number;
    width: number;
  };
  image_m?: {
    url: string;
    height: number;
    width: number;
  };
  image_l?: {
    url: string;
    height: number;
    width: number;
  };
  room?: string | string[];
  kind?: string | string[];
}

export interface Article {
  id: string;
  title: string;
  content: string;
  eyecatch?: {
    url: string;
    height: number;
    width: number;
  };
  category?: string[];
  publishedAt?: string;
  updatedAt?: string;
}

// Initialize the microCMS client
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || 'yashiro',
  apiKey: process.env.MICROCMS_API_KEY || '',
});

const getLocalProductBaseName = (name: string): string | undefined => {
  if (name.includes("エバーフレッシュ")) return "everfresh";
  if (name.includes("アオダモ")) return "aodamo";
  if (name.includes("アンスリウム")) return "anthurium";
  if (name.includes("クロトン")) return "croton";
  if (name.includes("ザミオカルカス")) return "zz_plant";
  if (name.includes("ドラセナ")) return "dracaena";
  if (name.includes("ガジュマル")) return "gajumaru";
  if (name.includes("チランジア")) return "xerographica";
  if (name.includes("ミリオンバンブー")) return "lucky_bamboo";
  if (name.includes("ポトス")) return "pothos";
  if (name.includes("ハオルチア")) return "haworthia";
  if (name.includes("エケベリア")) return "echeveria";
  if (name.includes("リトープス")) return "lithops";
  if (name.includes("オベサ")) return "obesa";
  if (name.includes("グリーンネックレス")) return "green_necklace";
  return undefined;
};

const mapProductLocalImage = <T extends Product>(product: T): T => {
  if (!product.image?.url) {
    const baseName = getLocalProductBaseName(product.name);
    if (baseName) {
      return {
        ...product,
        image: { url: `/images/${baseName}_m.png`, height: 1024, width: 1024 }, // default is M
        image_s: { url: `/images/${baseName}_s.png`, height: 1024, width: 1024 },
        image_m: { url: `/images/${baseName}_m.png`, height: 1024, width: 1024 },
        image_l: { url: `/images/${baseName}_l.png`, height: 1024, width: 1024 },
      };
    }
  }
  return product;
};

// Helper function to fetch products
export const getProducts = async (queries?: MicroCMSQueries) => {
  const data = await client.getList<Product>({
    endpoint: 'products',
    queries: { limit: 100, ...queries },
    customRequestInit: { cache: 'no-store' },
  });
  data.contents = data.contents.map(mapProductLocalImage);
  return data;
};

// Helper to fetch single product
export const getProductDetail = async (contentId: string, queries?: MicroCMSQueries) => {
  const data = await client.getListDetail<Product>({
    endpoint: 'products',
    contentId,
    queries,
    customRequestInit: { cache: 'no-store' },
  });
  return mapProductLocalImage(data);
};

// Helper function to fetch articles
export const getArticles = async (queries?: MicroCMSQueries) => {
  const data = await client.getList<Article>({
    endpoint: 'articles',
    queries,
    customRequestInit: { cache: 'no-store' },
  });
  return data;
};

// Helper to fetch single article
export const getArticleDetail = async (contentId: string, queries?: MicroCMSQueries) => {
  const detailData = await client.getListDetail<Article>({
    endpoint: "articles",
    contentId,
    queries,
    customRequestInit: { cache: 'no-store' },
  });
  return detailData;
};

// ==========================================
// 風水鑑定図書館 (Library / Appraisals)
// ==========================================
export interface Library {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  layout?: string[]; // 1R, 1K, 1LDK...
  period?: string[]; // 第8運, 第9運...
  facing?: string[]; // 南向き, 子山午向...
  eyecatch?: {
    url: string;
    height: number;
    width: number;
  };
  content: string;
  chartImage?: {
    url: string;
    height: number;
    width: number;
  };
  remedyWood?: string;
  remedyFire?: string;
  remedyEarth?: string;
  remedyMetal?: string;
  remedyWater?: string;
}

export const getLibraries = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<Library>({
    endpoint: "library",
    queries,
    customRequestInit: { cache: 'no-store' },
  });
  return listData;
};

export const getLibraryDetail = async (contentId: string, queries?: MicroCMSQueries) => {
  const detailData = await client.getListDetail<Library>({
    endpoint: "library",
    contentId,
    queries,
    customRequestInit: { cache: 'no-store' },
  });
  return detailData;
};
