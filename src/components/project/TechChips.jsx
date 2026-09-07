import { Tag } from '../ui/Tag'

export function TechChips({ items }) {
  if (!items || items.length === 0) return null
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <li key={t}>
          <Tag>{t}</Tag>
        </li>
      ))}
    </ul>
  )
}
