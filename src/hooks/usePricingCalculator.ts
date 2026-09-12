import { useMemo, useState } from 'react'
import { pricingConfig } from '../data/pricingConfig'
import type { AddonId, ProjectTypeId, TimelineId } from '../types/pricing.types'
import { calculatePrice } from '../utils/calculatePrice'

export function usePricingCalculator() {
  const [projectTypeId, setProjectTypeId] = useState<ProjectTypeId>(
    pricingConfig.projectTypes[0].id,
  )
  const [addonIds, setAddonIds] = useState<AddonId[]>([])
  const [timelineId, setTimelineId] = useState<TimelineId>('standard')

  const projectType = useMemo(
    () => pricingConfig.projectTypes.find((type) => type.id === projectTypeId)!,
    [projectTypeId],
  )

  const [scopeUnits, setScopeUnits] = useState(projectType.includedScopeUnits)

  function selectProjectType(id: ProjectTypeId) {
    const nextType = pricingConfig.projectTypes.find((type) => type.id === id)!
    setProjectTypeId(id)
    setScopeUnits(
      Math.min(Math.max(nextType.includedScopeUnits, nextType.scopeMin), nextType.scopeMax),
    )
  }

  function toggleAddon(id: AddonId) {
    setAddonIds((current) =>
      current.includes(id)
        ? current.filter((addonId) => addonId !== id)
        : [...current, id],
    )
  }

  function reset() {
    selectProjectType(pricingConfig.projectTypes[0].id)
    setAddonIds([])
    setTimelineId('standard')
  }

  const breakdown = useMemo(
    () =>
      calculatePrice(
        { projectTypeId, scopeUnits, addonIds, timelineId },
        pricingConfig,
      ),
    [projectTypeId, scopeUnits, addonIds, timelineId],
  )

  return {
    config: pricingConfig,
    projectType,
    scopeUnits,
    addonIds,
    timelineId,
    breakdown,
    selectProjectType,
    setScopeUnits,
    toggleAddon,
    setTimelineId,
    reset,
  }
}
