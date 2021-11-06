import { useEffect, useRef } from 'react'
import Link from 'next/link'
import BLOG from '@/blog.config'
import { useLocale } from '@/lib/locale'

const NavBar = () => {
  const locale = useLocale()
  const links = [
    { id: 0, name: locale.NAV.INDEX, to: BLOG.path || '/', show: true },
    { id: 1, name: locale.NAV.ABOUT, to: '/about', show: BLOG.showAbout },
    { id: 3, name: locale.NAV.SEARCH, to: '/search', show: true }
  ]
  return (
    <div className="flex-shrink-0">
      <ul className="flex flex-row">
        {links.map(
          link =>
            link.show && (
              <li
                key={link.id}
                className="block ml-4 text-black dark:text-gray-50 nav"
              >
                <Link href={link.to}>
                  <a>{link.name}</a>
                </Link>
              </li>
            )
        )}
      </ul>
    </div>
  )
}

const Header = ({ navBarTitle, fullWidth }) => {
  const useSticky = !BLOG.autoCollapsedNavBar
  const navRef = useRef(null)
  const sentinalRef = useRef([])
  const handler = ([entry]) => {
    if (navRef && navRef.current && useSticky) {
      if (!entry.isIntersecting && entry !== undefined) {
        navRef.current?.classList.add('sticky-nav-full')
      } else {
        navRef.current?.classList.remove('sticky-nav-full')
      }
    } else {
      navRef.current?.classList.add('remove-sticky')
    }
  }
  useEffect(() => {
    const obvserver = new window.IntersectionObserver(handler)
    obvserver.observe(sentinalRef.current)
    // Don't touch this, I have no idea how it works XD
    // return () => {
    //   if (sentinalRef.current) obvserver.unobserve(sentinalRef.current)
    // }
    /* eslint-disable-line */
  }, [sentinalRef])
  return (
    <>
      <div className="observer-element h-4 md:h-12" ref={sentinalRef}></div>
      <div
        className={`sticky-nav m-auto w-full h-6 flex flex-row justify-between items-center mb-2 md:mb-12 py-8 bg-opacity-60 ${
          !fullWidth ? 'max-w-3xl px-4' : 'px-4 md:px-24'
        }`}
        id="sticky-nav"
        ref={navRef}
      >
        <div className="flex items-center">
          <Link href="/">
            <a aria-label={BLOG.title}>
              <div className="h-6">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 63 63" style={{ width: '32px', height: '32px', lineHeight: 1.7 }} data-v-ed8d88ae="" data-v-36e921ea=""><g data-v-ed8d88ae=""><rect fill="none" id="canvas_background" height="65" width="65" y="-1" x="-1" data-v-ed8d88ae=""></rect></g> <g data-v-ed8d88ae=""><g fillRule="evenodd" fill="none" id="Page-1" data-v-ed8d88ae=""><g transform="rotate(45 38.00001907348632,25.496921539306644) " id="Group-2-Copy-9" data-v-ed8d88ae=""><g id="Group" data-v-ed8d88ae=""><polygon points="37.83335494995117,-9.710221618413925 12.500019073486328,37.89171090722084 28.837055206298828,48.0826441347599 27.833351135253906,39.03164926171303 " fill="#40BFC1" id="Path-6" data-v-ed8d88ae=""></polygon> <polygon points="37.83335494995117,-9.710221618413925 27.833351135253906,39.03164926171303 30.165855407714844,60.70406594872475 37.728641510009766,58.78307595849037 " fill="#4ADDDF" id="Path-7" data-v-ed8d88ae=""></polygon> <polygon points="12.500019073486328,37.89171090722084 28.837055206298828,48.0826441347599 29.166683197021484,50.83566537499428 25.359378814697266,50.83566537499428 16.375812530517578,57.38264337182045 " fill="#4ADDDF" id="Path-8" data-v-ed8d88ae=""></polygon></g> <g transform="translate(38,36.5732421875) scale(-1,1) translate(-38,-36.5732421875) translate(25,0.5732420086860657) " id="Group-Copy" data-v-ed8d88ae=""><polygon points="13.499979019165039,-10.283463805913925 -12.500019073486328,37.318464905023575 4.10639762878418,47.50939813256264 3.093515396118164,38.50651803612709 " fill="#27A3A4" id="Path-6" data-v-ed8d88ae=""></polygon> <polygon points="13.499979019165039,-10.283463805913925 2.833311080932617,38.45840707421303 5.321317672729492,60.13082376122475 13.271356582641602,58.20983377099037 " fill="#40BFC1" id="Path-7" data-v-ed8d88ae=""></polygon> <polygon points="-12.500019073486328,37.318464905023575 4.260072708129883,47.60338082909584 4.499979019165039,50.14410272240639 0.6926727294921875,50.14410272240639 -8.290889739990234,56.69106927514076 " fill="#259596" id="Path-8" data-v-ed8d88ae=""></polygon></g></g></g></g></svg>
              </div>
            </a>
          </Link>
          {navBarTitle
            ? (
            <p className="ml-2 font-medium text-day dark:text-night header-name">
              {navBarTitle}
            </p>
              )
            : (
            <p className="ml-2 font-medium text-day dark:text-night header-name">
              {BLOG.title},{' '}
              <span className="font-normal">{BLOG.description}</span>
            </p>
              )}
        </div>
        <NavBar />
      </div>
    </>
  )
}

export default Header
