export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  currencySymbol: string;
  mode: 'payment' | 'subscription';
}

export const STRIPE_PRODUCTS: StripeProduct[] = [
  {
    id: 'prod_TvFoiQxDINa2yG',
    priceId: 'price_1SxPJGKWH6qcDhpR972aS3Y0',
    name: 'Accès à Aura Lite',
    description: "Accès à l'académie Aura Lite",
    price: 500.00,
    currency: 'eur',
    currencySymbol: '€',
    mode: 'payment'
  }
];

export const getProductByPriceId = (priceId: string): StripeProduct | undefined => {
  return STRIPE_PRODUCTS.find(product => product.priceId === priceId);
};

export const formatPrice = (price: number, currencySymbol: string): string => {
  return `${(price / 100).toFixed(2)} ${currencySymbol}`;
};