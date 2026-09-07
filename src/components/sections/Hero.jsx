import { motion } from 'framer-motion'
import { ArrowUpRight, FileDown, Github, Linkedin, Mail } from 'lucide-react'
import { profile } from '../../data/profile'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Button } from '../ui/Button'

/**
 * The one orchestrated motion moment on the site: a short staggered settle on
 * first load. Nothing else animates on scroll except the diagrams drawing in.
 */
export function Hero() {
  const reduced = useReducedMotion()

  const stagger = (i) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] },
        }

  return (
    <section id="hero" className="scroll-mt-24 pb-section-sm pt-16 md:pb-section md:pt-24">
      <div className="mx-auto w-full max-w-shell px-5 sm:px-8">
        <div className="grid items-start gap-10 md:grid-cols-[minmax(0,1fr)_260px] md:gap-16">
          <div className="min-w-0">
            <motion.p {...stagger(0)} className="text-small text-muted">
              {profile.title}
            </motion.p>

            <motion.h1
              {...stagger(1)}
              className="mt-3 font-display text-h2 font-semibold md:text-h1"
            >
              {profile.name}
            </motion.h1>

            <motion.p {...stagger(2)} className="mt-6 max-w-prose text-lead">
              {profile.pitch}
            </motion.p>

            <motion.div {...stagger(3)} className="mt-9 flex flex-wrap gap-3">
              <Button href={profile.contact.resume} external variant="primary">
                <FileDown size={15} aria-hidden />
                Resume
              </Button>
              <Button href={profile.contact.github} external variant="secondary">
                <Github size={15} aria-hidden />
                GitHub
              </Button>
              <Button href={profile.contact.linkedin} external variant="secondary">
                <Linkedin size={15} aria-hidden />
                LinkedIn
              </Button>
              <Button href={`mailto:${profile.contact.email}`} variant="secondary">
                <Mail size={15} aria-hidden />
                Email
              </Button>
            </motion.div>

            <motion.a
              {...stagger(4)}
              href="#projects"
              className="mt-10 inline-flex items-center gap-1.5 border-b border-line pb-1 text-small
                         text-muted transition-colors hover:border-accent hover:text-accent"
            >
              Read the work
              <ArrowUpRight size={14} aria-hidden />
            </motion.a>
          </div>

          {/* Photo. The source is a white-background studio shot, so it is
              desaturated and tinted to sit inside the palette instead of
              punching a white rectangle through the page in dark mode. */}
          <motion.div {...stagger(2)} className="order-first md:order-none">
            <div className="relative w-40 overflow-hidden bg-surface md:w-full">
              <picture>
                <source srcSet={profile.photo.src} type="image/webp" />
                <img
                  src={profile.photo.fallback}
                  alt={profile.photo.alt}
                  width="800"
                  height="800"
                  className="block w-full grayscale-[0.85] contrast-[1.04] mix-blend-multiply dark:mix-blend-screen dark:invert-0 dark:grayscale-[0.6] dark:opacity-90"
                />
              </picture>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-accent/10 mix-blend-color"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
