import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <div className="flex justify-center">
      <div className="max-w-2xl">
        <h2 className="title">We couldn't find this link - sorry!</h2>
        <img
          alt="404"
          src="https://media1.tenor.com/images/908ec59adcc5f2ad8b1c075a61d2394c/tenor.gif?itemid=5012690"
        />
      </div>
    </div>
  </Layout>
)

export default NotFoundPage
