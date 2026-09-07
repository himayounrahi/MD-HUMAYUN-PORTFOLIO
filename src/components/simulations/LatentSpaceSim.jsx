import { useState } from 'react'
import { SimShell, SimSlider } from './SimShell'
import { cn } from '../../lib/cn'

// ===========================================================================
//  POSTERIOR COLLAPSE — interactive
//  This demo reproduces the diagnostic used on the face model: when the KL
//  term is scaled too high, every latent dimension collapses onto the prior
//  and stops carrying information, while reconstructions still look fine for
//  a while. Sliding beta shows the trade-off and the point where it breaks.
// ===========================================================================

const DIMS = 12

/**
 * Per-dimension "active variance". At beta = 1 the latent space is healthy;
 * as beta rises, dimensions collapse one after another toward the prior,
 * which is exactly the failure signature seen on LFW.
 */
function latentActivity(beta) {
  return Array.from({ length: DIMS }, (_, i) => {
    const resilience = 0.35 + (i / DIMS) * 0.65 // some dimensions survive longer
    const pressure = Math.max(0, beta - 1) * 1.35
    const activity = Math.max(0.02, resilience - pressure * resilience)
    return activity
  })
}

export function LatentSpaceSim() {
  const [beta, setBeta] = useState(1)

  const activity = latentActivity(beta)
  const activeDims = activity.filter((a) => a > 0.12).length
  const collapsed = activeDims <= 3

  // Reconstruction stays deceptively acceptable well past the point where the
  // latent space has stopped being useful -- that is the whole trap.
  const reconstruction = beta < 1 ? 0.62 + beta * 0.06 : Math.max(0.3, 0.7 - (beta - 1) * 0.12)

  return (
    <SimShell
      title="KL weight and latent collapse"
      onReset={() => setBeta(1)}
      note="A schematic of the diagnostic, not model output: it shows the shape of the failure that appeared on the face data and how latent variance revealed it. Reported metrics for the trained models are SSIM 0.678 and PSNR 23.40 dB."
      controls={
        <SimSlider
          id="vae-beta"
          label="KL term weight (beta)"
          value={beta}
          min={0.2}
          max={3}
          step={0.1}
          onChange={setBeta}
          display={beta.toFixed(1)}
        />
      }
    >
      <div className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="mb-3 text-micro text-muted">
            Information carried per latent dimension
          </p>
          <div className="flex h-32 items-end gap-1.5" role="img"
               aria-label={`${activeDims} of ${DIMS} latent dimensions are still carrying information`}>
            {activity.map((a, i) => (
              <div
                key={i}
                className={cn(
                  'flex-1 transition-all duration-300 ease-out',
                  a > 0.12 ? 'bg-accent' : 'bg-line',
                )}
                style={{ height: `${Math.max(3, a * 100)}%` }}
              />
            ))}
          </div>
          <p className="nums mt-3 text-small">
            <span className={collapsed ? 'text-[#c2542f]' : 'text-accent'}>
              {activeDims} of {DIMS}
            </span>{' '}
            <span className="text-muted">dimensions still informative</span>
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-micro text-muted">Reconstruction quality</p>
            <div className="mt-2 h-2 w-full bg-line">
              <div
                className="h-full bg-fg transition-all duration-300"
                style={{ width: `${reconstruction * 100}%` }}
              />
            </div>
          </div>

          <div
            className={cn(
              'border p-3 text-small',
              collapsed ? 'border-[#c2542f]/50 text-[#c2542f]' : 'border-line text-muted',
            )}
          >
            {collapsed
              ? 'Posterior collapse. The decoder is ignoring the latent code and reconstructions come from the prior — note that image quality has barely moved, which is why this is missed without checking latent statistics.'
              : beta < 0.8
                ? 'Weak KL pressure. The latent space is informative but poorly regularised, so sampling between points gets unreliable.'
                : 'Healthy. Latent variance is spread across dimensions and the decoder is genuinely using the code.'}
          </div>
        </div>
      </div>
    </SimShell>
  )
}
