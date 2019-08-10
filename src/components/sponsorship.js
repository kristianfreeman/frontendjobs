import * as React from 'react'

const Sponsorship = ({ imageUrl, headline, description, url }) => (
  <div
    className={`flex px-4 md:px-0 my-6 py-4 border shadow justify-between items-center bg-green-lighter`}
  >
    <img
      alt={headline}
      className="hidden md:block mx-2 md:mx-8 logo hide-mobile bg-transparent"
      src={imageUrl}
    />
    <div className="flex sm:flex-1 md:w-1/2">
      <div>
        <h2 className="text-md pb-2 leading-tight">
          <a
            className="text-green-darker hover:underline no-underline"
            href={url + '?ref=frontendjobs.tech'}
          >
            {headline}
          </a>
        </h2>
        <h4 className="text-lg font-normal text-green-darkest leading-normal">
          {description}
        </h4>
      </div>
    </div>
    <div className="hidden md:w-1/4 md:flex items-center justify-end pr-8">
      <a
        className="bg-transparent hover:bg-green text-green-darker font-bold hover:text-white py-2 px-4 border border-green hover:border-transparent rounded no-underline text-xl"
        href={url + '?ref=frontendjobs.tech'}
      >
        Learn More
      </a>
    </div>
  </div>
)

export default Sponsorship
