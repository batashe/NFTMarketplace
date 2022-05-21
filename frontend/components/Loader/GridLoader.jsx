import React from 'react'
import { FaEthereum } from "react-icons/fa";

const GridLoader = () => {
    let isFav = true;

    var items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    return (
        <div>
            {/* create a grid of data  */}
            <div className="flex flex-wrap my-6 w-full justify-center">
                {/* TODO:There should be max 4 items in one row, currently there is no such limit */}
                {items.map((_, idx) => (
                    <div className="border border-[rgba(4, 4, 5, 0.1)] dark:border-[#474747] rounded-lg p-4 my-3 mx-3 hover:shadow-md hover:shadow-blue-100 transition ease-in-out delay-100 w-[260px] h-[350px] cursor-pointer dark:shadow-gray-800 animate-pulse" key={idx} >
                        <div className='rounded-md w-[230px] h-[230px] dark:bg-[#474747] bg-[#f1f1f4] ' />
                        <h3 className='my-2 p-2 dark:bg-[#474747] bg-[#f1f1f4] rounded-lg'></h3>
                        <div className='flex flex-row justify-between items-center mb-1 '>
                            <p className='p-2 dark:bg-[#474747] bg-[#f1f1f4] my-1 w-[50%] rounded-lg'></p>
                            <FaEthereum fill='#474747' />
                        </div>
                        <div className='flex flex-row justify-between items-center'>
                            <p className='dark:bg-[#474747] bg-[#f1f1f4] p-2 w-[60%] rounded-lg'></p>
                            {isFav ?
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#474747">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg> :
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="#474747" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GridLoader