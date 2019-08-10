// https://github.com/sstur/react-rte/issues/191#issuecomment-293686258

import React, { PureComponent } from 'react'

export default Component =>
  class ClientSideOnly extends PureComponent {
    state = { isMounted: false }

    componentDidMount() {
      // Don't queue another state update until after this current pass is done.
      // Hacks all around!
      Promise.resolve(null).then(() => this.deferredMount())
    }

    deferredMount() {
      this.setState({ isMounted: true })
    }

    render() {
      if (!this.state.isMounted) return null
      return <Component {...this.props} />
    }
  }
