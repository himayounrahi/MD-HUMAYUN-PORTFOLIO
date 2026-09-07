import { useEffect, useState } from 'react'
import { SimShell } from './SimShell'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { cn } from '../../lib/cn'

// ===========================================================================
//  RAG RETRIEVAL — interactive
//  Steps through the query path so the refusal fallback is visible. Choose a
//  question that the corpus does not cover and the chain refuses rather than
//  answering from the model's own memory, which is the behaviour the project
//  was built around.
// ===========================================================================

const QUERIES = [
  {
    id: 'in-corpus',
    label: 'A question the corpus covers',
    inCorpus: true,
    chunks: [
      { id: 'chunk 0412', score: 0.87 },
      { id: 'chunk 0087', score: 0.81 },
      { id: 'chunk 0233', score: 0.74 },
    ],
  },
  {
    id: 'out-of-corpus',
    label: 'A question the corpus does not cover',
    inCorpus: false,
    chunks: [
      { id: 'chunk 1009', score: 0.24 },
      { id: 'chunk 0641', score: 0.21 },
      { id: 'chunk 0318', score: 0.19 },
    ],
  },
]

const STEPS = ['Embed query', 'Search index', 'Retrieve top-3', 'Ground or refuse']

export function RagRetrievalSim() {
  const [queryId, setQueryId] = useState(QUERIES[0].id)
  const [step, setStep] = useState(0)
  const reduced = useReducedMotion()
  const query = QUERIES.find((q) => q.id === queryId)

  // Advance through the pipeline automatically once a query is chosen.
  useEffect(() => {
    if (step >= STEPS.length) return
    const delay = reduced ? 0 : 620
    const t = setTimeout(() => setStep((s) => s + 1), delay)
    return () => clearTimeout(t)
  }, [step, reduced])

  const restart = (id) => {
    setQueryId(id)
    setStep(0)
  }

  const done = step >= STEPS.length

  return (
    <SimShell
      title="What happens when retrieval comes back empty"
      onReset={() => setStep(0)}
      note="Chunk identifiers and similarity scores are illustrative. The behaviour shown — a refusal when no chunk clears the grounding bar — is the pipeline's actual design at temperature 0.4."
      controls={
        <div className="flex flex-wrap gap-2">
          {QUERIES.map((q) => (
            <button
              key={q.id}
              type="button"
              aria-pressed={q.id === queryId}
              onClick={() => restart(q.id)}
              className={cn(
                'border px-3 py-1.5 text-micro transition-colors',
                q.id === queryId
                  ? 'border-accent bg-accent text-bg'
                  : 'border-line text-muted hover:border-accent hover:text-accent',
              )}
            >
              {q.label}
            </button>
          ))}
        </div>
      }
    >
      <ol className="mb-6 grid gap-2 sm:grid-cols-4">
        {STEPS.map((s, i) => (
          <li
            key={s}
            className={cn(
              'border-t-2 pt-2 text-micro transition-colors duration-300',
              i < step ? 'border-accent text-fg' : 'border-line text-muted',
            )}
          >
            {s}
          </li>
        ))}
      </ol>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <p className="mb-2 text-micro text-muted">Retrieved chunks, by cosine similarity</p>
          <ul className="space-y-2">
            {query.chunks.map((c, i) => {
              const shown = step > 2
              return (
                <li key={c.id} className="flex items-center gap-3">
                  <span className="nums w-24 shrink-0 text-micro text-muted">{c.id}</span>
                  <span className="h-1.5 flex-1 bg-line">
                    <span
                      className={cn(
                        'block h-full transition-all duration-500',
                        query.inCorpus ? 'bg-accent' : 'bg-muted',
                      )}
                      style={{ width: shown ? `${c.score * 100}%` : '0%', transitionDelay: `${i * 80}ms` }}
                    />
                  </span>
                  <span className="nums w-10 shrink-0 text-right text-micro text-muted">
                    {shown ? c.score.toFixed(2) : '—'}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>

        <div
          className={cn(
            'border p-4 text-small transition-opacity duration-300',
            done ? 'opacity-100' : 'opacity-30',
            done && !query.inCorpus ? 'border-[#c2542f]/50' : 'border-line',
          )}
        >
          <p className="mb-2 text-micro text-muted">Chain output</p>
          {!done ? (
            <p className="text-muted">Working…</p>
          ) : query.inCorpus ? (
            <p>
              Answer assembled from the three retrieved chunks, with the source passages
              attached. Nothing outside the retrieved context enters the response.
            </p>
          ) : (
            <p className="text-[#c2542f]">
              No chunk clears the grounding threshold, so the chain refuses instead of
              answering. A model left unconstrained would have produced a fluent answer here
              from its training data.
            </p>
          )}
        </div>
      </div>
    </SimShell>
  )
}
