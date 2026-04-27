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
  const data = await client.getListDetail<Article>({
    endpoint: 'articles',
    contentId,
    queries,
  });
  return data;
};
