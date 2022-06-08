import Image from 'next/image';
import React from 'react';
import none from "../../assets/noNFT.svg";
import Link from 'next/link';

const NoNfts = ({ type }) => {
    return (

        <div className='flex flex-col gap-6 items-center justify-center my-8'>
            <Image src={none} width={250} height={250} alt="none" />
            <div className='h2 font-semibold'>You never <span className='text-blue-400'>{type}</span> NFTs</div>
        </div>
    )
}

export default NoNfts;