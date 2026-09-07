// ===========================================================================
//  ENGINEERING NOTES — short write-ups of problems you have actually solved.
//
//  This is the section that closes the DSA gap. A LeetCode link proves you
//  have an account; a write-up proves you can reason about complexity and
//  explain a decision, which is what an interviewer is actually screening for.
//
//  The section is switched OFF in src/config/site.js until there are at least
//  two entries here -- one lonely note looks worse than none.
//  Turn it on with:  { id: 'notes', enabled: true, nav: 'Notes' }
//
//  FIELD REFERENCE
//  title       required  the problem, in your own words
//  tags        required  e.g. ['Graphs', 'Binary search']
//  naive       required  the obvious approach and its complexity
//  whyItFails  required  the specific reason the obvious approach breaks
//  approach    required  what you did instead, and why it works
//  complexity  required  { time, space }
//  code        optional  a short C++ excerpt -- the core loop, not the whole file
//  link        optional  problem URL or your solution
// ===========================================================================

export const notes = [
  // ---------------------------------------------------------------------
  // TEMPLATE — copy this, fill it in, delete this comment.
  // Keep `naive` and `whyItFails` honest and specific. "It is slow" says
  // nothing; "it re-sorts inside the loop, so it is O(n^2 log n)" says a lot.
  // ---------------------------------------------------------------------
  // {
  //   title: 'Shortest path with one edge you may halve',
  //   tags: ['Graphs', 'Dijkstra', 'State-space search'],
  //   naive:
  //     'Run Dijkstra once per candidate edge, halving that edge each time. O(E) runs of O(E log V).',
  //   whyItFails:
  //     'The candidate set is every edge, so the cost multiplies by E and it times out past a few thousand edges. It also recomputes almost identical shortest-path trees each run.',
  //   approach:
  //     'Duplicate the graph into two layers: layer 0 is "discount unused", layer 1 is "discount already spent". A halved edge moves you from layer 0 to layer 1. One Dijkstra over the doubled graph answers the whole question, because the layer index carries the state the naive version was re-deriving.',
  //   complexity: { time: 'O(E log V)', space: 'O(V + E)' },
  //   code: `// two layers: node u in layer L is encoded as u + L * n
  // pq.push({0, src});
  // while (!pq.empty()) {
  //     auto [d, u] = pq.top(); pq.pop();
  //     if (d > dist[u]) continue;
  //     for (auto [v, w] : adj[u % n]) {
  //         relax(u, v, w);                    // stay in this layer
  //         if (u < n) relax(u, v + n, w / 2); // spend the discount
  //     }
  // }`,
  //   link: 'https://leetcode.com/u/mdhumayun7/',
  // },
]
