import * as React from 'react'

const SEARCH_ENABLED = false

export default () =>
  SEARCH_ENABLED && (
    <div className="control has-icons-left">
      <input
        className="input"
        style={{ width: '100%' }}
        type="email"
        placeholder="Search by keyword, tool, or experience level"
      />
      <span className="icon is-medium is-left">
        <i className="fas fa-search" />
      </span>
    </div>
  )
