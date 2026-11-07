/*
  Competitions and recognition.

  These events are still in progress, so this is the one file to edit when
  results come in. `status` is optional: leave it out once an event is finished.
*/

export type Highlight = {
  /** Short proof line shown in the strip near the top of the page. */
  label: string
  /** One line of context under the label. */
  detail: string
  period: string
  /** What happens next, while the event is still ongoing. */
  status?: string
  /**
   * Optional photo that proves the result, e.g. a plaque or awarding slide.
   * The file goes in public/recognition/. Shown as a small thumbnail link.
   */
  proof?: {
    src: string
    /** Describes what the image shows, for screen-reader users. */
    alt: string
    /** The visible link text under the thumbnail. */
    label: string
  }
}

export const highlights: Highlight[] = [
  {
    label: 'Regional Champion — DICT Philippine Startup Challenge XI',
    detail: 'Region IV-A CALABARZON',
    period: 'October 2026',
    status: 'Qualified for the Cluster-Wide Competition (November 2026)',
    proof: {
      src: '/recognition/dict-psc11-regional-champion.jpg',
      alt: 'Awarding slide: Plaque of Recognition for the Champion of the Philippine Startup Challenge 11 Regional Competition (Region IV-A CALABARZON), given 22 October 2026, shown beside the Second Vision, Team Innovision, De La Salle Lipa title',
      label: 'View plaque of recognition',
    },
  },
  {
    label: 'Top 3 of 10 Finalists — BAYANI Lab',
    detail: 'Selected as one of the top 3 teams among 10 finalists',
    period: 'October 2026',
    status:
      'Selected to pitch at YABONG 2026, the 5th PH Lifelong Learning Conference (December 2026), competing for final placement',
  },
]
