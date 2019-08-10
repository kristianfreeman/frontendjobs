import * as React from 'react'

import { orderBy } from 'lodash'
import ReactMarkdown from 'react-markdown'

import { DateTime } from 'luxon'

const List = ({ children }) => (
  <ul className="list leading-loose pt-2 pb-4">{children}</ul>
)

const Paragraph = ({ children }) => (
  <p className="py-2 leading-loose">{children}</p>
)

const MarkdownDiv = ({ input }) => (
  <ReactMarkdown
    renderers={{ list: List, paragraph: Paragraph }}
    source={input}
  />
)

const ExternalJob = ({ job }) => (
  <div className="measure-wide" style={{ paddingTop: '20px' }}>
    <div className="content text-lg">
      <div className="flex flex-wrap items-center">
        <div>
          <h1 className="mr-4 mb-4">
            {job.name || job.position}
            {job.company_name && (
              <span>
                {' '}
                at{' '}
                <a
                  className="text-grey-darker no-underline"
                  href={job.company_website}
                >
                  {job.company_name}
                </a>
              </span>
            )}
          </h1>
          {job.location && <h3 className="mb-4">Location: {job.location}</h3>}
          {job.help_with_relocation && (
            <h3>
              <span role="img" aria-label="suitcase">
                🧳{' '}
              </span>
              Company helps with relocation
              <span role="img" aria-label="check">
                ✅
              </span>
            </h3>
          )}
          <h3 className="mb-4">
            Posted{' '}
            {DateTime.fromISO(job.posted_at).toLocaleString(DateTime.DATE_FULL)}
          </h3>
        </div>
        <div className="py-4 mb-4 flex flex-wrap">
          {job.external_source_link && (
            <div>
              <a
                className="bg-blue rounded text-white p-4 text-lg no-underline hover:underline"
                href={job.external_source_link + '?ref=frontendjobs.tech'}
              >
                Apply now on {job.external_source_name}
              </a>
            </div>
          )}
          <p className="mt-8 leading-loose text-blue-darker">
            Please let the company know you found the job at Frontend Jobs - it
            helps us continue to grow, and build a better job board for everyone{' '}
            <i className="fas fa-heart" />
          </p>
        </div>
      </div>
    </div>
  </div>
)

const JobDetail = ({ job }) => {
  const [showImage, toggleShowImage] = React.useState(true)
  const imageFailed = () => toggleShowImage(false)

  return job && job.external_source_name ? (
    <ExternalJob job={job} />
  ) : (
    <div className="measure-wide" style={{ paddingTop: '20px' }}>
      <div className="content text-lg">
        <div className="flex flex-wrap items-center">
          {showImage && (
            <div>
              {(job.company_icon || job.company_website) && (
                <img
                  alt={job.company_name}
                  className="logo mr-4 mb-4"
                  onError={imageFailed}
                  src={
                    job.company_icon ||
                    `https://logo.clearbit.com/${job.company_website}`
                  }
                />
              )}
            </div>
          )}
          <div>
            <h1 className="mr-4 mb-4">
              {job.name || job.position}
              {job.company_name && (
                <span>
                  {' '}
                  at{' '}
                  <a
                    className="text-grey-darker no-underline"
                    href={job.company_website}
                  >
                    {job.company_name}
                  </a>
                </span>
              )}
            </h1>
            {job.location && <h3 className="mb-4">Location: {job.location}</h3>}
            {job.help_with_relocation && (
              <h3>
                <span role="img" aria-label="suitcase">
                  🧳{' '}
                </span>
                Company helps with relocation
                <span role="img" aria-label="check">
                  ✅
                </span>
              </h3>
            )}
            <h3 className="mb-4">
              Posted{' '}
              {DateTime.fromISO(job.posted_at).toLocaleString(
                DateTime.DATE_FULL
              )}
            </h3>
          </div>
        </div>
        <div className="py-4 mb-4 flex flex-wrap">
          {job.tags &&
            orderBy(job.tags, tag => tag.name).map(({ slug, name }) => (
              <a
                className="bg-grey-light text-black no-underline p-2 mb-2 mr-4 rounded"
                href={`/t/${slug}`}
                key={slug}
              >
                {name}
              </a>
            ))}
        </div>
        {job.remote_friendly && (
          <h3 className="mb-4">
            <span role="img" aria-label="plane">
              ✈️
            </span>
            <span className="mx-2">Remote-friendly</span>
            <span role="img" aria-label="checkmark">
              ✅
            </span>
          </h3>
        )}
        {job.description && (
          <React.Fragment>
            <h2 className="py-4">Description</h2>
            <MarkdownDiv input={job.description} />
          </React.Fragment>
        )}
        {job.responsibilities && (
          <React.Fragment>
            <h2 className="py-4">Responsibilities</h2>
            <MarkdownDiv input={job.responsibilities} />
          </React.Fragment>
        )}
        {job.requirements && (
          <React.Fragment>
            <h2 className="py-4">Requirements</h2>
            <MarkdownDiv input={job.requirements} />
          </React.Fragment>
        )}
        {job.application_instructions && (
          <div>
            <h2 className="py-4">Application Instructions</h2>
            <MarkdownDiv input={job.application_instructions} />
          </div>
        )}
        {job.application_url && (
          <div className="mt-8">
            <a
              className="bg-blue rounded text-white p-4 text-lg no-underline hover:underline"
              href={job.application_url + '?ref=frontendjobs.tech'}
            >
              Apply Now
            </a>
          </div>
        )}
        <p className="mt-8 leading-loose text-blue-darker">
          Please let the company know you found the job at Frontend Jobs - it
          helps us continue to grow, and build a better job board for everyone{' '}
          <i className="fas fa-heart" />
        </p>
      </div>
    </div>
  )
}

export default JobDetail
