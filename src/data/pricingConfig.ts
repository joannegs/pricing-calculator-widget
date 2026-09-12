import type { PricingConfig } from '../types/pricing.types'

/**
 * Mocked pricing catalog. In a real integration this shape would come from
 * an API call (e.g. GET /api/pricing-config) instead of a static import —
 * every consumer already depends only on the `PricingConfig` type, so
 * swapping this for a fetch is a one-file change.
 */
export const pricingConfig: PricingConfig = {
  projectTypes: [
    {
      id: 'landing',
      label: 'Landing Page',
      description: 'Single-page site focused on one conversion goal.',
      basePrice: 800,
      baseHours: 16,
      pricePerScopeUnit: 60,
      scopeUnitLabel: 'Sections',
      scopeMin: 3,
      scopeMax: 10,
      includedScopeUnits: 3,
    },
    {
      id: 'institutional',
      label: 'Institutional Site',
      description: 'Multi-page site presenting a company and its services.',
      basePrice: 1500,
      baseHours: 30,
      pricePerScopeUnit: 120,
      scopeUnitLabel: 'Pages',
      scopeMin: 3,
      scopeMax: 15,
      includedScopeUnits: 3,
    },
    {
      id: 'ecommerce',
      label: 'E-commerce',
      description: 'Online store with product catalog and checkout.',
      basePrice: 3200,
      baseHours: 60,
      pricePerScopeUnit: 45,
      scopeUnitLabel: 'Product categories',
      scopeMin: 1,
      scopeMax: 20,
      includedScopeUnits: 1,
    },
    {
      id: 'webapp',
      label: 'Web App / SaaS MVP',
      description: 'Custom application with authentication and core features.',
      basePrice: 6000,
      baseHours: 120,
      pricePerScopeUnit: 900,
      scopeUnitLabel: 'Core features',
      scopeMin: 2,
      scopeMax: 12,
      includedScopeUnits: 2,
    },
  ],
  addons: [
    {
      id: 'seo',
      label: 'SEO Optimization',
      description: 'On-page SEO, metadata, and sitemap setup.',
      price: 350,
    },
    {
      id: 'cms',
      label: 'CMS Integration',
      description: 'Client-editable content via a headless CMS.',
      price: 600,
    },
    {
      id: 'i18n',
      label: 'Multi-language Support',
      description: 'Content and UI translated across locales.',
      price: 450,
    },
    {
      id: 'payments',
      label: 'Payment Gateway',
      description: 'Stripe/PayPal checkout integration.',
      price: 700,
    },
    {
      id: 'maintenance',
      label: 'Monthly Maintenance',
      description: 'Ongoing updates, backups, and support.',
      price: 250,
    },
    {
      id: 'analytics',
      label: 'Analytics Setup',
      description: 'Conversion tracking and dashboards.',
      price: 200,
    },
    {
      id: 'customDesign',
      label: 'Custom Design System',
      description: 'Tailored UI kit and motion design.',
      price: 900,
    },
  ],
  timelineOptions: [
    {
      id: 'flexible',
      label: 'Flexible',
      description: 'No rush — priority given to other projects.',
      priceModifier: 0.9,
    },
    {
      id: 'standard',
      label: 'Standard',
      description: 'Typical delivery timeline.',
      priceModifier: 1,
    },
    {
      id: 'rush',
      label: 'Rush',
      description: 'Expedited delivery, prioritized in the schedule.',
      priceModifier: 1.25,
    },
  ],
}
