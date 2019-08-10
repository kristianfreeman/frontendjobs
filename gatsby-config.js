var proxy = require('http-proxy-middleware')
const { orderBy } = require('lodash')
const extractNodes = resp => resp.edges.map(edge => edge.node)

module.exports = {
  developMiddleware: app => {
    app.use(
      '/.netlify/functions/',
      proxy({
        target: 'http://localhost:9000',
        pathRewrite: {
          '/.netlify/functions/': '',
        },
      })
    )
  },
  siteMetadata: {
    title: 'Frontend Jobs',
    description:
      'The future is frontend. Find your next great frontend web developer job writing React, Vue, Angular, and more. Work remote, full-time, or get your first senior gig',
    author: '@byteconf',
    siteUrl: 'https://frontendjobs.tech',
    image: 'https://avatars.io/twitter/getfrontendjobs',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-xxxxxxxxx-xx',
      },
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-stripe-elements`,
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-netlify',
    'gatsby-plugin-netlify-cache',
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }
      `,
        feeds: [
          {
            serialize: ({ query: { site, allSanityJob } }) => {
              const filterAndSort = orderBy(
                extractNodes(allSanityJob).filter(job => !!job.posted_at),
                'posted_at',
                'desc'
              )
              return filterAndSort.map(job => {
                const companyName = job.company_twitter_username
                  ? `@${job.company_twitter_username}`
                  : job.company_name
                const title = `${companyName} is hiring a ${job.position} (${
                  job.location
                })`
                const url = `${site.siteMetadata.siteUrl}/j/${job.slug}`
                return Object.assign(
                  {},
                  {
                    title,
                    description: job.description,
                    date: job.posted_at,
                    url,
                    guid: url,
                  }
                )
              })
            },
            query: `
            {
              allSanityJob {
                edges {
                  node {
                    position
                    location
                    description
                    company_name
                    company_twitter_username
                    posted_at
                    slug
                  }
                }
              }
            }
          `,
            output: '/rss.xml',
            title: 'Frontend Jobs RSS Feed',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'xxxxxxxx',
        dataset: process.env.SANITY_ENV || process.env.NODE_ENV,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Frontend Jobs',
        short_name: 'frontendjobs.tech',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/logo.png', // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
