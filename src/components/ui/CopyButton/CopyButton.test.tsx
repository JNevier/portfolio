import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import CopyButton from './CopyButton'

function renderButton() {
  return render(
    <CopyButton
      text="name@example.com"
      label="Copy email"
      failedMessage="Copy failed, select the address above"
    />,
  )
}

describe('CopyButton', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('copies the text and announces "Copied"', async () => {
    const user = userEvent.setup()
    // user-event installs a fake clipboard; spy on it to check the call.
    const writeText = vi.spyOn(navigator.clipboard, 'writeText')
    renderButton()

    await user.click(screen.getByRole('button', { name: 'Copy email' }))

    expect(writeText).toHaveBeenCalledWith('name@example.com')
    expect(await screen.findByText('Copied')).toHaveAttribute('aria-live', 'polite')
  })

  it('announces a fallback message when copying fails', async () => {
    const user = userEvent.setup()
    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(
      new Error('Permission denied'),
    )
    renderButton()

    await user.click(screen.getByRole('button', { name: 'Copy email' }))

    expect(
      await screen.findByText('Copy failed, select the address above'),
    ).toBeInTheDocument()
  })
})
