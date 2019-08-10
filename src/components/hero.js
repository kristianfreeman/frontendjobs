import * as React from 'react'

const Hero = () => (
  <div>
    <div className="bg-green text-white flex justify-center">
      <div className="max-w-2xl py-4 md:py-8 px-4">
        <h1 className="text-2xl md:text-4xl mb-4">
          The future is frontend
          <span role="img" aria-label="laptop">
            {' '}
            💻
          </span>
        </h1>
        <h3 className="font-normal text-grey-lightest text-xl md:text-2xl leading-tight">
          Find your next great frontend job writing React, Vue, Angular, and
          more. Work remotely, full-time, or get your first senior gig.
        </h3>
        <h3 className="mt-4 pb-2 font-normal text-base md:text-lg">
          Brought to you by{' '}
          <a
            className="no-underline hover:underline text-white"
            href="https://www.byteconf.com"
          >
            Byteconf - a developer community for everyone
          </a>
        </h3>
        <p className="hidden md:block my-6">
          <a
            className="bg-blue text-white p-4 no-underline hover:text-grey-light rounded"
            href="/post"
          >
            <i className="fas fa-star mr-2" />
            Post a job for $29
          </a>
        </p>
      </div>
    </div>
  </div>
)

export default Hero
