import * as React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { DateTime } from 'luxon'

import { orderBy } from 'lodash'
import Empty from './empty'
import GroupedJobs from './groupedJobs'

import { extractNodes } from '../utils/graphql'

const query = graphql`
  query FrontpageJobs {
    allSanityJob {
      edges {
        node {
          _id
          slug
          application_url
          application_instructions
          company_icon
          company_name
          company_website
          external_source_link
          external_source_name
          tags {
            slug
            name
          }
          position
          location
          posted_at
        }
      }
    }
  }
`

export default () => (
  <StaticQuery
    query={query}
    render={({ allSanityJob }) => {
      let jobs =
        orderBy(
          extractNodes(allSanityJob).filter(job => job.posted_at),
          'posted_at',
          'desc'
        ) || []

      const showable = job => {
        const date = DateTime.fromISO(job.posted_at)
        const since = DateTime.utc().minus({ months: 3 })
        return date > since
      }
      jobs = jobs.filter(showable)

      const content = jobs.length ? <GroupedJobs jobs={jobs} /> : <Empty />

      return (
        <div className="mx-4 pt-4">
          {content}
        </div>
      )
    }}
  />
)
