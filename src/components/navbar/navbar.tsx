import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Outlet } from "react-router-dom"
import { NavLink } from "react-router-dom"
import { LuUserCircle2 } from "react-icons/lu"

const Navbar = () => {
  const navigate = useNavigate()
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false)

  const toggleMobileNav = () => {
    setIsMobileNavVisible(!isMobileNavVisible)
  }

  const logOut = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <>
      <nav className="flex justify-between items-center bg-[#f28d00] py-2 px-4">
        <div className="text-xl text-white ">Inicio</div>
        <div className="hidden sm:block">
          <ul className="flex gap-8 text-xl text-white">
            <NavLink to="/offers">Ofertas pendientes</NavLink>
            <li>
              <NavLink to="/homePage">Trades</NavLink>
            </li>
          </ul>
        </div>
        <div className=" flex gap-10">
          <button
            className="bg-white hidden sm:block px-4 py-2 rounded-lg"
            onClick={logOut}
          >
            Cerrar sesión
          </button>
          <NavLink to="/profile">
            <LuUserCircle2 className="text-white w-10 h-10" />
          </NavLink>
        </div>

        <button
          type="button"
          className="relative sm:hidden inline-flex items-center justify-center rounded-md p-2 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          onClick={toggleMobileNav}
          aria-controls="mobile-menu"
          aria-expanded={isMobileNavVisible}
        >
          <svg
            className="block h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>

          <svg
            className="hidden h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </nav>
      {isMobileNavVisible && (
        <nav className="bg-[#FF416C]">
          <div className="sm:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <NavLink
                className="text-white block rounded-md px-3 py-2 text-base font-medium"
                to="/offers"
              >
                Ofertas pendientes
              </NavLink>

              <NavLink
                className="text-white block rounded-md px-3 py-2 text-base font-medium"
                to="/homePage"
              >
                Trades
              </NavLink>
              <button
                className="text-white block rounded-md px-3 py-2 text-base font-medium"
                onClick={logOut}
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </nav>
      )}
      <Outlet />
    </>
  )
}

export default Navbar
