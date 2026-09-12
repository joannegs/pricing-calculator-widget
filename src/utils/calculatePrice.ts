import type {
  PriceBreakdown,
  PricingConfig,
  PricingSelection,
} from '../types/pricing.types'

export function calculatePrice(
  selection: PricingSelection,
  config: PricingConfig,
): PriceBreakdown {
  const projectType = config.projectTypes.find(
    (type) => type.id === selection.projectTypeId,
  )
  if (!projectType) {
    throw new Error(`Unknown project type: ${selection.projectTypeId}`)
  }

  const timeline = config.timelineOptions.find(
    (option) => option.id === selection.timelineId,
  )
  if (!timeline) {
    throw new Error(`Unknown timeline option: ${selection.timelineId}`)
  }

  const extraScopeUnits = Math.max(
    0,
    selection.scopeUnits - projectType.includedScopeUnits,
  )
  const scopeAmount = extraScopeUnits * projectType.pricePerScopeUnit

  const selectedAddons = config.addons.filter((addon) =>
    selection.addonIds.includes(addon.id),
  )

  const lineItems = [
    { label: projectType.label, amount: projectType.basePrice },
    ...(scopeAmount > 0
      ? [{ label: `${projectType.scopeUnitLabel} (extra)`, amount: scopeAmount }]
      : []),
    ...selectedAddons.map((addon) => ({
      label: addon.label,
      amount: addon.price,
    })),
  ]

  const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0)
  const total = Math.round(subtotal * timeline.priceModifier)
  const timelineModifierAmount = total - subtotal

  return {
    lineItems,
    subtotal,
    timelineModifierAmount,
    total,
    estimatedHours: projectType.baseHours,
  }
}
