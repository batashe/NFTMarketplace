import React from 'react'
import Image from "next/image"


const InfoCard = ({ icon, title, text }) => {
    return (
        <div className='flex flex-col items-center justify-center gap-4 text-center md:my-14 my-8'>
            <Image src={icon.src} width={48} height={48} />
            <h3 className='text-lg font-semibold'>{title}</h3>
            <p className='text-[16px] text-center text-gray-500'>{text}</p>
        </div>
    )
}

export default InfoCard