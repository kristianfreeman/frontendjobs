import React from 'react'

import Hero from '../components/hero'
import Layout from '../components/layout'
import SEO from '../components/seo'

import Content from '../components/content'

const IndexPage = () => (
  <Layout>
    <Hero />
    <SEO title="Find your next great frontend gig" />
    <div className="flex justify-center">
      <div className="max-w-2xl">
        <Content />
      </div>
    </div>
  </Layout>
)

export default IndexPage
