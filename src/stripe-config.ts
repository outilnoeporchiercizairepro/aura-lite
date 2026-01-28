export interface StripeProduct {
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  price: number;
  currency: string;
}

export const stripeProducts: StripeProduct[] = [
  {
    priceId: 'price_1SuYmtBXZHj9kkha3DZkgZdP',
    name: 'Accès Aura Lite à vie',
    description: 'Aura Lite : Formation complète pour créer votre agence AAA (Automatisation, Agents IA, Marketing et Vente). Maîtrisez n8n, construisez des automatisations IA et monétisez vos services.',
    mode: 'payment',
    price: 500.00,
    currency: 'eur'
  }
];

export function getProductByPriceId(priceId: string): StripeProduct | undefined {
  return stripeProducts.find(product => product.priceId === priceId);
}

export function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(price);
}