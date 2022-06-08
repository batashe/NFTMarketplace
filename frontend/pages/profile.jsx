import React, { useState, useEffect } from 'react';
import Image from 'next/image'
// import { TransactionContext } from '../context/TransactionContext';
import { ShortenAdd } from '../helpers/ShortAdd';
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import MarketplaceAbi from "../utils/Marketplace.json";
import NFTAbi from "../utils/NFT.json";
import MarketplaceAddress from "../utils/MarketplaceAdd.json";
import NFTAddress from "../utils/NFTAdd.json";
import MyNftGrid from '../components/nft/MyNftGrid';
import GridLoader from '../components/Loader/GridLoader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from '../components/ui/NotFound';

/**
 * @title User Profile
 * @author Adarsh & Apoorv
 * @component functional
 **/

export default function Profile() {

    const [loading, setLoading] = useState(true);
    const [listedItems, setListedItems] = useState([]);
    const [soldItems, setSoldItems] = useState([]);
    const [currentAccount, setCurrentAccount] = useState("");
    const [purchaseItems, setPurchaseItems] = useState([]);

    const wrongNetErrorMsg = () => toast.error("Use only Rinkeby Testnet", { theme: "colored" });

    async function loadListedItems() {

        try {

            if (typeof window.ethereum === "undefined") {
                setCurrentAccount("");
                return;
            }

            const web3Modal = new Web3Modal({
                network: 'rinkeby',
                cacheProvider: true,
            })

            const web3ModalProvider = await web3Modal.connect();
            const accounts = await web3ModalProvider.request({ method: 'eth_requestAccounts' });
            const account = await accounts[0];
            setCurrentAccount(account);
            const provider = new ethers.providers.Web3Provider(web3ModalProvider);
            const signer = provider.getSigner();

            const market_place = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer);

            const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);

            // Load all sold items that the user listed
            const itemCount = await market_place.itemCount()

            let listedItems = []
            let soldItems = []

            for (let indx = 1; indx <= itemCount; indx++) {
                const i = await market_place.items(indx)
                if (i.seller.toLowerCase() === account) {
                    // get uri url from nft contract
                    const uri = await nft.tokenURI(i.tokenId)
                    // use uri to fetch the nft metadata stored on ipfs 
                    const response = await fetch(uri)
                    const metadata = await response.json()
                    // get total price of item (item price + fee)
                    const totalPrice = await market_place.getTotalPrice(i.itemId)
                    // define listed item object
                    let item = {
                        totalPrice,
                        price: i.price,
                        itemId: i.itemId,
                        name: metadata.name,
                        description: metadata.description,
                        image: metadata.image
                    }
                    listedItems.push(item)
                    // Add listed item to sold items array if sold
                    if (i.sold) soldItems.push(item)
                }
            }

            // Fetch purchased items from marketplace by quering Offered events with the buyer set as the user
            const filter = market_place.filters.Bought(null, null, null, null, null, account)
            const results = await market_place.queryFilter(filter)
            //Fetch metadata of each nft and add that to listedItem object.
            const purchases = await Promise.all(results.map(async i => {
                // fetch arguments from each result
                i = i.args
                // get uri url from nft contract
                const uri = await nft.tokenURI(i.tokenId)
                // use uri to fetch the nft metadata stored on ipfs 
                const response = await fetch(uri)
                const metadata = await response.json()
                // get total price of item (item price + fee)
                const totalPrice = await market_place.getTotalPrice(i.itemId)
                // define listed item object
                let purchasedItem = {
                    totalPrice,
                    price: i.price,
                    itemId: i.itemId,
                    name: metadata.name,
                    description: metadata.description,
                    image: metadata.image
                }
                return purchasedItem;
            }))

            setLoading(false)
            setListedItems(listedItems)
            setSoldItems(soldItems)
            setPurchaseItems(purchases);

        } catch (err) {
            alert("Please Use Rinkeby Testnet: " + err.message);
            wrongNetErrorMsg();
            //console.log(error);
        }

    }

    useEffect(() => {
        loadListedItems()
    }, [])


    if (!currentAccount) {
        return (
            <div>
                <NotFound status="401" name="Unauthenticated Route" description="Please Install Metamask to Sign in" />
            </div>
        )
    }


    const sumOfListedNfts = listedItems.map((item) => (ethers.utils.formatEther(item.totalPrice))).reduce((prev, curr) => (parseFloat(prev) + parseFloat(curr)).toFixed(2), 0);
    const sumOfSoldNfts = soldItems.map((item) => (ethers.utils.formatEther(item.totalPrice))).reduce((prev, curr) => (parseFloat(prev) + parseFloat(curr)).toFixed(2), 0);
    const sumOfPurchasedNfts = purchaseItems.map((item) => (ethers.utils.formatEther(item.totalPrice))).reduce((prev, curr) => (parseFloat(prev) + parseFloat(curr)).toFixed(2), 0);

    //flour value of Collection
    const price = listedItems.map((item) => (ethers.utils.formatEther(item.totalPrice))).map(str => { return parseFloat(str) })
    const floorVal = Math.min(...price);

    return (
        <div className=''>
            <div className='md:dark:bg-[#191919] md:mx-14 md:p-5 rounded-lg md:bg-[#F7F7F7] md:relative  md:h-[250px] md:mt-2 mx-4 md:mb-[200px] '>
                <div className='flex flex-row items-center justify-center md:absolute  z-10 top-[70%] w-full'>
                    <Image className='rounded-full l-0 t-0 ' width={200} height={200} alt="ether" src='https://i.pinimg.com/originals/e8/09/ff/e809ff380655b17e3dd1305039df32b3.png' />
                </div>
                <div className='flex flex-row items-center justify-center md:absolute  z-10 top-[140%] w-full'>
                    <div className='bg-gray-300 dark:bg-gray-800 py-2 px-10 h4 rounded-full '>{ShortenAdd(currentAccount)}</div>
                </div>
            </div>

            {/** information **/}

            <div className='mt-4'>
                <h2 className='h2 max-w-[95%] m-auto md:px-2 px-2'>My <span className='text-blue-500'>Listed NFTs</span></h2>
                {loading === true ? (<div><GridLoader /></div>) : (<MyNftGrid items={listedItems} type="Listed" />)}
            </div>
            <div className='mt-4'>
                <h2 className='h2 max-w-[95%] m-auto md:px-2 px-2'>Sold <span className='text-blue-500'> NFTs</span></h2>
                {loading === true ? (<div><GridLoader /></div>) : (<MyNftGrid items={soldItems} type="Sold" />)}
            </div>
            <div className='mt-4'>
                <h2 className='h2 max-w-[95%] m-auto md:px-2 px-2'>My <span className='text-blue-500'>Purchases </span></h2>
                {loading === true ? (<div><GridLoader /></div>) : (<MyNftGrid items={purchaseItems} type="Purchased" />)}
            </div>
        </div>
    )
}
