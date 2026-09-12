export type ProjectTypeId = 'landing' | 'institutional' | 'ecommerce' | 'webapp'

export interface ProjectType {
  id: ProjectTypeId
  label: string
  description: string
  basePrice: number
  baseHours: number
  /** Price added per unit above the included scope. */
  pricePerScopeUnit: number
  /** Label for the scope slider, e.g. "Pages" or "Core features". */
  scopeUnitLabel: string
  scopeMin: number
  scopeMax: number
  /** Units already covered by basePrice before pricePerScopeUnit kicks in. */
  includedScopeUnits: number
}

export type AddonId =
  | 'seo'
  | 'cms'
  | 'i18n'
  | 'payments'
  | 'maintenance'
  | 'analytics'
  | 'customDesign'

export interface Addon {
  id: AddonId
  label: string
  description: string
  price: number
}

export type TimelineId = 'standard' | 'rush' | 'flexible'

export interface TimelineOption {
  id: TimelineId
  label: string
  description: string
  /** Multiplier applied to the running subtotal, e.g. 1.25 for +25%. */
  priceModifier: number
}

export interface PricingConfig {
  projectTypes: ProjectType[]
  addons: Addon[]
  timelineOptions: TimelineOption[]
}

export interface PricingSelection {
  projectTypeId: ProjectTypeId
  scopeUnits: number
  addonIds: AddonId[]
  timelineId: TimelineId
}

export interface PriceLineItem {
  label: string
  amount: number
}

export interface PriceBreakdown {
  lineItems: PriceLineItem[]
  /** Sum of line items before the timeline modifier is applied. */
  subtotal: number
  timelineModifierAmount: number
  total: number
  estimatedHours: number
}
