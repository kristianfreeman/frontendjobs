import React from 'react'

import JobDetail from '../components/jobDetail'
import Layout from '../components/layout'
import SEO from '../components/seo'
import StripeEnabledForm from '../components/stripeJobFormContainer'
import post from '../utils/post'
import { graphql } from 'gatsby'
import { throttle } from 'lodash'
import { extractNodes } from '../utils/graphql'

class PostJobPage extends React.Component {
  constructor(props) {
    super(props)
    this.updateJobPreview = throttle(this.updateJobPreview, 500)
  }

  state = { job: null }

  handleSubmit = async job => {
    await post({ job })
    window.location.replace(`/success`)
  }

  // updateJobPreview = job => this.setState({ job })
  updateJobPreview = () => {}

  render = () => {
    const {
      data: { allSanityCategory, allSanityTag },
    } = this.props

    const jobPreviewable = false

    return (
      <Layout>
        <SEO
          title="Post a job"
          description="Post your job to Frontend Jobs and reach frontend web developers around the world with expertise in JavaScript, React.js, Angular, and Vue"
          keywords={['hire web developer', 'hire']}
        />
        <div className="flex justify-center">
          <div className="px-8 max-w-2xl">
            <div className="mt-8 mb-6 leading-loose">
              <h1 className="measure leading-tight mb-4">
                Reach thousands of frontend developers around the world, and
                hire the best by posting on Frontend Jobs
              </h1>
              <p className="text-2xl font-light">Each posted job is:</p>
              <ul className="list text-lg my-2 measure-wide">
                <li>Posted on our homepage for thirty days</li>
                <li>
                  Tweeted by{' '}
                  <a
                    className="text-blue hover:underline no-underline"
                    href="https://twitter.com/getfrontendjobs"
                  >
                    @getfrontendjobs
                  </a>{' '}
                </li>
                <li>Shared on the Frontend Jobs mailing list</li>
              </ul>

              <p className="text-blue">
                <a
                  className="text-blue no-underline hover:underline font-extrabold"
                  href="https://www.frontendjobs.tech/j/edge-services-front-end-developer-walmart-labs-8402df7b-05e7-4e1f-b409-c1290721c5e4"
                >
                  Check out an example job here
                </a>
                .
              </p>
            </div>
            <div style={{ maxWidth: '800px' }}>
              <StripeEnabledForm
                handleSubmit={this.handleSubmit}
                tags={extractNodes(allSanityTag)}
                tagGroups={extractNodes(allSanityCategory)}
                updateJobPreview={this.updateJobPreview}
              />
              {jobPreviewable && (
                <div className="ml-4">
                  {!this.state.job && (
                    <React.Fragment>
                      <h4 className="subtitle">Job preview</h4>
                      <p>This is what your job will look like on the site!</p>
                    </React.Fragment>
                  )}
                  <JobDetail job={this.state.job} />
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default PostJobPage

export const pageQuery = graphql`
  query {
    allSanityTag {
      edges {
        node {
          _id
          name
        }
      }
    }
    allSanityCategory {
      edges {
        node {
          _id
          name
          tags {
            name
            _id
            slug
          }
        }
      }
    }
  }
`
