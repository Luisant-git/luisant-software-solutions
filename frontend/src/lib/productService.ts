import { productsApi } from './productsApi';
import { clientsApi } from './clientsApi';

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  points: string[];
  adminId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Client {
  id: string;
  name: string;
  logo: string;
  adminId?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Products - Using API
export const getProducts = async (): Promise<Product[]> => {
  try {
    return await productsApi.getPublic();
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
};

export const getProductBySlug = async (slug: string): Promise<Product | undefined> => {
  try {
    return await productsApi.getBySlug(slug);
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return undefined;
  }
};

// Clients - Using API
export const getClients = async (): Promise<Client[]> => {
  try {
    return await clientsApi.getPublic();
  } catch (error) {
    console.error('Failed to fetch clients:', error);
    return [];
  }
};

export const saveClient = (client: Client) => {
  // TODO: Implement client API
};

export const deleteClient = (id: string) => {
  // TODO: Implement client API
};
