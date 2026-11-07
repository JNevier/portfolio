import { Outlet } from 'react-router-dom'
import Footer from '../Footer'
import Navbar from '../Navbar'
import ScrollManager from '../ScrollManager'

/*
  The frame shared by every page: skip link, navbar, the page itself, footer.
  <Outlet /> is where React Router puts the page that matches the URL.
*/
export default function Layout() {
  return (
    // id="top" is the target of the footer's "Back to top" link.
    <div id="top">
      <ScrollManager />

      <a
        href="#main"
        className="bg-brand-700 text-on-brand sr-only rounded-md px-4 py-2 font-medium focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
