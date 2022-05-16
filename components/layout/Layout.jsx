import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import MobNavbar from './MobNavbar';
import Navbar from './Navbar';

/**
 * @title Layout
 * @author adarsh
 * @component functional
 **/

const Layout = ({ children }) => {
    const [darkMode, setDarkMode] = useState(true);
    const [mobNav, setMobNav] = useState(false);

    useEffect(() => {
        const isMobile = window.innerWidth;

        if (isMobile < 1000) {
            setMobNav(true);
        } else {
            setMobNav(false);
        }

        loadData(); // load data

    }, [])

    // To change theme mode
    const changeDarkMode = () => {
        setDarkMode(!darkMode)
        localStorage.setItem('darkMode', JSON.parse(!darkMode)) // for user experience
    };

    // To load data
    const loadData = () => {
        const mode = JSON.parse(localStorage.getItem('darkMode')); // get item from localStorage
        setDarkMode(mode);
    }

    return (
        <div className={darkMode ? "dark" : " "}>
            <div className='dark:dark bg-light dark:text-white text-gray-900 h-max-screen font-poppins box-border'>
                {mobNav ? <MobNavbar darkMode={darkMode} changeDarkMode={changeDarkMode} /> : <Navbar darkMode={darkMode} changeDarkMode={changeDarkMode} />}
                <main className="md:max-w-[95%] md:m-auto md:px-2 px-2 font-poppins">
                    {children}
                </main>
                <Footer/>
            </div>
        </div>
    )
}

export default Layout;