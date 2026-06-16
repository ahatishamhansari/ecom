import type { Metadata } from "next";
import CollectionsClient from "./CollectionsClient";

// Dynamic metadata with a canonical URL to prevent SEO duplicate content penalties
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "All Collections | StyleForge",
    description: "Shop all featured collections at StyleForge. Find your perfect fit.",
    alternates: {
      canonical: "https://styleforge.com/collections",
    },
  };
}

export default function CollectionsPage() {
  return <CollectionsClient />;
}
