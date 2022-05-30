import React, { useContext } from 'react'
import { TransactionContext } from '../context/TransactionContext'

const style = {
    wrapper: `relative backdrop-blur-xl `,
    container: `before:content-[''] before:bg-red-500 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[url('https://lh3.googleusercontent.com/ujepnqpnL0nDQIHsWxlCXzyw4pf01yjz1Jmb4kAQHumJAPrSEj0-e3ABMZlZ1HEpJoqwOcY_kgnuJGzfXbd2Tijri66GXUtfN2MXQA=s250')] before:bg-cover before:bg-center before:opacity-40 before:blur `,
    contentWrapper: `flex py-6 md:pt-10 relative justify-center flex-wrap items-center md:gap-2 gap-6 `,
    copyContainer: `md:w-1/2 w-[90%] `,
    title: `relative  md:text-[46px] md:font-bold text-[28px] font-semibold text-[30px] leading-tight`,
    description: `text-[#8a939b] container-[400px] text-lg mt-[0.8rem] mb-[2.5rem]`,
    ctaContainer: `flex`,
    walletButton:`relative text-lg font-semibold px-10 py-2.5 rounded-lg mr-5 hover:bg-blue-500 text-white bg-[#42a0ff] cursor-pointer`,
    accentedButton: ` relative text-lg font-semibold px-10 py-2.5 border-2 bg-white border-[#2181e2] rounded-lg mr-5 text-blue-500 hover:text-white hover:bg-[#42a0ff] hover:border-[#42a0ff] cursor-pointer`,
    button: ` relative text-lg font-semibold px-10 py-2.5 glitter rounded-lg mr-5 text-[#e4e8ea] hover:animate-pulse cursor-pointer`,
    cardContainer: `rounded-[3rem] md:p-0 p-8 `,
    infoContainer: `h-20 dark:bg-[#313338] bg-white p-4 rounded-b-lg flex items-center`,
    author: `flex flex-col justify-center ml-4`,
    name: ``,
    infoIcon: `flex justify-end items-center flex-1 text-[#8a939b] text-3xl font-bold`,
}

const Home = () => {

    const { currentAccount, connectWallet } = useContext(TransactionContext);
    console.log(currentAccount)

    return (
        <div>
            <div className={style.wrapper}>
                <div className={style.container}>
                    <div className={style.contentWrapper}>
                        <div className={style.copyContainer}>
                            <div className={style.title}>
                                Discover, collect, and sell extraordinary NFTs
                            </div>
                            <div className={style.description}>
                                This is an NFT Marketplace made by UIT RGPV Students
                            </div>
                            {!currentAccount ? <button className={style.walletButton} onClick={() => connectWallet()}>Connect to Wallet</button> :
                                <div className={style.ctaContainer}>
                                    <button className={style.accentedButton}>Explore</button>
                                    <button className={style.button}>Create</button>
                                </div>
                            }
                        </div>
                        <div className={style.cardContainer}>
                            <img
                                className="rounded-t-lg"
                                src="https://lh3.googleusercontent.com/ujepnqpnL0nDQIHsWxlCXzyw4pf01yjz1Jmb4kAQHumJAPrSEj0-e3ABMZlZ1HEpJoqwOcY_kgnuJGzfXbd2Tijri66GXUtfN2MXQA=s550"
                                alt="hero"

                            />
                            <div className={style.infoContainer}>
                                <img
                                    className="h-[2.25rem] rounded-full"
                                    src="https://lh3.googleusercontent.com/qQj55gGIWmT1EnMmGQBNUpIaj0qTyg4YZSQ2ymJVvwr_mXXjuFiHJG9d3MRgj5DVgyLa69u8Tq9ijSm_stsph8YmIJlJQ1e7n6xj=s64"
                                    alt="hero2"

                                />
                                <div className={style.author}>
                                    <div className={style.name}>Nirvana</div>
                                    <div className="text-[#1868b7]">
                                        Adarsh Kushwaha
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home