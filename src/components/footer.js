import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import logoWhite from '../images/logo_white.png'
import { extractNodes } from '../utils/graphql'

const query = graphql`
  {
    allSanityCategory {
      edges {
        node {
          name
          tags {
            name
            slug
          }
        }
      }
    }
  }
`

const selectedTag = () => {
  if (typeof window === 'undefined') {
    return null
  }

  const isTagPage = window.location.pathname.includes('/t/')
  if (isTagPage) {
    return window.location.pathname.replace('/t/', '').replace('/', '')
  }
}

class Footer extends React.Component {
  state = { crispToggled: false }

  componentDidMount = () => this.toggleCrisp()

  toggleCrisp() {
    if (this.state.crispToggled) {
      return false
    }

    window.$crisp = []
    window.CRISP_WEBSITE_ID = 'e3c43a66-a676-4751-b915-7d3e780b5c3a'
    var d = document
    var s = d.createElement('script')

    s.src = 'https://client.crisp.chat/l.js'
    s.async = 1
    d.getElementsByTagName('head')[0].appendChild(s)

    this.setState({ crispToggled: true })
  }

  render = () => {
    const { tagGroups } = this.props

    return (
      <footer
        className="footer bg-black text-white px-4 pb-8"
        style={{ marginTop: '40px' }}
      >
        <div className="w-100">
          <p className="mt-8 mb-4 flex items-center">
            <a
              className="text-white flex items-center px-4 no-underline"
              href="/"
            >
              <img
                alt="Frontend Jobs"
                src={logoWhite}
                className="mr-2 w-16 h-16"
              />
              Frontend Jobs
            </a>
            <a
              className="text-white hover:text-blue mx-2"
              href="https://twitter.com/getfrontendjobs"
            >
              <i className="fab fa-lg fa-twitter" />
            </a>
            <a
              className="text-white hover:text-green fa-lg mx-2"
              href="https://xyz.us16.list-manage.com/subscribe/post?u=0b8a0e873d096aad47c111571&id=1b07ed5d5b"
            >
              <i className="fas fa-envelope" />
            </a>
          </p>

          <div
            className="is-divider"
            style={{ background: 'hsl(10, 0%, 90%)', height: '3px' }}
          />

          <div className="container" style={{ paddingTop: '20px' }}>
            <div>
              frontendjobs.tech is brought to you by{' '}
              <a className="text-white" href="https://www.byteconf.com">
                Byteconf
              </a>
              , a{' '}
              <a className="text-white" href="https://www.bytesized.xyz">
                Bytesized
              </a>{' '}
              project. Company logos provided by{' '}
              <a
                className="text-white"
                ref="nofollow"
                href="https://clearbit.com"
              >
                Clearbit
              </a>
              .
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default () => (
  <StaticQuery
    query={query}
    render={({ allSanityCategory }) => <Footer tagGroups={allSanityCategory} />}
  />
)
