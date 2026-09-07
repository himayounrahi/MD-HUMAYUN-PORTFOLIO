import { useId } from 'react'
import { ArrowMarker, DiagramScroller, Edge, NODE_H, NODE_W, Node } from './primitives'

// ===========================================================================
//  WORKFLOW DIAGRAM
//  A left-to-right chain of steps, with an optional feedback loop drawn
//  underneath for pipelines that cycle.
// ===========================================================================

const STEP_GAP = 46
const TOP = 8

export function FlowDiagram({ spec, animate = true }) {
  const markerId = `flow-${useId().replace(/:/g, '')}`
  const { steps = [], loop } = spec

  const stride = NODE_W + STEP_GAP
  const width = steps.length * stride - STEP_GAP + 4
  const height = TOP + NODE_H + (loop ? 62 : 12)

  const xOf = (i) => 2 + i * stride
  const indexOf = (id) => steps.findIndex((s) => s.id === id)

  return (
    <DiagramScroller minWidth={width}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        role="img"
        aria-label={spec.caption}
        className="block"
      >
        <ArrowMarker id={markerId} />

        {steps.slice(0, -1).map((step, i) => (
          <Edge
            key={`edge-${step.id}`}
            d={`M ${xOf(i) + NODE_W} ${TOP + NODE_H / 2} L ${xOf(i + 1)} ${TOP + NODE_H / 2}`}
            markerId={markerId}
            delay={0.12 + i * 0.07}
            animate={animate}
          />
        ))}

        {loop &&
          (() => {
            const from = indexOf(loop.from)
            const to = indexOf(loop.to)
            if (from < 0 || to < 0) return null
            const y = TOP + NODE_H + 34
            const x1 = xOf(from) + NODE_W / 2
            const x2 = xOf(to) + NODE_W / 2
            return (
              <>
                <Edge
                  d={`M ${x1} ${TOP + NODE_H} L ${x1} ${y} L ${x2} ${y} L ${x2} ${TOP + NODE_H}`}
                  markerId={markerId}
                  delay={0.5}
                  animate={animate}
                  dashed
                />
                <text
                  x={(x1 + x2) / 2}
                  y={y + 16}
                  textAnchor="middle"
                  fill="var(--c-grey-500)"
                  fontSize="11"
                  fontFamily="Inter, system-ui, sans-serif"
                >
                  {loop.label}
                </text>
              </>
            )
          })()}

        {steps.map((step, i) => (
          <Node
            key={step.id}
            x={xOf(i)}
            y={TOP}
            label={step.label}
            note={step.detail}
            accent={i === steps.length - 1}
            delay={i * 0.06}
            animate={animate}
          />
        ))}
      </svg>
    </DiagramScroller>
  )
}
