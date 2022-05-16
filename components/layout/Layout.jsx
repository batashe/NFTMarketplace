import React, { useState, useEffect } from 'react';
import MobNavbar from './MobNavbar';
import Navbar from './Navbar';



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

    }, [])


    return (
        <div className={darkMode ? "dark" : " "}>
            <div className='dark:dark bg-light dark:text-white text-gray-900 h-max-screen font-poppins'>
                {mobNav ? <MobNavbar darkMode={darkMode} setDarkMode={setDarkMode} /> : <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />}
                <main className="md:max-w-[95%] md:m-auto md:px-2 px-2 font-poppins">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default Layout;