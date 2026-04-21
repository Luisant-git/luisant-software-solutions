export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  points: string[];
}

export interface Client {
  id: string;
  name: string;
  logo: string; // Base64 or URL
}

const STORAGE_KEY = 'luisant_products';
const CLIENTS_KEY = 'luisant_clients';

export const getProducts = (): Product[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveProduct = (product: Product) => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === product.id);
  if (index >= 0) {
    products[index] = product;
  } else {
    products.push(product);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

export const deleteProduct = (id: string) => {
  const products = getProducts().filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return getProducts().find(p => p.slug === slug);
};

export const getClients = (): Client[] => {
  const data = localStorage.getItem(CLIENTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveClient = (client: Client) => {
  const clients = getClients();
  const index = clients.findIndex(c => c.id === client.id);
  if (index >= 0) {
    clients[index] = client;
  } else {
    clients.push(client);
  }
  localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients));
};

export const deleteClient = (id: string) => {
  const clients = getClients().filter(c => c.id !== id);
  localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients));
};
