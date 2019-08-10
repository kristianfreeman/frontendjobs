const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { kebabCase } = require('lodash')
const Combinatorics = require('js-combinatorics')
const extractNodes = resp => resp.edges.map(edge => edge.node)

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  // createRedirect({
  //   fromPath: '/post',
  //   toPath: 'https://bytesized.typeform.com/to/lu1L5R',
  // })

  return new Promise((resolve, reject) => {
    const jobTemplate = path.resolve(`src/templates/job.js`)
    const tagTemplate = path.resolve(`src/templates/tag.js`)
    // Query for markdown nodes to use in creating pages.
    resolve(
      graphql(
        `
          {
            allSanityTag {
              edges {
                node {
                  _id
                  slug
                }
              }
            }
            allSanityJob {
              edges {
                node {
                  _id
                  slug
                  url
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        const jobs = extractNodes(result.data.allSanityJob)
        const tags = extractNodes(result.data.allSanityTag)

        jobs.forEach(({ _id, slug }) => {
          createPage({
            path: `/j/${slug}`,
            component: jobTemplate,
            context: {
              id: _id,
            },
          })
        })

        const tagIds = tags.map(({ _id }) => _id)
        const tagHash = {}
        tags.forEach(tag => {
          tagHash[tag._id] = tag
        })

        const sortedUniqueSet = new Set()

        const min = 2
        const max = 3

        // for (let i = min; i <= max; i++) {
        //   const comb = Combinatorics.combination(tagIds, i)
        //   let cur
        //   while ((cur = comb.next())) {
        //     const sorted = cur.sort()
        //     sortedUniqueSet.add(sorted)
        //   }
        // }

        // for (let comb of sortedUniqueSet.values()) {
        //   const resolvedSet = comb.map(id => tagHash[id])
        //   const combinedSlug = resolvedSet.map(({ slug }) => slug).join('-')

        //   createPage({
        //     path: `/t/${combinedSlug}`,
        //     component: tagTemplate,
        //     context: {
        //       ids: comb,
        //     },
        //   })
        // }

        tags.forEach(({ _id, slug }) => {
          createPage({
            path: `/t/${slug}`,
            component: tagTemplate,
            context: {
              ids: [_id],
            },
          })
        })
      })
    )
  })
}
