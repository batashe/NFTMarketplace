import React, { useState } from 'react';
import Navbar from './Navbar';


const Layout = ({ children }) => {
    const [darkMode, setDarkMode] = useState(true)

    return (
        <div className={darkMode ? "dark" : " "}>
            <div className='dark:dark bg-light dark:text-white text-gray-900 h-max-screen font-poppins'>
                {/* <Navbar darkMode={darkMode} setDarkMode={setDarkMode} /> */}
                <main className="md:max-w-[90%] md:m-auto md:px-2 px-4 font-poppins">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default Layout;