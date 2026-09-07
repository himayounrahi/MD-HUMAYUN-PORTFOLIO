import { useState } from 'react'
import { SimShell, SimSlider } from './SimShell'
import { cn } from '../../lib/cn'

// ===========================================================================
//  DDoS PIPELINE — interactive
//  Drag the flood intensity up and watch the detector and the mitigation
//  respond. The two endpoints (54.3 Gbps clean, 31 Gbps under full flood)
//  are the measured values from the project; everything between them is
//  interpolated for illustration, which the note below states plainly.
// ===========================================================================

const CLEAN_THROUGHPUT = 54.3
const FLOODED_THROUGHPUT = 31.0
const DETECTION_THRESHOLD = 45 // percent of max flood intensity

export function DdosPipelineSim() {
  const [intensity, setIntensity] = useState(0)
  const [detectorOn, setDetectorOn] = useState(true)

  const detected = detectorOn && intensity >= DETECTION_THRESHOLD
  const ratio = intensity / 100

  // With mitigation active the attacker's traffic is dropped at the switch,
  // so throughput climbs back toward the clean baseline.
  const throughput = detected
    ? CLEAN_THROUGHPUT - (CLEAN_THROUGHPUT - FLOODED_THROUGHPUT) * ratio * 0.15
    : CLEAN_THROUGHPUT - (CLEAN_THROUGHPUT - FLOODED_THROUGHPUT) * ratio

  const latencyFactor = detected ? 1 + ratio * 1.2 : 1 + ratio * 10

  const stage = detected
    ? 'mitigating'
    : intensity >= DETECTION_THRESHOLD
      ? 'attack'
      : intensity > 8
        ? 'elevated'
        : 'normal'

  const stageCopy = {
    normal: { label: 'Normal traffic', tone: 'ok' },
    elevated: { label: 'Traffic elevated, below the classifier threshold', tone: 'warn' },
    attack: { label: 'Flood in progress — detector disabled, no mitigation', tone: 'bad' },
    mitigating: { label: 'Classified as attack — DROP rule installed on the switch', tone: 'ok' },
  }[stage]

  return (
    <SimShell
      title="Flood intensity and the control loop"
      onReset={() => {
        setIntensity(0)
        setDetectorOn(true)
      }}
      note="Clean and fully flooded throughput (54.3 and 31 Gbps) are measured values from the project. Intermediate points are interpolated to show the shape of the response."
      controls={
        <div className="space-y-4">
          <SimSlider
            id="ddos-intensity"
            label="Flood intensity"
            value={intensity}
            min={0}
            max={100}
            onChange={setIntensity}
            display={`${intensity}%`}
          />
          <label className="flex items-center gap-2 text-micro text-muted">
            <input
              type="checkbox"
              checked={detectorOn}
              onChange={(e) => setDetectorOn(e.target.checked)}
              className="h-3.5 w-3.5 accent-[var(--c-accent)]"
            />
            Random Forest detector active on the controller
          </label>
        </div>
      }
    >
      <div className="grid gap-6 sm:grid-cols-3">
        <Readout
          label="Throughput"
          value={throughput.toFixed(1)}
          unit="Gbps"
          bad={throughput < 40}
        />
        <Readout
          label="Latency"
          value={`${latencyFactor.toFixed(1)}x`}
          unit="of baseline"
          bad={latencyFactor > 4}
        />
        <Readout
          label="Attacker traffic"
          value={detected ? 'dropped' : intensity > 8 ? 'forwarded' : 'none'}
          unit={detected ? 'at the switch' : 'to the victim'}
          bad={!detected && intensity >= DETECTION_THRESHOLD}
        />
      </div>

      {/* Throughput bar: the clearest single indicator of what is happening. */}
      <div className="mt-6">
        <div className="h-2 w-full overflow-hidden bg-line">
          <div
            className={cn(
              'h-full transition-all duration-300 ease-out',
              throughput < 40 ? 'bg-[#c2542f]' : 'bg-accent',
            )}
            style={{ width: `${(throughput / CLEAN_THROUGHPUT) * 100}%` }}
          />
        </div>
        <p
          className={cn(
            'mt-3 text-small',
            stageCopy.tone === 'bad' ? 'text-[#c2542f]' : stageCopy.tone === 'warn' ? 'text-muted' : 'text-accent',
          )}
        >
          {stageCopy.label}
        </p>
      </div>
    </SimShell>
  )
}

function Readout({ label, value, unit, bad }) {
  return (
    <div>
      <p className="text-micro text-muted">{label}</p>
      <p
        className={cn(
          'nums font-display text-h4 font-semibold leading-none',
          bad ? 'text-[#c2542f]' : 'text-fg',
        )}
      >
        {value}
      </p>
      <p className="mt-1 text-micro text-muted">{unit}</p>
    </div>
  )
}
