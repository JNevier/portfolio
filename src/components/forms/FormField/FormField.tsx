import type { ChangeEvent } from 'react'
import './FormField.css'

type FormFieldProps = {
  /** Used for the input's id and name, e.g. "email". */
  name: string
  label: string
  value: string
  onChange: (name: string, value: string) => void
  /** Shown under the field and announced to screen readers when set. */
  error?: string
  type?: 'text' | 'email'
  autoComplete?: string
  /** Renders a <textarea> instead of an <input>. */
  multiline?: boolean
}

/*
  One labelled form field with its error message.
  The label sits above the field, and the error is linked to the field with
  aria-describedby so screen readers read it together with the label.
*/
export default function FormField({
  name,
  label,
  value,
  onChange,
  error,
  type = 'text',
  autoComplete,
  multiline = false,
}: FormFieldProps) {
  const id = `contact-${name}`
  const errorId = `${id}-error`

  // Shared by <input> and <textarea>.
  const controlProps = {
    id,
    name,
    value,
    required: true,
    autoComplete,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
    className: 'form-field__control',
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(name, event.target.value),
  }

  return (
    <div className="form-field">
      <label htmlFor={id} className="form-field__label">
        {label}
      </label>

      {multiline ? (
        <textarea rows={5} {...controlProps} />
      ) : (
        <input type={type} {...controlProps} />
      )}

      {error && (
        <p id={errorId} className="form-field__error">
          {error}
        </p>
      )}
    </div>
  )
}
