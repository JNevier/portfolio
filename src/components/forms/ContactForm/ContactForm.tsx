import { useReducer, useRef } from 'react'
import type { FormEvent } from 'react'
import { buildMailto } from '../../../lib/buildMailto'
import { hasErrors, validateContact } from '../../../lib/validateContact'
import type { ContactErrors, ContactValues } from '../../../lib/validateContact'
import FormField from '../FormField'
import './ContactForm.css'

/* ---------- Form state, managed with useReducer ---------- */

type FormState = {
  values: ContactValues
  errors: ContactErrors
  status: 'editing' | 'sent' | 'failed'
}

type FormAction =
  | { type: 'change'; field: keyof ContactValues; value: string }
  | { type: 'invalid'; errors: ContactErrors }
  | { type: 'sent' }
  | { type: 'failed' }

const initialState: FormState = {
  values: { name: '', email: '', message: '' },
  errors: {},
  status: 'editing',
}

// The reducer is a pure function: it takes the current state and an action,
// and returns the next state. All the ways the form can change are listed here.
function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'change':
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
        // Clear this field's error as soon as the visitor starts fixing it.
        errors: { ...state.errors, [action.field]: undefined },
        status: 'editing',
      }
    case 'invalid':
      return { ...state, errors: action.errors, status: 'editing' }
    case 'sent':
      return { ...state, errors: {}, status: 'sent' }
    case 'failed':
      return { ...state, status: 'failed' }
  }
}

/** Field order, used to find the first field with an error. */
const FIELD_ORDER: (keyof ContactValues)[] = ['name', 'email', 'message']

/* ---------- Component ---------- */

type ContactFormProps = {
  /** The address the message goes to. */
  to: string
  /** How the mailto link is opened. Tests pass a fake function here. */
  openMailto?: (url: string) => void
}

function openInMailApp(url: string) {
  window.location.assign(url)
}

/*
  Contact form without a backend: on a valid submit it opens the visitor's
  own email app with the message filled in, using a mailto: link.
*/
export default function ContactForm({
  to,
  openMailto = openInMailApp,
}: ContactFormProps) {
  const [state, dispatch] = useReducer(formReducer, initialState)
  // A ref to the <form> element, so we can move focus to a field inside it.
  const formRef = useRef<HTMLFormElement>(null)

  function handleChange(name: string, value: string) {
    dispatch({ type: 'change', field: name as keyof ContactValues, value })
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Stop the browser from reloading the page.
    event.preventDefault()

    const errors = validateContact(state.values)

    if (hasErrors(errors)) {
      dispatch({ type: 'invalid', errors })

      // Put the keyboard focus on the first field that needs fixing.
      const firstInvalid = FIELD_ORDER.find((field) => errors[field])
      const element = firstInvalid
        ? formRef.current?.elements.namedItem(firstInvalid)
        : null
      if (element instanceof HTMLElement) element.focus()
      return
    }

    try {
      openMailto(buildMailto(to, state.values))
      dispatch({ type: 'sent' })
    } catch {
      // Opening the mail app failed. The plain email address above still works.
      dispatch({ type: 'failed' })
    }
  }

  const { values, errors, status } = state

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      // We show our own error messages instead of the browser's pop-ups.
      noValidate
      aria-label="Contact form"
      className="contact-form"
    >
      <div className="contact-form__name">
        <FormField
          name="name"
          label="Name"
          autoComplete="name"
          value={values.name}
          error={errors.name}
          onChange={handleChange}
        />
      </div>

      <div className="contact-form__email">
        <FormField
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          value={values.email}
          error={errors.email}
          onChange={handleChange}
        />
      </div>

      <div className="contact-form__message">
        <FormField
          name="message"
          label="Message"
          multiline
          autoComplete="off"
          value={values.message}
          error={errors.message}
          onChange={handleChange}
        />
      </div>

      <div className="contact-form__actions">
        <button
          type="submit"
          className="bg-brand-700 hover:bg-brand-800 text-on-brand rounded-md px-5 py-3 font-semibold"
        >
          Send message
        </button>

        {/* role="status" makes screen readers announce the confirmation. */}
        <p role="status" className="contact-form__status">
          {status === 'sent' &&
            `Your email app should open with your message ready to send. If it does not, write to ${to}.`}
          {status === 'failed' &&
            `Your email app could not be opened. Please write to ${to} directly.`}
        </p>
      </div>
    </form>
  )
}
