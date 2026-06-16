export async function fetchConfig() {
  const response = await fetch('/config.json');
  if (!response.ok) {
    throw new Error('Could not load config');
  }
  return response.json();
}

export function findProductBySlug(config, slug) {
  return config.products?.find((product) => product.slug === slug);
}

export function getCategories(config) {
  const categories = config.products?.map((product) => product.category) || [];
  return [...new Set(categories)];
}
