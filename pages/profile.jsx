import React from 'react';
import { useRouter } from 'next/router'
import Image from 'next/image'
import NftGrid from '../components/nft/NftGrid';

import NFT_DATA from "../dummyNFTs";

export default function profile() {
    const router = useRouter();
  return (
    <div>
        <div className='border border-gray-800 mx-14 p-5 rounded-lg '>
            <div className='flex flex-row items-center justify-center'>
                <Image className='rounded-full ' width={200} height={200} alt="ether" src='https://i.pinimg.com/originals/e8/09/ff/e809ff380655b17e3dd1305039df32b3.png' />
                <div className='ml-16'>
                    <p className='text-xl font-semibold mb-4'>Apoorv Pandey</p>
                    <p className='mb-2'>Address: 0xsdsjkh...sfkjsbf</p>
                    <p className='mb-2'>Net worth: 23 ETH</p>
                    <p>NFT's: 23</p>
                </div>
            </div>
        </div>
        <div>
            <NftGrid nfts={NFT_DATA} ></NftGrid>
        </div>
    </div>
  )
}
