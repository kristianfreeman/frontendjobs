import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import { Helmet } from 'react-helmet'

import CTA from './cta'
import Footer from './footer'
import Header from './header'
import './all.scss'
import GlobalStyle from '../shared/css/globalStyles'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet>
          <script
            defer
            crossorigin
            src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"
          />
          <link
            async
            href="https://cdn.jsdelivr.net/npm/tailwindcss@0.7.4/dist/tailwind.min.css"
            rel="stylesheet"
          />
        </Helmet>
        <GlobalStyle />
        <div className="brand-border">
          <Header siteTitle={data.site.siteMetadata.title} />
        </div>
        <div style={{ marginLeft: '5px', marginRight: '5px' }}>{children}</div>
        <CTA />
        <Footer />
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
