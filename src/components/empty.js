import React from 'react'

import empty from '../images/empty-jobs.svg'

const Empty = () => (
  <div className="flex flex-col items-center justify-center mt-8">
    <h3>We don't have any jobs posted here, yet!</h3>
    <img alt="Empty" src={empty} className="mt-4 w-1/4" />
  </div>
)

export default Empty
