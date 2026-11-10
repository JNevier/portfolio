import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ComingSoonCard from './ComingSoonCard'

describe('ComingSoonCard', () => {
  it('shows its title and text, with no links or buttons', () => {
    render(<ComingSoonCard title="More soon" text="Check back later." />)

    expect(screen.getByText('More soon')).toBeInTheDocument()
    expect(screen.getByText('Check back later.')).toBeInTheDocument()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })
})
