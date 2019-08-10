import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import { DateTime } from 'luxon'

import Showdown from 'showdown'
const converter = new Showdown.Converter()

const defaultKeywords = [
  'web developer jobs',
  'web developer',
  'react',
  'javascript',
  'webdev',
  'angular',
  'vue',
  'remote',
]

function SEO({ description, job, lang, meta, keywords, title }) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription =
          description || data.site.siteMetadata.description
        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={title}
            titleTemplate={`%s | ${data.site.siteMetadata.title}`}
            meta={[
              {
                name: 'description',
                content: metaDescription,
              },
              {
                property: 'og:title',
                content: title,
              },
              {
                property: 'og:description',
                content: metaDescription,
              },
              {
                property: 'og:type',
                content: 'website',
              },
              {
                name: 'twitter:card',
                content: 'summary',
              },
              {
                name: 'twitter:creator',
                content: data.site.siteMetadata.author,
              },
              {
                name: 'twitter:title',
                content: title,
              },
              {
                name: 'twitter:description',
                content: metaDescription,
              },
              {
                name: 'twitter:image',
                content: data.site.siteMetadata.image,
              },
            ]
              .concat({
                name: 'keywords',
                content: (keywords && keywords.length
                  ? defaultKeywords.concat(keywords)
                  : defaultKeywords
                ).join(', '),
              })
              .concat(meta)}
          >
            {job && (
              <script type="application/ld+json">{`
                {
                  "@context": "http://schema.org",
                  "@type": "JobPosting",
                  "datePosted": "${job.posted_at}",
                  "title": "${job.position}",
                  "description": "${converter.makeHtml(job.description)}",
                  "jobLocation": {
                    "@type": "Place",
                    "address": "${job.location}"
                  },
                  "hiringOrganization": {
                    "@type": "Organization",
                    "name": "${job.company_name}",
                    "sameAs": "${job.company_website}",
                    "logo": "${
                      job.company_icon
                        ? job.company_icon
                        : 'https://logo.clearbit.com/' + job.company_website
                    }"
                  },
                  "validThrough": "${DateTime.fromISO(job.posted_at)
                    .plus({
                      days: 90,
                    })
                    .toString()}"
                }
              `}</script>
            )}
          </Helmet>
        )
      }}
    />
  )
}

SEO.defaultProps = {
  lang: 'en',
  meta: [],
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
}

export default SEO

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
        image
      }
    }
  }
`
