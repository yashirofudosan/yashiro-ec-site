import { createClient, MicroCMSQueries } from 'microcms-js-sdk';

export interface Product {
  id: string;
  name: string;
  price: number;
  element: string[];
  desc?: string;
  image?: {
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

// Helper function to fetch products
export const getProducts = async (queries?: MicroCMSQueries) => {
  const data = await client.getList<Product>({
    endpoint: 'products',
    queries,
  });
  return data;
};

// Helper to fetch single product
export const getProductDetail = async (contentId: string, queries?: MicroCMSQueries) => {
  const data = await client.getListDetail<Product>({
    endpoint: 'products',
    contentId,
    queries,
  });
  return data;
};

// Helper function to fetch articles
export const getArticles = async (queries?: MicroCMSQueries) => {
  const data = await client.getList<Article>({
    endpoint: 'articles',
    queries,
  });
  return data;
};

// Helper to fetch single article
export const getArticleDetail = async (contentId: string, queries?: MicroCMSQueries) => {
  const detailData = await client.getListDetail<Article>({
    endpoint: "articles",
    contentId,
    queries,
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
  });
  return listData;
};

export const getLibraryDetail = async (contentId: string, queries?: MicroCMSQueries) => {
  const detailData = await client.getListDetail<Library>({
    endpoint: "library",
    contentId,
    queries,
  });
  return detailData;
};
