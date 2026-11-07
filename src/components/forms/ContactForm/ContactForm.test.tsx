import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { buildMailto } from '../../../lib/buildMailto'
import ContactForm from './ContactForm'

const TO = 'me@example.com'

function renderForm() {
  const openMailto = vi.fn()
  render(<ContactForm to={TO} openMailto={openMailto} />)
  return { openMailto, user: userEvent.setup() }
}

describe('ContactForm', () => {
  it('shows labelled fields', () => {
    renderForm()

    expect(screen.getByLabelText('Name')).toHaveAttribute('autocomplete', 'name')
    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email')
    expect(screen.getByLabelText('Message')).toBeRequired()
  })

  it('shows every error and focuses the first invalid field on an empty submit', async () => {
    const { openMailto, user } = renderForm()

    await user.click(screen.getByRole('button', { name: 'Send message' }))

    const name = screen.getByLabelText('Name')
    expect(name).toHaveFocus()
    expect(name).toHaveAttribute('aria-invalid', 'true')
    expect(name).toHaveAccessibleDescription('Please enter your name.')
    expect(screen.getByLabelText('Email')).toHaveAccessibleDescription(
      'Please enter your email address.',
    )
    expect(screen.getByLabelText('Message')).toHaveAttribute('aria-invalid', 'true')
    expect(openMailto).not.toHaveBeenCalled()
  })

  it('flags an invalid email and focuses it', async () => {
    const { openMailto, user } = renderForm()

    await user.type(screen.getByLabelText('Name'), 'Ana Cruz')
    await user.type(screen.getByLabelText('Email'), 'ana@example')
    await user.type(screen.getByLabelText('Message'), 'Hello, I would like to talk.')
    await user.click(screen.getByRole('button', { name: 'Send message' }))

    const email = screen.getByLabelText('Email')
    expect(email).toHaveFocus()
    expect(email).toHaveAccessibleDescription(
      'Please enter a valid email address, like name@example.com.',
    )
    expect(screen.getByLabelText('Name')).not.toHaveAttribute('aria-invalid', 'true')
    expect(openMailto).not.toHaveBeenCalled()
  })

  it('opens the right mailto link and confirms when the input is valid', async () => {
    const { openMailto, user } = renderForm()
    const values = {
      name: 'Ana Cruz',
      email: 'ana@example.com',
      message: 'Hello, I would like to talk.',
    }

    await user.type(screen.getByLabelText('Name'), values.name)
    await user.type(screen.getByLabelText('Email'), values.email)
    await user.type(screen.getByLabelText('Message'), values.message)
    await user.click(screen.getByRole('button', { name: 'Send message' }))

    expect(openMailto).toHaveBeenCalledWith(buildMailto(TO, values))
    expect(screen.getByRole('status')).toHaveTextContent(/your email app should open/i)
  })
})
