import React from 'react'
import { Link } from 'react-router'
import { Logo } from "../index"


function Footer() {
  return (
    <footer
      className="
        w-full
        bg-[#e5e7eb]
        border-t border-gray-300

        dark:bg-[#07111F]
        dark:border-white/10

        transition-colors duration-300
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">

          {/* Brand Section */}
          <div className="text-center md:text-left">

            <Link to="/">
              <Logo className="h-12 w-auto" />
            </Link>

          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-6">

            <Link
              to="/"
              className="
                text-sm text-gray-600
                hover:text-gray-900

                dark:text-gray-400
                dark:hover:text-cyan-400

                transition-colors duration-200
              "
            >
              About
            </Link>

            <Link
              to="/"
              className="
                text-sm text-gray-600
                hover:text-gray-900

                dark:text-gray-400
                dark:hover:text-cyan-400

                transition-colors duration-200
              "
            >
              Services
            </Link>

            <Link
              to="/"
              className="
                text-sm text-gray-600
                hover:text-gray-900

                dark:text-gray-400
                dark:hover:text-cyan-400

                transition-colors duration-200
              "
            >
              Contact
            </Link>

            <Link
              to="/"
              className="
                text-sm text-gray-600
                hover:text-gray-900

                dark:text-gray-400
                dark:hover:text-cyan-400

                transition-colors duration-200
              "
            >
              Privacy
            </Link>

            <Link
              to="/"
              className="
                text-sm text-gray-600
                hover:text-gray-900

                dark:text-gray-400
                dark:hover:text-cyan-400

                transition-colors duration-200
              "
            >
              Terms
            </Link>

          </nav>

        </div>

        {/* Bottom Copyright */}
        <div className="
             pt-5 mt-5
            border-t border-gray-300
            dark:border-white/10
          "
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2026 BlogSpace. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer