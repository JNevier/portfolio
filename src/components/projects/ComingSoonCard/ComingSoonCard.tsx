type ComingSoonCardProps = {
  title: string
  text: string
}

/*
  A dashed placeholder box for the project grid ("More projects on the way").
  It is a plain <div>, not a link or button, so it has no hover effect.
  The title is a <p>, not a heading, to keep the page's heading outline clean.
  Utilities only: no own CSS file is needed.
*/
export default function ComingSoonCard({ title, text }: ComingSoonCardProps) {
  return (
    <div className="border-line text-muted flex min-h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 text-center">
      {/* Decorative circle with a plus sign. */}
      <span
        aria-hidden="true"
        className="border-line flex h-10 w-10 items-center justify-center rounded-full border-2 text-xl leading-none"
      >
        +
      </span>
      <p className="mt-4 font-semibold">{title}</p>
      <p className="mt-1 text-sm">{text}</p>
    </div>
  )
}
