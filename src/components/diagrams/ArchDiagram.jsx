import { useId } from 'react'
import { ArrowMarker, DiagramScroller, Edge, LaneLabel, NODE_H, NODE_W, Node } from './primitives'

// ===========================================================================
//  ARCHITECTURE DIAGRAM
//  Data-driven: give it lanes (columns) of nodes plus links between node ids,
//  and it computes the layout. This is why adding a project stays a
//  one-object change -- no new component per diagram.
// ===========================================================================

const LANE_GAP = 56
const NODE_GAP = 22
const TOP = 34

export function ArchDiagram({ spec, animate = true }) {
  const markerId = `arrow-${useId().replace(/:/g, '')}`
  const { lanes = [], links = [] } = spec

  const laneStride = NODE_W + LANE_GAP
  const tallest = Math.max(...lanes.map((l) => l.nodes.length), 1)
  const width = lanes.length * laneStride - LANE_GAP + 4
  const height = TOP + tallest * (NODE_H + NODE_GAP) + 10

  // Resolve every node to an absolute position once, then draw links by id.
  const positions = {}
  lanes.forEach((lane, laneIndex) => {
    const laneHeight = lane.nodes.length * (NODE_H + NODE_GAP) - NODE_GAP
    const startY = TOP + (tallest * (NODE_H + NODE_GAP) - NODE_GAP - laneHeight) / 2
    lane.nodes.forEach((node, nodeIndex) => {
      positions[node.id] = {
        x: 2 + laneIndex * laneStride,
        y: startY + nodeIndex * (NODE_H + NODE_GAP),
        lane: laneIndex,
      }
    })
  })

  const path = (from, to) => {
    const a = positions[from]
    const b = positions[to]
    if (!a || !b) return null

    // Same column: straight vertical line between the two boxes.
    if (a.lane === b.lane) {
      const x = a.x + NODE_W / 2
      const goingDown = b.y > a.y
      const y1 = goingDown ? a.y + NODE_H : a.y
      const y2 = goingDown ? b.y : b.y + NODE_H
      return { d: `M ${x} ${y1} L ${x} ${y2}`, mid: { x: x + 8, y: (y1 + y2) / 2 } }
    }

    // Forward: leave the right edge, enter the left edge, with a soft curve.
    const backwards = b.lane < a.lane
    const x1 = backwards ? a.x : a.x + NODE_W
    const x2 = backwards ? b.x + NODE_W : b.x
    const y1 = a.y + NODE_H / 2
    const y2 = b.y + NODE_H / 2
    const cx = (x1 + x2) / 2
    return {
      d: `M ${x1} ${y1} C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`,
      mid: { x: cx, y: (y1 + y2) / 2 - 8 },
    }
  }

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

        {lanes.map((lane, i) => (
          <LaneLabel key={lane.title} x={2 + i * laneStride + NODE_W / 2} y={14}>
            {lane.title}
          </LaneLabel>
        ))}

        {links.map((link, i) => {
          const p = path(link.from, link.to)
          if (!p) return null
          return (
            <Edge
              key={`${link.from}-${link.to}-${i}`}
              d={p.d}
              markerId={markerId}
              label={link.label}
              labelPos={link.label ? p.mid : undefined}
              delay={0.15 + i * 0.04}
              animate={animate}
              dashed={link.label === 'enforced' || link.label === 'backprop'}
            />
          )
        })}

        {lanes.map((lane, laneIndex) =>
          lane.nodes.map((node, nodeIndex) => (
            <Node
              key={node.id}
              x={positions[node.id].x}
              y={positions[node.id].y}
              label={node.label}
              note={node.note}
              accent={laneIndex === lanes.length - 1}
              delay={laneIndex * 0.06 + nodeIndex * 0.03}
              animate={animate}
            />
          )),
        )}
      </svg>
    </DiagramScroller>
  )
}
