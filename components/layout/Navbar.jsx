import React from 'react';
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { BsFillCircleFill } from "react-icons/bs";
import Link from "next/link";

const Navbar = ({ darkMode, setDarkMode }) => {


    return (
        <nav className='sticky top-0 z-30 w-full backdrop-filter backdrop-blur-xl bg-opacity-10 px-[54px]'>
            <div className='md:flex md:flex-row md:justify-start md:items-center max-w-[100%] md:gap-4 py-6 h4 '>
                <div className='md:w-[10%]'>Buy My NFT</div>
                <div className='md:w-[40%]'>Search Bar</div>
                <div className='md:flex md:flex-row md:items-center md:justify-around md:w-[20%]'>
                    <p><Link href="/"><a>Home</a></Link></p>
                    <p><Link href="/explore"><a>Explore</a></Link></p>
                    <p><Link href="/profile"><a>Profile</a></Link></p>
                </div>
                <div className='md:w-[10%] items-center flex justify-center'>
                    <button className='px-6 py-2 rounded-3xl bg-gradient-to-r from-violet-500 to-fuchsia-500 h4 text-white'>Create</button>
                </div>
                <div className='md:w-[10%] items-center flex justify-center'>
                    Metamask
                </div>
                <div className='flex flex-row justify-end items-center md:w-[10%]'>
                    <div onClick={() => { setDarkMode(!darkMode) }}>
                        {darkMode ?
                            <div className='flex flex-row bg-[#ffffff] p-2 rounded-full justify-between items-center w-[70px] cursor-pointer '>
                                <MdDarkMode size={20} className="fill-[#000000]" />
                                <BsFillCircleFill className="fill-blue-500" />
                            </div>
                            : <div className='flex flex-row bg-[#292929] p-2 rounded-full justify-between items-center w-[70px] cursor-pointer'>
                                <BsFillCircleFill className="fill-blue-500" />
                                <MdLightMode size={20} className="fill-[#ffffff]" />
                            </div>}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar


