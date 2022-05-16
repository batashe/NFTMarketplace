import Image from 'next/image';
import React, { useState } from 'react';
import logo from "../../assets/logo.png";
import { FiSearch } from "react-icons/fi";
import { HiMenuAlt2 } from "react-icons/hi";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { BsFillCircleFill } from "react-icons/bs";

const MobNavbar = ({ darkMode, setDarkMode }) => {

    const [toggle, setToggle] = useState(false);
    const [searchBar, setSearchBar] = useState(false);

    return (
        <nav className='sticky top-0 z-30 w-full backdrop-filter backdrop-blur-xl bg-opacity-10 md:px-[54px] px-2'>
            <div className='flex flex-row justify-between items-center p-3'>
                <div><Image src={logo} alt="logo" width={40} height={40} /></div>
                <div className='flex flex-row justify-between items-center gap-4'>
                    <div onClick={() => { setDarkMode(!darkMode) }}>
                        {darkMode ?
                            <div className='flex flex-row bg-transparent border-[1px] dark:border-gray-700 p-2 rounded-full justify-between items-center w-[65px]'>
                                <MdDarkMode size={18} className="fill-[#a6a6a6]" />
                                <BsFillCircleFill className="fill-blue-500" />
                            </div>
                            : <div className='flex flex-row bg-transparent border-[1px] border-gray-400 p-2 rounded-full justify-between items-center w-[65px] cursor-pointer '>
                                <BsFillCircleFill className="fill-blue-500" />
                                <MdLightMode size={15} className="fill-[#292929]" />
                            </div>}
                    </div>
                    <div className='p-2.5 rounded-full border-[1px] dark:border-gray-700 border-gray-400 ' onClick={() => { setSearchBar(!searchBar) }}>
                        <FiSearch />
                    </div>
                    <div className='p-2.5 rounded-full border-[1px] dark:border-gray-700 border-gray-400' onClick={() => { setToggle(!toggle) }}>
                        <HiMenuAlt2 />
                    </div>
                </div>

            </div>
        </nav>
    )
}

export default MobNavbar