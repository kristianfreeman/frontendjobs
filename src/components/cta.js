import * as React from 'react'

import lscache from 'lscache'

class Form extends React.Component {
  state = { tempHidden: false }

  hideCookie = () => {
    const month = 60 * 24 * 30
    if (typeof window !== 'undefined') {
      lscache.set('hideEmail', true, month)
      this.setState({ tempHidden: true })
    }
  }

  handleSubmit = () => {
    if (typeof window !== 'undefined') {
      window.setTimeout(() => this.hideCookie(), 1000)
    }
  }

  cookieHidden = () => {
    if (typeof window !== 'undefined') {
      const hiddenInLs = lscache.get('hideEmail')
      const buyingJob = window.location.pathname.includes('post')
      return hiddenInLs || buyingJob
    }
  }

  render = () => {
    if (this.cookieHidden() === true || this.state.tempHidden) {
      return null
    }

    return (
      <div className="fixed-footer hidden md:block py-4">
        <div id="mc_embed_signup" className="w-full">
          <form
            action="https://xyz.us16.list-manage.com/subscribe/post?u=0b8a0e873d096aad47c111571&amp;id=1b07ed5d5b"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            onSubmit={this.handleSubmit}
            className="validate"
            style={{ width: '100%' }}
            target="_blank"
            noValidate
          >
            <div
              id="mc_embed_signup_scroll"
              className="flex items-center justify-center"
            >
              <span className="has-text-weight-bold mr-4">
                New frontend jobs directly in your inbox
              </span>
              <div className="mc-field-group flex items-center">
                <div className="mc-field-group select ml-2 mr-4">
                  <select
                    name="group[2933]"
                    className="REQ_CSS"
                    id="mce-group[2933]"
                    defaultValue="1"
                  >
                    <option value="" />
                    <option value="1">Daily</option>
                    <option value="2">Weekly</option>
                  </select>
                </div>
                <input
                  type="text"
                  name="NAME"
                  placeholder="Name"
                  className="required control input rounded px-2 py-1 mr-4"
                  id="mce-NAME"
                  style={{ width: '200px' }}
                />
                <input
                  type="email"
                  placeholder="Email"
                  name="EMAIL"
                  className="required email control input px-2 py-1 rounded mr-4"
                  id="mce-EMAIL"
                  style={{ width: '200px' }}
                />
              </div>
              <div id="mce-responses" className="clear">
                <div
                  className="response"
                  id="mce-error-response"
                  style={{ display: 'none' }}
                />
                <div
                  className="response"
                  id="mce-success-response"
                  style={{ display: 'none' }}
                />
                <div
                  style={{ position: 'absolute', left: '-5000px' }}
                  aria-hidden="true"
                >
                  <input
                    type="text"
                    name="b_0b8a0e873d096aad47c111571_1b07ed5d5b"
                    tabIndex="-1"
                    value=""
                    readOnly
                  />
                </div>
                <input
                  type="submit"
                  value="Subscribe"
                  name="subscribe"
                  id="mc-embedded-subscribe"
                  className="bg-transparent hover:bg-white text-white font-semibold hover:text-black py-2 px-4 border border-white hover:border-transparent rounded"
                />
              </div>
              <span onClick={this.hideCookie} style={{ marginLeft: '20px' }}>
                <i className="fas fa-times cursor-pointer" />
              </span>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Form
