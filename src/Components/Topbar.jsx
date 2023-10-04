import React, { useState, useEffect } from 'react'

const Topbar = () => {
  //------------------------------------------
  //--------------- VARIABLES ----------------
  //------------------------------------------
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  //------------------------------------------
  //----------------- HOOKS ------------------
  //------------------------------------------

  //------------------------------------------
  //--------------- FUNCTIONS ----------------
  //------------------------------------------

  //------------------------------------------
  //--------------- COMPONENT ----------------
  //------------------------------------------
  return (
    <div>
      <div className="bg-white dark:bg-bars pl-16  top-bar top-0 left-0 fixed w-full h-16">
        <nav
          className="flex-no-wrap relative flex w-full items-center justify-between bg-[#FBFBFB] py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4">
          <div className="flex w-full flex-wrap items-center justify-between px-3">
            {/* <!-- Hamburger button for mobile view --> */}
            <button
              className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
              type="button"
              data-te-collapse-init
              data-te-target="#navbarSupportedContent1"
              aria-controls="navbarSupportedContent1"
              aria-expanded="false"
              aria-label="Toggle navigation">
              {/* <!-- Hamburger icon --> */}
              <span className="[&>svg]:w-7">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-7 w-7">
                  <path
                    fillRule="evenodd"
                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                    clipRule="evenodd" />
                </svg>
              </span>
            </button>

            {/* <!-- Collapsible navigation container --> */}
            <div
              className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
              id="navbarSupportedContent1"
              data-te-collapse-item>

              {/* <!-- Left navigation links --> */}
              <ul
                className="list--none mr-auto flex flex-col pl-0 lg:flex-row"
                data-te-navbar-nav-ref>
                <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                  {/* <!-- Dashboard link --> */}
                  <a
                    className="text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400"
                    href="#"
                    data-te-nav-link-ref>Dashboard</a>
                </li>
                {/* <!-- Team link --> */}
                <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                  <a
                    className="text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                    href="#"
                    data-te-nav-link-ref>Team</a>
                </li>
                {/* <!-- Projects link --> */}
                <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                  <a
                    className="text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                    href="#"
                    data-te-nav-link-ref>Projects</a>
                </li>
              </ul>
            </div>

            {/* <!-- Right elements --> */}
            <div className="relative flex items-center">
              {/* <!-- Moon Icon --> */}
              <button className='mr-4 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:scale-105 transition-all'>
                <label className="swap swap-rotate scale-75" >
                  <input type="checkbox"></input>
                  <svg onClick={() => setDarkMode(!darkMode)} className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
                  <svg onClick={() => setDarkMode(!darkMode)} className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
                </label>
              </button>

              {/* <!-- Container with two dropdown menus --> */}
              <div
                className="relative"
                data-te-dropdown-ref
                data-te-dropdown-alignment="end">
                {/* <!-- First dropdown trigger --> */}
                <a
                  className="hidden-arrow mr-4 flex items-center text-neutral-600 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                  href="#"
                  id="dropdownMenuButton1"
                  role="button"
                  data-te-dropdown-toggle-ref
                  aria-expanded="false">
                  {/* <!-- Dropdown trigger icon --> */}
                  <span className="[&>svg]:w-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5">
                      <path
                        fillRule="evenodd"
                        d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                        clipRule="evenodd" />
                    </svg>
                  </span>
                  {/* <!-- Notification counter --> */}
                  <span
                    className="absolute -mt-4 ml-2.5 rounded-full bg-danger px-[0.35em] py-[0.15em] text-[0.6rem] font-bold leading-none text-white">111</span>
                </a>
                {/* <!-- First dropdown menu --> */}
                <ul
                  className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                  aria-labelledby="dropdownMenuButton1"
                  data-te-dropdown-menu-ref>
                  {/* <!-- First dropdown menu items --> */}
                  <li>
                    <a
                      className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                      href="#"
                      data-te-dropdown-item-ref>Action</a>
                  </li>
                  <li>
                    <a
                      className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                      href="#"
                      data-te-dropdown-item-ref>Another action</a>
                  </li>
                  <li>
                    <a
                      className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                      href="#"
                      data-te-dropdown-item-ref>Something else here</a>
                  </li>
                </ul>
              </div>

              {/* <!-- Second dropdown container --> */}
              <div
                className="relative"
                data-te-dropdown-ref
                data-te-dropdown-alignment="end">
                {/* <!-- Second dropdown trigger --> */}
                <a
                  className="hidden-arrow flex items-center h-6 w-6 whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
                  href="#"
                  id="dropdownMenuButton2"
                  role="button"
                  data-te-dropdown-toggle-ref
                  aria-expanded="false">
                  {/* <!-- User avatar --> */}
                  <img
                    src="https://tecdn.b-cdn.net/img/new/avatars/2.jpg"
                    className="rounded-full"
                    // style="height: 25px; width: 25px"
                    alt=""
                    loading="lazy"></img>
                </a>
                {/* <!-- Second dropdown menu --> */}
                <ul
                  className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                  aria-labelledby="dropdownMenuButton2"
                  data-te-dropdown-menu-ref>
                  {/* <!-- Second dropdown menu items --> */}
                  <li>
                    <a
                      className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                      href="#"
                      data-te-dropdown-item-ref>Action</a>
                  </li>
                  <li>
                    <a
                      className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                      href="#"
                      data-te-dropdown-item-ref>Another action</a>
                  </li>
                  <li>
                    <a
                      className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                      href="#"
                      data-te-dropdown-item-ref>Something else here</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>

    </div>
  )
}

export default Topbar
