import { describe, expect, it } from 'vitest'
import { projectTypes } from './projectTypes'
import { FEATURED_COUNT, projects } from './projects'

const typeIds: string[] = projectTypes.map((type) => type.id)

describe('projects data', () => {
  it('has a unique slug for every project', () => {
    const slugs = projects.map((project) => project.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('gives every project at least one valid type', () => {
    for (const project of projects) {
      expect(project.types.length).toBeGreaterThan(0)
      for (const type of project.types) {
        expect(typeIds).toContain(type)
      }
    }
  })

  it('only uses https:// for live demo links', () => {
    const liveLinks = projects.flatMap((project) =>
      project.links.filter((link) => link.live),
    )
    for (const link of liveLinks) {
      expect(link.href.startsWith('https://')).toBe(true)
    }
  })

  it('features the first three projects on the home page', () => {
    expect(FEATURED_COUNT).toBe(3)
    expect(projects.slice(0, 3).map((project) => project.slug)).toEqual([
      'second-vision',
      'sobre-pos',
      'studyspot-ph',
    ])
  })
})
