import { site } from '../../../data/site'

const currentYear = new Date().getFullYear()

/* Page footer: copyright line plus a link back to the top. */
export default function Footer() {
  return (
    <footer className="border-line border-t">
      <div className="text-muted mx-auto flex max-w-5xl flex-col gap-2 px-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {currentYear} {site.name}. All rights reserved.
        </p>
        <a href="#top" className="hover:text-brand-700 font-medium">
          Back to top ↑
        </a>
      </div>
    </footer>
  )
}
