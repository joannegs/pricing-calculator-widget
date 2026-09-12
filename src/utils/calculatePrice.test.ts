import { describe, expect, it } from 'vitest'
import { pricingConfig } from '../data/pricingConfig'
import { calculatePrice } from './calculatePrice'

describe('calculatePrice', () => {
  it('returns the base price when scope is within the included units and no add-ons are selected', () => {
    const result = calculatePrice(
      {
        projectTypeId: 'landing',
        scopeUnits: 3,
        addonIds: [],
        timelineId: 'standard',
      },
      pricingConfig,
    )

    expect(result.lineItems).toEqual([{ label: 'Landing Page', amount: 800 }])
    expect(result.subtotal).toBe(800)
    expect(result.total).toBe(800)
    expect(result.timelineModifierAmount).toBe(0)
  })

  it('adds a line item for scope above the included units', () => {
    const result = calculatePrice(
      {
        projectTypeId: 'landing',
        scopeUnits: 5,
        addonIds: [],
        timelineId: 'standard',
      },
      pricingConfig,
    )

    expect(result.lineItems).toContainEqual({
      label: 'Sections (extra)',
      amount: 120,
    })
    expect(result.subtotal).toBe(920)
  })

  it('sums selected add-ons into the breakdown', () => {
    const result = calculatePrice(
      {
        projectTypeId: 'institutional',
        scopeUnits: 3,
        addonIds: ['seo', 'cms'],
        timelineId: 'standard',
      },
      pricingConfig,
    )

    expect(result.lineItems).toContainEqual({
      label: 'SEO Optimization',
      amount: 350,
    })
    expect(result.lineItems).toContainEqual({
      label: 'CMS Integration',
      amount: 600,
    })
    expect(result.subtotal).toBe(1500 + 350 + 600)
  })

  it('ignores unknown add-on ids gracefully', () => {
    const result = calculatePrice(
      {
        projectTypeId: 'landing',
        scopeUnits: 3,
        // @ts-expect-error
        addonIds: ['not-a-real-addon'],
        timelineId: 'standard',
      },
      pricingConfig,
    )

    expect(result.lineItems).toEqual([{ label: 'Landing Page', amount: 800 }])
  })

  it('applies a rush surcharge on top of the subtotal', () => {
    const result = calculatePrice(
      {
        projectTypeId: 'landing',
        scopeUnits: 3,
        addonIds: [],
        timelineId: 'rush',
      },
      pricingConfig,
    )

    expect(result.subtotal).toBe(800)
    expect(result.total).toBe(1000)
    expect(result.timelineModifierAmount).toBe(200)
  })

  it('applies a flexible discount on top of the subtotal', () => {
    const result = calculatePrice(
      {
        projectTypeId: 'landing',
        scopeUnits: 3,
        addonIds: [],
        timelineId: 'flexible',
      },
      pricingConfig,
    )

    expect(result.total).toBe(720)
    expect(result.timelineModifierAmount).toBe(-80)
  })

  it('computes a full combination of scope, add-ons, and timeline together', () => {
    const result = calculatePrice(
      {
        projectTypeId: 'ecommerce',
        scopeUnits: 4,
        addonIds: ['payments', 'analytics'],
        timelineId: 'rush',
      },
      pricingConfig,
    )

    expect(result.subtotal).toBe(4235)
    expect(result.total).toBe(Math.round(4235 * 1.25))
  })

  it('returns the base hours estimate for the selected project type', () => {
    const result = calculatePrice(
      {
        projectTypeId: 'webapp',
        scopeUnits: 2,
        addonIds: [],
        timelineId: 'standard',
      },
      pricingConfig,
    )

    expect(result.estimatedHours).toBe(120)
  })

  it('throws for an unknown project type', () => {
    expect(() =>
      calculatePrice(
        {
          // @ts-expect-error
          projectTypeId: 'not-a-real-type',
          scopeUnits: 1,
          addonIds: [],
          timelineId: 'standard',
        },
        pricingConfig,
      ),
    ).toThrow(/Unknown project type/)
  })
})
