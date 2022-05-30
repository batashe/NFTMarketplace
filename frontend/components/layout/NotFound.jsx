import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

const PageNotFound = ({name,image,description,status}) => {
      
    const router= useRouter();

    return (
       <>
     <div className="flex items-center justify-center w-screen h-screen">
  <div className="px-4 lg:py-12">
    <div className="lg:gap-4 lg:flex">
      <div
        className="flex flex-col items-center justify-center md:py-24 lg:py-32"
      >
        <h1 className="font-bold text-blue-600 text-9xl">{status}</h1>
        <p
          className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl"
        >
          <span className="text-red-500">Oops!</span> {name}
        </p>
        <p className="mb-8 text-center text-gray-500 md:text-lg">
        {description}
        </p>
        <a
          href="#"
          className="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100"
          >Go home</a
        >
      </div>
      <div className="mt-4">
        <img
          src={image}
          alt="img"
          className="object-cover object-cover h-96 w-96"
        />
      </div>
    </div>
  </div>
</div>
      </>
       
      
    )
}

export default PageNotFound
 {/* <div className="inline-grid grid-cols-2 gap-x-4 center">
      <div classNameName="flex items-center">
         <h1>{router.query.name}</h1>
         <h5>{router.query.description}</h5>
        </div>
      <div><img className="object-cover h-96 w-96 center" src={router.query.image} /> </div>
      </div> */}
