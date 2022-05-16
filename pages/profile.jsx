import React from 'react';
import { useRouter } from 'next/router'
import Image from 'next/image'
import NftGrid from '../components/nft/NftGrid';

import NFT_DATA from "../helpers/dummyNFTs";

/**
 * @title User Profile
 * @author apoorv
 * @component functional
 **/

export default function profile() {
    const router = useRouter();
    return (
        <div>
            <div className='md:dark:bg-[#191919] md:mx-14 md:p-5 rounded-lg md:bg-[#F7F7F7] md:relative md:h-[250px] md:mt-2 mx-4 '>
                <div className='flex flex-row items-center justify-center md:absolute  z-10 top-[70%] left-[42%]'>
                    <Image className='rounded-full l-0 t-0 ' width={200} height={200} alt="ether" src='https://i.pinimg.com/originals/e8/09/ff/e809ff380655b17e3dd1305039df32b3.png' />
                </div>
            </div>
            <div className='flex justify-center items-center md:mt-[150px] mt-3'>
                <div className='bg-gray-300 dark:bg-gray-800 py-2 px-8 h4 rounded-full'>0xee4........xccg1</div>
            </div>
            <div className='mt-4'>
            <h2 className='h1'>My <span className='text-blue-500'>NFTs</span></h2>
                <NftGrid nfts={NFT_DATA}></NftGrid>
            </div>
        </div>
    )
}
