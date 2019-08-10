import React from 'react'

import { graphql } from 'gatsby'
import JobDetail from '../components/jobDetail'
import Layout from '../components/layout'
import SEO from '../components/seo'

const JobPage = ({ data }) => {
  const job = data.sanityJob

  return (
    <Layout>
      <SEO
        title={`${job.position} at ${job.company_name}`}
        description={`${job.company_name} is hiring a ${job.position}. ${
          job.description
        }`}
        job={job}
        keywords={[
          job.company_name,
          job.position,
          ...(job.tags || []).map(({ name }) => name),
        ]}
      />
      <div className="px-2 md:px-8 mx-auto max-w-lg">
        <JobDetail job={job} />
      </div>
    </Layout>
  )
}

export default JobPage

export const pageQuery = graphql`
  query JobPageQuery($id: String!) {
    sanityJob(_id: { eq: $id }) {
      _id
      company_icon
      company_name
      company_website
      description
      requirements
      remote_friendly
      help_with_relocation
      responsibilities
      tags {
        slug
        name
      }
      position
      location
      posted_at
      application_instructions
      application_url
      external_source_name
      external_source_link
    }
  }
`
