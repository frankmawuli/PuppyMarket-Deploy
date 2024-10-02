import { useState } from 'react';
import { FaBars } from 'react-icons/fa'; // You'll need react-icons for this
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        className="fixed top-4 left-4 z-50 block lg:hidden"
        onClick={toggleSidebar}
      >
        <FaBars className="text-2xl text-gray-800" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white border-r shadow-lg transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:static lg:block lg:w-[20%]`}
      >
        <div className="px-6 py-8">
          {/* Logo */}
          <Link to="/">
            <div className="grid h-12 w-36 place-content-center rounded-lg bg-gray-200 text-lg font-semibold text-gray-800 shadow-md">
              Logo
            </div>
          </Link>

          {/* Menu Items */}
          <ul className="mt-10 space-y-2">
            <li>
              <Link
                to="viewListings"  // Changed href to to
                className="block rounded-lg bg-gray-100 px-4 py-3 text-sm font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-600 shadow-sm"
              >
                General
              </Link>
            </li>

            <li>
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary
                  className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 shadow-sm"
                >
                  <span>Listings</span>
                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </summary>

                <ul className="mt-2 space-y-1 px-4">
                  <li>
                    <Link
                      to="viewlistings"  // Changed href to to
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    >
                      My Listings
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="addlistings"  // Changed href to to
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    >
                      Add a Listing
                    </Link>
                  </li>
                </ul>
              </details>
            </li>

            <li>
              <Link
                to="/billing"  // Changed href to to
                className="block rounded-lg px-4 py-3 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 shadow-sm"
              >
                Billing
              </Link>
            </li>

            <li>
              <Link
                to="/support"  // Changed href to to
                className="block rounded-lg px-4 py-3 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 shadow-sm"
              >
                Customer Support
              </Link>
            </li>

            <li>
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary
                  className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 shadow-sm"
                >
                  <span>Account</span>
                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </summary>

                <ul className="mt-2 space-y-1 px-4">
                  <li>
                    <Link
                      to="/account/details"  // Changed href to to
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    >
                      Details
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/account/security"  // Changed href to to
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    >
                      Security
                    </Link>
                  </li>
                  <li>
                    <form action="#">
                      <button
                        type="submit"
                        className="w-full rounded-lg px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700"
                      >
                        Logout
                      </button>
                    </form>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>

        {/* User Section */}
        <div className="sticky inset-x-0 bottom-0 border-t border-gray-200 bg-gray-50">
          <a
            href="#"
            className="flex items-center gap-3 p-4 hover:bg-gray-100 transition duration-200"
          >
            <img
              alt="User Avatar"
              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="leading-tight">
              <p className="text-sm font-semibold text-gray-700">Eric Frusciante</p>
              <p className="text-xs text-gray-500">eric@frusciante.com</p>
            </div>
          </a>
        </div>
      </div>

      {/* Background Overlay (for mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}
