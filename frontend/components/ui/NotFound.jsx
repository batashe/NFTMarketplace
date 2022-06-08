import React from 'react';
import Link from 'next/link';


const NotFound = ({ name, description, status }) => {

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="px-4">
        <div className="lg:gap-4 lg:flex">
          <div
            className="flex flex-col items-center justify-center ">
            <h1 className="font-bold text-blue-600 md:text-7xl text-5xl">{status}</h1>
            <p className="mb-2 text-2xl font-bold text-center md:text-3xl">
              <span className="text-red-500">Oops! </span> {name}
            </p>
            <p className="mb-8 text-center text-gray-500 md:text-lg">
              {description}
            </p>
            <Link href="/" ><a className='px-8 py-3 text-sm font-semibold text-blue-50 bg-blue-500 dark:bg-blue-400 rounded-md hover:bg-blue-800 dark:hover:bg-blue-800'> Go Back Home</a></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound;
