import Stripe from 'stripe';

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      typescript: true,
    });
  }
  return _stripe;
}

export const PRICES = {
  lifetime: process.env.STRIPE_PRICE_ID_LIFETIME || '',
  monthly: process.env.STRIPE_PRICE_ID_MONTHLY || '',
};
