import { Metadata } from "next";
import ProductDetailClient from "./ProductDetailClient";

// Mock fetching function
async function getProductById(id: string) {
  // In a real app, fetch from NestJS backend
  return {
    id,
    name: "Oversized Cotton Tee",
    price: 45.00,
    description: "Our signature oversized cotton tee offers a relaxed fit and premium heavy-weight feel. Perfect for everyday wear, this piece combines comfort with a modern streetwear aesthetic.",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?auto=format&fit=crop&q=80&w=1000"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "White", hex: "#ffffff" },
      { name: "Black", hex: "#000000" },
      { name: "Sage", hex: "#879f84" },
    ]
  };
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await getProductById(params.id);
  
  return {
    title: `${product.name} | StyleForge`,
    description: product.description.substring(0, 160),
    openGraph: {
      title: product.name,
      description: product.description.substring(0, 160),
      images: [{ url: product.images[0] }],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description.substring(0, 160),
      images: [product.images[0]],
    }
  };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);
  
  return <ProductDetailClient product={product} />;
}
