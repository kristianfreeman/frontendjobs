import React from 'react'
import Layout from '../components/layout'

const Success = () => (
  <Layout>
    <div className="container" style={{ marginTop: '40px' }}>
      <h1>Thanks for posting a job on Frontend Jobs!</h1>
      <h2>
        Your job is processing - we'll email you when your job is ready to view
        on the site.
      </h2>
    </div>
  </Layout>
)

export default Success
