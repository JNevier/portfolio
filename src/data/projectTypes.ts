/* The project types used by the filter chips. Order here = order of the chips (after "All"). */
export const projectTypes = [
  { id: 'full-stack', label: 'Full-Stack' },
  { id: 'front-end', label: 'Front-End' },
  { id: 'back-end', label: 'Back-End' },
  { id: 'iot', label: 'IoT' },
  { id: 'thesis', label: 'Thesis' },
] as const

export type ProjectTypeId = (typeof projectTypes)[number]['id']
