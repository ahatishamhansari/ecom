import { MetadataRoute } from 'next';

// Define base URL depending on environment
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://styleforge.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Base static routes
  const routes = [
    '',
    '/collections',
    '/men',
    '/women',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  try {
    // In a real application, you'd fetch all product slugs.
    // For this prototype, we'll fetch a batch from the API.
    const res = await fetch('http://localhost:3001/products?limit=100');
    if (res.ok) {
      const data = await res.json();
      const productRoutes = (data.products || []).map((product: any) => ({
        url: `${baseUrl}/products/${product._id || product.slug}`,
        lastModified: product.updatedAt ? new Date(product.updatedAt).toISOString() : new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }));
      return [...routes, ...productRoutes];
    }
  } catch (error) {
    console.error('Failed to generate dynamic sitemap for products', error);
  }

  return routes;
}
