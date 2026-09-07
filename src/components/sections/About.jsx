import { profile } from '../../data/profile'
import { Section } from '../layout/Section'

export function About() {
  return (
    <Section id="about" title="About">
      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_280px] md:gap-16">
        <div className="max-w-prose space-y-5">
          {profile.bio.map((para) => (
            <p key={para.slice(0, 32)} className="text-base">
              {para}
            </p>
          ))}

          {profile.community && (
            <p className="text-base text-muted">
              {profile.community.text}{' '}
              {profile.community.links?.map((l, i) => (
                <span key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="border-b border-line transition-colors hover:border-accent hover:text-accent"
                  >
                    {l.label}
                  </a>
                  {i < profile.community.links.length - 1 ? ', ' : '.'}
                </span>
              ))}
            </p>
          )}
        </div>

        <dl className="space-y-5 border-t border-line pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0">
          {profile.quickFacts.map((f) => (
            <div key={f.label}>
              <dt className="text-micro text-muted">{f.label}</dt>
              <dd className="mt-1 text-small">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
