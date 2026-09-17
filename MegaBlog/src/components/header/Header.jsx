import React, { useState, useEffect } from 'react'
import { Container, Logo, Logoutbtn } from '../index'
import { Link, useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../../store/themeSlice'

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const mode = useSelector((state) => state.theme.mode);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  const handleNavigation = (slug) => {
    navigate(slug);
    setMenuOpen(false);
  };


  return (
    <header className="py-3 bg-[#e5e7eb] dark:bg-[#07111F] transition-colors duration-300">
      <Container>
        <nav className="
              relative
              flex items-center rounded-2xl border px-6 py-3
              border-gray-200 bg-[#f8fafc] shadow-md
              dark:border-white/10
              dark:bg-[#0f172a]
              dark:shadow-[0_0_30px_rgba(34,211,238,0.08)]
              transition-all duration-300
          ">
          <div className='shrink-0'>
            <Link to="/">
              <Logo className="h-12 w-auto" />
            </Link>
          </div>
          <ul className='hidden md:flex items-center ml-auto gap-2'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="
                              inline-block rounded-full px-5 py-2
                              text-gray-700
                              hover:bg-gray-200
                              hover:text-gray-950
                              dark:text-gray-300
                              dark:hover:bg-cyan-400/10
                              dark:hover:text-cyan-400
                              transition-all duration-200
                    "
                  >{item.name}</button>
                </li>
              ) : null
            )}
            <li>
              <button
                type="button"
                onClick={() => dispatch(toggleTheme())}
                className="
                              ml-2 flex h-10 w-10 items-center justify-center
                              rounded-full border
                              border-gray-200 bg-white text-gray-700
                              hover:bg-gray-100 hover:shadow-sm

                              dark:border-cyan-400/20
                              dark:bg-[#0b1f35]
                              dark:text-cyan-300
                              dark:hover:border-cyan-400/40
                              dark:hover:bg-cyan-400/10
                              dark:hover:shadow-[0_0_15px_rgba(34,211,238,0.15)]

                              transition-all duration-200
                            ">
                {mode === "light" ? "☀" : "🌙"}
              </button>
            </li>
            {authStatus && (
              <li>
                <Logoutbtn />
              </li>

            )}
          </ul>


          {/* mobile hamburger menu */}
          <div className="flex md:hidden items-center ml-auto gap-2">

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={() => dispatch(toggleTheme())}
              className="
                flex h-10 w-10 items-center justify-center
                rounded-full border
                border-gray-200 bg-white text-gray-700
                hover:bg-gray-100 hover:shadow-sm

                dark:border-cyan-400/20
                dark:bg-[#0b1f35]
                dark:text-cyan-300
                dark:hover:border-cyan-400/40
                dark:hover:bg-cyan-400/10
                dark:hover:shadow-[0_0_15px_rgba(34,211,238,0.15)]

                transition-all duration-200
              "
            >
              {mode === "light" ? "☀" : "🌙"}
            </button>

            {/* Hamburger Button */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="
                flex h-10 w-10 items-center justify-center
                rounded-full border
                border-gray-200 bg-white text-gray-700

                dark:border-white/10
                dark:bg-[#0b1f35]
                dark:text-gray-200

                transition-all duration-200
              "
            >
              {menuOpen ? "✕" : "☰"}
            </button>
            {/* mobile hamburger menu ends here */}
          </div>
          {/* Drop Down Menu */}

          {menuOpen && (
            <div
              className="
                            md:hidden
                            absolute left-0 right-0 top-full mt-2 z-50
                            rounded-2xl border p-3 shadow-lg
                            border-gray-200 bg-white
                            dark:border-white/10
                            dark:bg-[#0f172a]
                            ">
              <ul className="flex flex-col gap-1">

                {navItems.map((item) =>
                  item.active ? (
                    <li key={item.name}>
                      <button
                        onClick={() => handleNavigation(item.slug)}
                        className="
                w-full rounded-xl px-4 py-3 text-left
                text-gray-700 hover:bg-gray-100

                dark:text-gray-300
                dark:hover:bg-cyan-400/10
                dark:hover:text-cyan-400

                transition-all duration-200
              "
                      >
                        {item.name}
                      </button>
                    </li>
                  ) : null
                )}

                {authStatus && (
                  <li className="px-2 pt-2">
                    <Logoutbtn onLogout={() => setMenuOpen(false)} />
                  </li>
                )}

              </ul>
            </div>
          )}
          {/* Drop Down Menu Ends Here */}

        </nav>
      </Container>
    </header>
  )
}

export default Header