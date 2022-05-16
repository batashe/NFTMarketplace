import React from 'react'
import Image from 'next/image'

const NftCard = ({ nfts }) => {
    return (
        <div>
            {/* create a grid of data  */}
            <div className="flex flex-wrap my-6 w-full justify-center">
                {/* TODO:There should be max 4 items in one row, currently there is no such limit */}
                {nfts.map((nft) => (
                    <div className="border border-[rgba(4, 4, 5, 0.1)] dark:border-[#474747] rounded-lg p-4 my-3 mx-3 hover:shadow-md hover:shadow-blue-100 transition ease-in-out delay-100 w-[260px] h-[350px] cursor-pointer dark:shadow-gray-800" key={nft.id} >
                        <Image className='rounded-md' src={nft.image} alt={nft.name} width={230} height={230} />
                        <h3 className='h4 mt-2'>{nft.name}</h3>
                        <div className='flex flex-row justify-between items-center mb-1'>
                            <p className='h4'>{nft.price}</p>
                            <Image src='https://rarible.com/9b703a21b9f93a1f0065.svg' width={24} height={24} alt="ether"/>
                        </div>
                        <div className='flex flex-row justify-between items-center'>
                            <p className='text-blue-500 hover:text-blue-800 text-sm font-semibold py-2 rounded-full'>Buy now</p>
                            {nft.isFavourite ?
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="red">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg> :
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

export default NftCard