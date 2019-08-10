import * as React from 'react'

import { orderBy } from 'lodash'
import TimeAgo from 'react-timeago'

const JobPosting = ({
  job: {
    _id,
    application_instructions,
    application_url,
    company_icon,
    company_name,
    company_website,
    external_source_name,
    external_source_link,
    location,
    tags,
    posted_at,
    position,
    promoted,
    slug,
  },
  selectedTag,
  selectedTags,
}) => {
  const external = (
    <div
      className={`flex px-4 md:px-0 my-4 py-4 border shadow justify-between items-center`}
    >
      <div className="flex sm:flex-1 md:w-1/2 px-8">
        <div>
          <h4 className="text-lg pr-2 leading-tight">
            <a
              className="text-blue-darker hover:underline no-underline"
              href={`/j/${slug}`}
            >
              {position} at {company_name}{' '}
              <span className="font-normal text-grey-darkest">
                ({location})
              </span>
            </a>
          </h4>
        </div>
      </div>
      <div className="hidden md:w-1/4 md:flex items-center justify-end pr-8 text-right">
        <a
          className="text-blue-dark font-semibold py-2 px-4 no-underline hover:underline"
          href={external_source_link + '?ref=frontendjobs.tech'}
        >
          Apply on {external_source_name}
        </a>
      </div>
    </div>
  )

  const job = (
    <div
      className={`flex px-4 md:px-0 my-4 py-4 border shadow justify-between items-center`}
    >
      <img
        alt={company_name}
        className="hidden md:block mx-2 md:mx-8 logo hide-mobile"
        src={company_icon || `/logo/${company_website}`}
      />
      <div className="flex sm:flex-1 md:w-1/2">
        <div>
          <h2 className="text-md pb-2 pr-2 leading-tight">
            <a
              className="text-blue-darker hover:underline no-underline"
              href={`/j/${slug}`}
            >
              {position}
            </a>
          </h2>
          <h4 className="text-lg font-normal text-grey-darkest leading-normal">
            {company_name}
          </h4>
          <h4 className="text-lg font-normal text-grey-darkest leading-normal">
            {location}
          </h4>
        </div>
      </div>
      <div className="hidden md:flex md:w-1/4 flex-wrap">
        {orderBy(tags || [], tag => tag.name).map(tag => (
          <a
            className={`bg-grey-light text-base rounded mb-2 p-2 text-grey-darkest no-underline hover:underline mr-2 ${
              selectedTag && selectedTag._id === tag._id
                ? 'bg-blue-light text-white'
                : null
            }`}
            href={`/t/${tag.slug}`}
            key={tag.slug}
          >
            {tag.name}
          </a>
        ))}
      </div>
      <div className="hidden md:w-1/4 md:flex items-center justify-end pr-8">
        {application_url ? (
          <a
            className="bg-transparent hover:bg-blue text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded no-underline text-xl"
            href={application_url + '?ref=frontendjobs.tech'}
          >
            Apply
          </a>
        ) : (
          <a
            className="bg-transparent hover:bg-blue text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded no-underline text-xl"
            href={`/j/${_id}`}
          >
            Apply
          </a>
        )}
      </div>
    </div>
  )

  return external_source_name ? external : job
}

export default JobPosting
