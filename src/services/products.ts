import { mockProducts } from '../data/products';
import type { Product } from '../types/product';

export interface ProductsService {
  getProducts: () => Promise<Product[]>;
  getProductById: (id: string) => Promise<Product | undefined>;
}

export const productsService: ProductsService = {
  getProducts: async () => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return mockProducts;
  },
  getProductById: async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockProducts.find((product) => product.id === id);
  },
};
