import * as React from 'react'
import JobPosting from './jobPosting'

import { groupBy, orderBy } from 'lodash'
import { DateTime } from 'luxon'

const formatDate = date =>
  DateTime.fromISO(date)
    .toUTC()
    .toFormat('DDD')
const parseDate = date =>
  DateTime.fromISO(date)
    .toUTC()
    .toISODate()

const GroupedJobs = ({ jobs }) => {
  const byDate = groupBy(jobs, job => parseDate(job.posted_at))
  return Object.keys(byDate).map(date => (
    <div key={date}>
      <h4 className="pt-4 text-lg uppercase tracking-wide">
        {formatDate(date)}
      </h4>
      {byDate[date].map(job => (
        <JobPosting key={job._id} job={job} />
      ))}
    </div>
  ))
}

export default GroupedJobs
