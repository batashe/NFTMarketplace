import React from 'react'
import { FaWallet } from "react-icons/fa"
import InfoCard from './InfoCard'
import wallet from "../../assets/wallet.png"
import create from "../../assets/create.png"
import sell from "../../assets/sell.png"
import upload from "../../assets/upload.png"

const InfoSection = () => {
    return (
        <div className="max-w-[85%] m-auto">
            <h2 className='h2 text-center mt-[80px]'>Create and sell your NFTs</h2>
            <div className='flex justify-center items-center md:gap-6 md:flex-row flex-col '>
                <InfoCard icon={wallet} title="Set up your wallet" text="Once you’ve set up your wallet of choice, connect it to OpenSea by clicking the wallet icon in the top right corner.We support Metamask" />
                <InfoCard icon={create} title="Create your collection" text="Click My Collections and set up your collection. Add social links, a description, profile & banner images, and set a secondary sales fee." />
                <InfoCard icon={upload} title="Add your NFTs" text="Upload your work (image, video, audio, or 3D art), add a title and description, and customize your NFTs with properties, stats, and unlockable content." />
                <InfoCard icon={sell} title="List them for sale" text="Choose between auctions, fixed-price listings, and declining-price listings. You choose how you want to sell your NFTs, and we help you sell them!" />
            </div>
        </div>
    )
}

export default InfoSection