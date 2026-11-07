import { describe, expect, it } from 'vitest'
import { buildMailto } from './buildMailto'

describe('buildMailto', () => {
  it('builds a mailto link with an encoded subject and body', () => {
    const url = buildMailto('me@example.com', {
      name: 'Ana Cruz',
      email: 'ana@example.com',
      message: 'Hi & hello?\nSecond line',
    })

    expect(url).toBe(
      'mailto:me@example.com' +
        '?subject=' +
        encodeURIComponent('Portfolio message from Ana Cruz') +
        '&body=' +
        encodeURIComponent(
          'Hi & hello?\nSecond line\n\nFrom: Ana Cruz <ana@example.com>',
        ),
    )
  })

  it('never leaves characters like & or ? unencoded in the body', () => {
    const url = buildMailto('me@example.com', {
      name: 'A',
      email: 'a@b.co',
      message: 'one&two?three=four',
    })
    const body = url.split('&body=')[1]

    expect(body).not.toMatch(/[&?=]/)
  })
})
