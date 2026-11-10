import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import FilterChips from './FilterChips'

const options = [
  { id: 'all', label: 'All', count: 3 },
  { id: 'web', label: 'Web', count: 2 },
  { id: 'empty', label: 'Empty', count: 0 },
]

/* Keeps the chosen value in state, like the real page does with the URL. */
function Harness() {
  const [value, setValue] = useState('all')
  return <FilterChips options={options} value={value} onChange={setValue} />
}

describe('FilterChips', () => {
  it('renders a labelled group with one button per option, showing label and count', () => {
    render(<FilterChips options={options} value="all" onChange={() => {}} />)

    const group = screen.getByRole('group', { name: 'Filter projects by type' })
    expect(group).toBeInTheDocument()
    expect(screen.getAllByRole('button')).toHaveLength(3)
    expect(screen.getByRole('button', { name: 'Web 2' })).toBeInTheDocument()
  })

  it('marks only the active chip with aria-pressed', () => {
    render(<FilterChips options={options} value="web" onChange={() => {}} />)

    expect(screen.getByRole('button', { name: 'Web 2' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByRole('button', { name: 'All 3' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
  })

  it('calls onChange with the id, also for a chip with a count of 0', async () => {
    const onChange = vi.fn()
    render(<FilterChips options={options} value="all" onChange={onChange} />)

    await userEvent.click(screen.getByRole('button', { name: 'Empty 0' }))
    expect(onChange).toHaveBeenCalledWith('empty')
  })

  it('works with the keyboard', async () => {
    const user = userEvent.setup()
    render(<Harness />)

    await user.tab()
    expect(screen.getByRole('button', { name: 'All 3' })).toHaveFocus()

    await user.tab()
    await user.keyboard('{Enter}')
    expect(screen.getByRole('button', { name: 'Web 2' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )

    await user.tab()
    await user.keyboard(' ')
    expect(screen.getByRole('button', { name: 'Empty 0' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByRole('button', { name: 'Web 2' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
  })
})
