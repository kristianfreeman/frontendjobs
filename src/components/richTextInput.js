import React from 'react'
import clientSideOnly from './clientSideOnly'

class RichTextInput extends React.Component {
  constructor(props) {
    super(props)
    const RichTextEditor = require('react-rte').default
    this.state = { value: RichTextEditor.createEmptyValue() }
    this.RichTextEditor = null
  }

  onChange = value => {
    this.setState({ value })
    const stringValue = value.toString('markdown')
    const {
      field: { name, onChange },
    } = this.props
    onChange(name)(stringValue)
  }

  render = () => {
    if (!this.RichTextEditor) {
      // eslint-disable-next-line global-require
      this.RichTextEditor = require('react-rte').default
    }

    const RichTextEditor = this.RichTextEditor

    return <RichTextEditor value={this.state.value} onChange={this.onChange} />
  }
}

export default clientSideOnly(RichTextInput)
