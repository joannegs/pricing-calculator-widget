import { usePricingCalculator } from '../hooks/usePricingCalculator'
import { AddonsList } from './pricing/AddonsList'
import { PriceSummary } from './pricing/PriceSummary'
import { ProjectTypeSelector } from './pricing/ProjectTypeSelector'
import { ScopeSlider } from './pricing/ScopeSlider'
import { TimelineSelector } from './pricing/TimelineSelector'

export function PricingCalculator() {
  const {
    config,
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
  } = usePricingCalculator()

  return (
    <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 p-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Project cost estimator
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Configure your project to get an estimative.
          </p>
        </div>

        <ProjectTypeSelector
          projectTypes={config.projectTypes}
          selectedId={projectType.id}
          onSelect={selectProjectType}
        />

        <ScopeSlider projectType={projectType} value={scopeUnits} onChange={setScopeUnits} />

        <AddonsList addons={config.addons} selectedIds={addonIds} onToggle={toggleAddon} />

        <TimelineSelector
          options={config.timelineOptions}
          selectedId={timelineId}
          onSelect={setTimelineId}
        />
      </div>

      <PriceSummary breakdown={breakdown} onReset={reset} />
    </div>
  )
}
