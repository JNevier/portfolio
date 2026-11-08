import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Disclosure from './Disclosure'

function renderDisclosure() {
  return render(
    <Disclosure label="Show more" className="mt-4">
      <p>Hidden content</p>
    </Disclosure>,
  )
}

describe('Disclosure', () => {
  it('renders a native details element, collapsed by default', () => {
    renderDisclosure()

    const summary = screen.getByText('Show more')
    expect(summary.tagName).toBe('SUMMARY')
    const details = summary.closest('details') as HTMLDetailsElement
    expect(details.open).toBe(false)
    expect(details).toHaveClass('disclosure', 'mt-4')
  })

  it('opens and closes when the summary is clicked', async () => {
    const user = userEvent.setup()
    renderDisclosure()

    const summary = screen.getByText('Show more')
    const details = summary.closest('details') as HTMLDetailsElement

    await user.click(summary)
    expect(details.open).toBe(true)
    expect(screen.getByText('Hidden content')).toBeVisible()

    await user.click(summary)
    expect(details.open).toBe(false)
  })

  // jsdom does not open <summary> on Enter (real browsers do), so this only
  // checks that the summary is reachable with the Tab key.
  it('can be reached with the keyboard', async () => {
    const user = userEvent.setup()
    renderDisclosure()

    await user.tab()
    expect(screen.getByText('Show more')).toHaveFocus()
  })
})
