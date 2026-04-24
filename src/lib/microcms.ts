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
