import type { ContactValues } from './validateContact'

/*
  Turns the form values into a mailto: link that opens the visitor's own email
  app with everything filled in. encodeURIComponent escapes characters such as
  spaces, &, ? and line breaks so they cannot break the link.
*/
export function buildMailto(to: string, { name, email, message }: ContactValues) {
  const subject = `Portfolio message from ${name.trim()}`
  const body = `${message.trim()}\n\nFrom: ${name.trim()} <${email.trim()}>`

  return (
    `mailto:${to}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`
  )
}
