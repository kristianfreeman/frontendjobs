import React from 'react'

import logo from '../images/logo.png'

class Header extends React.Component {
  state = { navbarToggled: false }

  toggleNavbar = () =>
    this.setState({ navbarToggled: !this.state.navbarToggled })

  render = () => (
    <nav
      className="flex bg-white border-b border-grey-lighest items-center justify-between py-2"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="flex items-center align-middle mx-4 md:mr-8">
        <a className="hidden md:block" href="/">
          <img className="w-16 h-16" alt="Frontend Jobs" src={logo} />
        </a>
        <a className="no-underline text-black font-bold" href="/">
          Frontend Jobs
        </a>
      </div>
      <div className="w-full block flex-grow md:flex md:items-center lg:w-auto">
        <div className="text-base md:flex-grow">
          <a
            className="no-underline hover:underline text-black mr-8"
            href="https://xyz.us16.list-manage.com/subscribe/post?u=0b8a0e873d096aad47c111571&amp;id=1b07ed5d5b"
          >
            Mailing List
          </a>
          <a
            className="no-underline hover:underline text-black mr-8"
            href="mailto:support@frontendjobs.tech"
          >
            Contact
          </a>
          <a
            className="text-black hover:text-blue mx-4"
            href="https://twitter.com/getfrontendjobs"
          >
            <i className="fab fa-lg fa-twitter" />
          </a>
        </div>
        <div className="hidden md:flex">
          <a
            className="mr-4 p-4 text-white bg-blue rounded no-underline hover:text-grey-light"
            href="/post"
          >
            <i className="mr-2 fas fa-star" />
            <span>Post a job for $29</span>
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Header
