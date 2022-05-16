import Image from 'next/image'
import React from 'react'

function Grid() {
  const data = [{
    id: 1,
    price:'0.25 ETH',
    isFavourite:true,
    name: 'John',
    image: 'https://images.pexels.com/photos/1910225/pexels-photo-1910225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 1,
    price:'0.25 ETH',
    isFavourite:false,
    name: 'John',
    image: 'https://images.pexels.com/photos/1910225/pexels-photo-1910225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 1,
    price:'0.25 ETH',
    isFavourite:true,
    name: 'John',
    image: 'https://images.pexels.com/photos/1910225/pexels-photo-1910225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 1,
    price:'0.25 ETH',
    isFavourite:false,
    name: 'John',
    image: 'https://images.pexels.com/photos/1910225/pexels-photo-1910225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 1,
    price:'0.25 ETH',
    isFavourite:true,
    name: 'John',
    image: 'https://images.pexels.com/photos/1910225/pexels-photo-1910225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  ]


  return (
    <div>
      {/* create a grid of data  */}
      <div className="flex flex-wrap my-10">
        {/* TODO:There should be max 4 items in one row, currently there is no such limit */}
        {data.map(item => (
          <div className="border border-gray-800 rounded-lg p-3 my-3 mx-3 hover:shadow-md hover:shadow-cyan-400 transition ease-in-out delay-100" key={item.id}>
            <Image className='rounded-md' src={item.image} alt={item.name} width={200} height={200}/>
            <h3>{item.name}</h3>
            <p className='text-sm'>{item.price}</p>
            <div className='flex flex-row justify-between'>
              <p className='text-blue-500 hover:text-blue-700 text-xs font-semibold py-2 rounded-full'>Buy now</p>
                {
                item.isFavourite ?
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>:
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>}    
            </div>
            
          </div>
        ))}
      </div>
    </div>
  )
}



const index = () => {
  return (
    <div>
      <Grid />
    </div>
  )
}

export default index