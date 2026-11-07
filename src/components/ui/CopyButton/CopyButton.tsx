import { useEffect, useState } from 'react'
import './CopyButton.css'

type CopyButtonProps = {
  /** The text that goes to the clipboard. */
  text: string
  /** The button's visible label. */
  label: string
  /** Shown if the browser refuses to copy. */
  failedMessage: string
}

type CopyStatus = 'idle' | 'copied' | 'failed'

/* How long the "Copied" message stays, in milliseconds. */
const MESSAGE_DURATION = 2000

/*
  Copies a piece of text, e.g. my email address, for visitors who have no
  email app set up. The result is announced in an aria-live region, so
  screen-reader users hear "Copied" without the focus moving.
*/
export default function CopyButton({ text, label, failedMessage }: CopyButtonProps) {
  const [status, setStatus] = useState<CopyStatus>('idle')

  // After a copy, clear the message again. The cleanup cancels the timer if
  // the button is clicked again or the component unmounts first.
  useEffect(() => {
    if (status === 'idle') return
    const timer = window.setTimeout(() => setStatus('idle'), MESSAGE_DURATION)
    return () => window.clearTimeout(timer)
  }, [status])

  async function handleClick() {
    try {
      // The Clipboard API can be missing (old browser, non-https page) or
      // refuse permission, so every failure lands in the catch block.
      await navigator.clipboard.writeText(text)
      setStatus('copied')
    } catch {
      setStatus('failed')
    }
  }

  return (
    <div className="copy-button">
      <button type="button" onClick={handleClick} className="copy-button__button">
        {label}
      </button>
      {/* Always in the page, so screen readers notice when its text changes. */}
      <p aria-live="polite" className="copy-button__status">
        {status === 'copied' && 'Copied'}
        {status === 'failed' && failedMessage}
      </p>
    </div>
  )
}
