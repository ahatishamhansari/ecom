import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import "./page.css";

export const metadata: Metadata = {
  title: "StyleForge | Premium Fashion Commerce",
  description: "Discover the latest trends and essential wardrobe pieces at StyleForge. Shop our featured collections.",
  openGraph: {
    title: "StyleForge | Premium Fashion",
    description: "Discover the latest trends and essential wardrobe pieces at StyleForge.",
    url: "https://styleforge.com",
    siteName: "StyleForge",
    images: [
      {
        url: "https://styleforge.com/og-image.jpg", // placeholder
        width: 1200,
        height: 630,
        alt: "StyleForge Storefront",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StyleForge | Premium Fashion",
    description: "Discover the latest trends and essential wardrobe pieces at StyleForge.",
    images: ["https://styleforge.com/og-image.jpg"], // placeholder
  },
};

const FEATURED_COLLECTIONS = [
  {
    id: "summer-26",
    title: "Summer '26",
    description: "Lightweight fabrics and vibrant colors for the warm season.",
    imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800",
    link: "/collections/summer",
  },
  {
    id: "minimalist",
    title: "Minimalist Essentials",
    description: "Clean lines and neutral tones for everyday wear.",
    imageUrl: "https://images.unsplash.com/photo-1434389678278-be43e460f81d?auto=format&fit=crop&q=80&w=800",
    link: "/collections/minimalist",
  },
  {
    id: "streetwear",
    title: "Streetwear Drops",
    description: "Exclusive limited-edition urban fashion.",
    imageUrl: "https://images.unsplash.com/photo-1550614000-4b95dd10db38?auto=format&fit=crop&q=80&w=800",
    link: "/collections/streetwear",
  },
];

import Script from "next/script";

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'StyleForge',
    url: 'https://styleforge.com',
    logo: 'https://styleforge.com/logo.png',
    sameAs: [
      'https://twitter.com/styleforge',
      'https://instagram.com/styleforge',
    ],
  };

  return (
    <>
      <Script
        id="org-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="home-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-background animate-fade-in" />
          <div className="hero-content container">
            <h1 className="hero-title animate-slide-up">
              The Future of Fashion Commerce
            </h1>
            <p className="hero-subtitle animate-slide-up" style={{ animationDelay: "150ms" }}>
              Experience AI-driven style curation. Discover pieces perfectly tailored to your unique taste.
            </p>
            <div className="hero-actions animate-slide-up" style={{ animationDelay: "300ms" }}>
              <Button size="lg" className="hero-btn">Shop New Arrivals</Button>
              <Button size="lg" variant="outline" className="hero-btn-outline">Explore AI Stylist</Button>
            </div>
          </div>
        </section>

        {/* Featured Collections */}
        <section className="collections-section container">
          <div className="collections-header">
            <h2 className="collections-title">Featured Collections</h2>
            <Link href="/collections" className="collections-link">
              View All →
            </Link>
          </div>
          
          <div className="collections-grid">
            {FEATURED_COLLECTIONS.map((collection) => (
              <Link key={collection.id} href={collection.link} className="collection-card-link">
                <Card className="collection-card glass-effect">
                  <div className="collection-image-wrapper">
                    <Image 
                      src={collection.imageUrl} 
                      alt={collection.title}
                      fill
                      className="collection-image"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{collection.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="collection-description">{collection.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
