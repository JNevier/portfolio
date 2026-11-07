import { describe, expect, it } from 'vitest'
import { MESSAGE_MIN_LENGTH, hasErrors, validateContact } from './validateContact'

const valid = {
  name: 'Ana Cruz',
  email: 'ana@example.com',
  message: 'Hello, I would like to talk about an internship.',
}

describe('validateContact', () => {
  it('returns no errors for valid values', () => {
    expect(validateContact(valid)).toEqual({})
    expect(hasErrors(validateContact(valid))).toBe(false)
  })

  it('requires a name (spaces only does not count)', () => {
    expect(validateContact({ ...valid, name: '   ' }).name).toBe(
      'Please enter your name.',
    )
  })

  it('requires an email address', () => {
    expect(validateContact({ ...valid, email: '' }).email).toBe(
      'Please enter your email address.',
    )
  })

  it.each(['ana', 'ana@', 'ana@example', 'ana example@site.com'])(
    'rejects the badly formatted email "%s"',
    (email) => {
      expect(validateContact({ ...valid, email }).email).toBe(
        'Please enter a valid email address, like name@example.com.',
      )
    },
  )

  it('requires a message of the minimum length', () => {
    const short = 'a'.repeat(MESSAGE_MIN_LENGTH - 1)
    expect(validateContact({ ...valid, message: short }).message).toBe(
      `Please write at least ${MESSAGE_MIN_LENGTH} characters.`,
    )
    expect(hasErrors(validateContact({ ...valid, message: short }))).toBe(true)
  })
})
