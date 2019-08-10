import React from 'react'

import { graphql } from 'gatsby'
import Empty from '../components/empty'
import GroupedJobs from '../components/groupedJobs'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { extractNodes } from '../utils/graphql'

import { intersection, orderBy, take } from 'lodash'
import { DateTime } from 'luxon'

const thisMonth = date => {
  const parsedDate = DateTime.fromISO(date.toString())
  const monthAgo = DateTime.local().plus({ months: -1 })
  return parsedDate > monthAgo
}

const EmptyResults = () => (
  <div>
    <Empty />
  </div>
)

const TagPage = ({ data: { allSanityTag, allSanityJob } }) => {
  const tagIds = extractNodes(allSanityTag).map(({ _id }) => _id)
  const tagNames = extractNodes(allSanityTag).map(({ name }) => name)

  let jobs = orderBy(
    extractNodes(allSanityJob)
      .filter(job => {
        const jobTagIds = (job.tags || []).map(t => t._id)
        return intersection(jobTagIds, tagIds).length === tagIds.length
      })
      .filter(job => job.posted_at && thisMonth(job.posted_at)),
    'posted_at',
    'desc'
  )

  const showable = job => {
    const date = DateTime.fromISO(job.posted_at)
    const since = DateTime.utc().minus({ months: 3 })
    return date > since
  }

  jobs = jobs.filter(showable)

  const jobDescription =
    jobs.length &&
    `${jobs.length} ${tagNames.join(', ')} jobs at companies like ${take(
      jobs,
      3
    )
      .map(({ company_name }) => company_name)
      .join(', ')}`

  return (
    <Layout>
      <SEO
        title={`${tagNames.join(' + ')} Jobs`}
        description={jobDescription}
        keywords={tagNames}
      />
      <div className="flex justify-center">
        <div className="max-w-2xl">
          {tagNames.length && (
            <h2 className="my-8 text-4xl">{tagNames.join(' + ')} jobs</h2>
          )}
          {jobs.length ? <GroupedJobs jobs={jobs} /> : <EmptyResults />}
        </div>
      </div>
    </Layout>
  )
}

export default TagPage

export const pageQuery = graphql`
  query TagPageQuery($ids: [String!]) {
    allSanityJob {
      edges {
        node {
          _id
          company_icon
          company_name
          company_website
          position
          location
          posted_at
          slug
          tags {
            _id
            name
            slug
          }
        }
      }
    }
    allSanityTag(filter: { _id: { in: $ids } }) {
      edges {
        node {
          _id
          name
        }
      }
    }
  }
`
