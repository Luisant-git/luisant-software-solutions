import { productsApi, Product, sortProducts } from './productsApi';
import { clientsApi } from './clientsApi';

export type { Product };

export interface Client {
  id: string;
  name: string;
  logo: string;
  adminId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: "billing-software",
    name: "Billing Software",
    slug: "billing-software",
    description: "<p>Comprehensive billing and invoicing software built for retail, wholesale, and enterprise operations. Manage GST invoices, inventory tracking, barcodes, multi-counter billing, and insightful business financial reports effortlessly.</p>",
    points: [
      "GST Invoicing & Multi-Rate Tax Calculation",
      "Real-Time Inventory & Stock Management",
      "Barcode Scanning & Thermal Receipt Printing",
      "Customer Ledger & Credit Account Tracking",
      "Daily Sales, Purchase, and Profit/Loss Analytics",
    ],
    buttonName: "Book Free Demo",
    buttonUrl: "/customer-enquiry-form?service=Billing%20Software",
    banner: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1920",
    mobileBanner: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=750",
    order: 1,
    adminId: "admin",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "microfin-manager",
    name: "MicroFin Manager",
    slug: "microfin-manager",
    description: "<p>Specialized microfinance, chit fund, and daily collection loan management solution. Track borrowers, loan disbursements, daily/weekly/monthly EMI collections, automated interest calculations, and penalty management with multi-branch control.</p>",
    points: [
      "Daily, Weekly & Monthly Collection Schedules",
      "Field Collection Agent Management & Mobile Sync",
      "Automated Penalty & Interest Calculation",
      "Borrower KYC, Loan Approval & Disbursement Workflows",
      "Overdue Tracking, Defaulter Alerts & Audit Trail Reports",
    ],
    buttonName: "Book Free Demo",
    buttonUrl: "/customer-enquiry-form?service=MicroFin%20Manager",
    banner: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1920",
    mobileBanner: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=750",
    order: 2,
    adminId: "admin",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Products - Using API
export const getProducts = async (): Promise<Product[]> => {
  try {
    const products = await productsApi.getPublic();
    if (Array.isArray(products) && products.length > 0) {
      return sortProducts(products);
    }
    return FALLBACK_PRODUCTS;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return FALLBACK_PRODUCTS;
  }
};

export const getProductBySlug = async (slug: string): Promise<Product | undefined> => {
  if (!slug) return undefined;
  const cleanSlug = decodeURIComponent(slug).trim().toLowerCase();

  try {
    const direct = await productsApi.getBySlug(cleanSlug);
    if (direct) return direct;
  } catch (error) {
    // Continue to fallback search
  }

  // Fallback 1: Search in all public products from API
  try {
    const all = await productsApi.getPublic();
    if (Array.isArray(all) && all.length > 0) {
      const match = all.find(
        (p: Product) =>
          p.slug.toLowerCase() === cleanSlug ||
          p.id === slug ||
          p.name.toLowerCase().replace(/\s+/g, '-') === cleanSlug ||
          p.name.toLowerCase() === cleanSlug ||
          p.slug.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanSlug.replace(/[^a-z0-9]/g, '')
      );
      if (match) return match;
    }
  } catch (e) {
    // Continue to static fallback
  }

  // Fallback 2: Search in built-in fallback products
  const fallbackMatch = FALLBACK_PRODUCTS.find(
    (p) =>
      p.slug.toLowerCase() === cleanSlug ||
      p.id === slug ||
      p.name.toLowerCase().replace(/\s+/g, '-') === cleanSlug ||
      p.name.toLowerCase() === cleanSlug
  );

  return fallbackMatch;
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
