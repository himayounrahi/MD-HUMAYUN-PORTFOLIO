import { profile } from '../../data/profile'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="no-print border-t border-line py-10">
      <div
        className="mx-auto flex w-full max-w-shell flex-col gap-4 px-5 text-small text-muted
                   sm:px-8 md:flex-row md:items-center md:justify-between"
      >
        <p>
          &copy; {year} {profile.name}. Built with React and Vite.
        </p>
        <nav aria-label="Elsewhere" className="flex flex-wrap gap-x-6 gap-y-2">
          <a className="hover:text-accent" href={profile.contact.github} target="_blank" rel="noreferrer noopener">
            GitHub
          </a>
          <a className="hover:text-accent" href={profile.contact.linkedin} target="_blank" rel="noreferrer noopener">
            LinkedIn
          </a>
          <a className="hover:text-accent" href={profile.contact.leetcode} target="_blank" rel="noreferrer noopener">
            LeetCode
          </a>
          <a className="hover:text-accent" href={`mailto:${profile.contact.email}`}>
            Email
          </a>
        </nav>
      </div>
    </footer>
  )
}
