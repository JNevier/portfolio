/*
  Pure validation for the contact form: same input, same output, no side effects.
  That makes it easy to unit test without rendering anything.
*/

export type ContactValues = {
  name: string
  email: string
  message: string
}

/** Only the fields that have a problem get a message. */
export type ContactErrors = Partial<Record<keyof ContactValues, string>>

export const MESSAGE_MIN_LENGTH = 10

// Something@something.something, with no spaces. Simple on purpose: the real
// check is whether the visitor's email app can send to it.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContact({ name, email, message }: ContactValues) {
  const errors: ContactErrors = {}

  if (name.trim() === '') {
    errors.name = 'Please enter your name.'
  }

  if (email.trim() === '') {
    errors.email = 'Please enter your email address.'
  } else if (!EMAIL_PATTERN.test(email.trim())) {
    errors.email = 'Please enter a valid email address, like name@example.com.'
  }

  if (message.trim().length < MESSAGE_MIN_LENGTH) {
    errors.message = `Please write at least ${MESSAGE_MIN_LENGTH} characters.`
  }

  return errors
}

export function hasErrors(errors: ContactErrors) {
  return Object.keys(errors).length > 0
}
