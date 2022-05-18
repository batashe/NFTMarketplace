import React, { useContext } from 'react';
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { BsFillCircleFill } from "react-icons/bs";
import Link from "next/link";
import logo from "../../assets/logo.png";
import Image from 'next/image';
import { TransactionContext } from '../../context/TransactionContext';
import { ShortenAdd } from '../../helpers/shortAdd';

/**
 * @title Navbar for desktop
 * @author adarsh
 * @component functional
 **/

const Navbar = ({ darkMode, changeDarkMode }) => {

    const { currentAccount, connectWallet } = useContext(TransactionContext);

    return (
        <nav className='sticky top-0 z-30 w-full backdrop-filter backdrop-blur-xl bg-opacity-10 md:px-[54px] px-2'>
            <div className='md:flex md:flex-row md:justify-start md:items-center max-w-[100%] md:gap-4 py-5 md:h4 text-gray-500 flex flex-row justify-between items-center'>
                <div className='md:w-[5%] md:h3 text-gray-800 dark:text-white h4'><Image src={logo} alt="logo" width={40} height={40} /></div>
                {/*Serach Bar*/}
                <div className='md:w-[45%]'>
                    <input type="search" placeholder='🔎 Type Here To Search Query' className='form-control block w-full px-6 py-2 text-base para outline-none bg-gray-100 border rounded-full transition ease-in-out m-0 focus:text-gray-700  focus:border-gray-500 focus:outline-none hover:shadow-sm focus:shadow-sm dark:bg-[#232323] dark:border-none' /></div>
                {/*Menu Bar*/}
                <div className='md:flex md:flex-row md:items-center md:justify-around md:w-[20%] hidden'>
                    <p><Link href="/"><a>Home</a></Link></p>
                    <p><Link href="/explore"><a>Explore</a></Link></p>
                    <p><Link href="/profile"><a>Profile</a></Link></p>
                </div>

                <div className='hidden md:flex md:flex-row items-center justify-end gap-4 md:w-[30%]'>

                    {/*Create Button*/}
                    <div className=' md:items-center md:flex md:justify-center hidden'>
                        <button className='px-6 py-2 rounded-3xl bg-gradient-to-r from-violet-500 to-fuchsia-500 h4 text-white'><Link href="/create"><a>Create</a></Link></button>
                    </div>

                    {/*Connect Wallet*/}
                    <div className=' md:items-center md:flex md:justify-center hidden cursor-pointer'>
                        {!currentAccount && <button className='px-6 py-1.5 rounded-3xl border-[1px] border-gray-300' onClick={connectWallet}>Sign in</button>}
                        {currentAccount && <div className='px-8 py-2 rounded-3xl bg-gradient-to-r from-violet-500 to-fuchsia-500 h4 text-white'>{ShortenAdd(currentAccount)}</div>}
                    </div>

                    <div className='md:flex md:flex-row md:justify-end md:items-center  hidden'>
                        {/* Dark mode configuration*/}
                        <div onClick={changeDarkMode}>
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
            </div>
        </nav>
    )
}

export default Navbar


