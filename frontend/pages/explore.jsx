import React, { useEffect, useState, useContext } from 'react';
import NftGrid from '../components/nft/NftGrid';
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import MarketplaceAbi from "../utils/Marketplace.json";
import NFTAbi from "../utils/NFT.json";
import MarketplaceAddress from "../utils/MarketplaceAdd.json";
import NFTAddress from "../utils/NFTAdd.json";
import GridLoader from '../components/Loader/GridLoader';
import { TransactionContext } from '../context/TransactionContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from '../components/ui/NotFound';


/**
 * @title Index
 * @author - Adarsh
 * @component functional
 **/


const Explore = () => {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(false);
    // const [errMsg, setErrMsg] = useState("");
    //const [currentAccount, setCurrentAccount] = useState("");

    const { currentAccount, setCurrentAccount, setHasWallet } = useContext(TransactionContext);

    const buyErrorMsg = () => toast.error("Insufficient fund to buy this NFT");
    const wrongNetErrorMsg = () => toast.error("Use only Rinkeby Testnet", { theme: "colored" });

    const loadMarketplaceItems = async () => {

        try {

            if (typeof window.ethereum === "undefined") {
                setCurrentAccount("");
                setHasWallet(false);
                return;
            }

            const web3Modal = new Web3Modal({
                network: 'rinkeby',
                cacheProvider: true,
            })

            const web3ModalProvider = await web3Modal.connect();
            //const accounts = await web3ModalProvider.request({ method: 'eth_requestAccounts' });
            // const account = await accounts[0];
            const provider = new ethers.providers.Web3Provider(web3ModalProvider);
            const signer = provider.getSigner();

            const market_place = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer);

            const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);

            // Load all unsold items
            const itemCount = await market_place.itemCount();
            let items = []
            for (let i = 1; i <= itemCount; i++) {
                const item = await market_place.items(i)
                if (!item.sold) {
                    // get uri url from nft contract
                    const uri = await nft.tokenURI(item.tokenId)
                    // use uri to fetch the nft metadata stored on ipfs 
                    const response = await fetch(uri)
                    const metadata = await response.json()
                    // get total price of item (item price + fee)
                    const totalPrice = await market_place.getTotalPrice(item.itemId)
                    // Add item to items array
                    items.push({
                        totalPrice,
                        itemId: item.itemId,
                        seller: item.seller,
                        name: metadata.name,
                        description: metadata.description,
                        image: metadata.image
                    })
                }
            }
            console.log(items);
            setItems(items);
            setLoading(false);

        } catch (err) {
            alert("Please Use Rinkeby Testnet: " + err.message);
            wrongNetErrorMsg();
        }
    }

    const getDataFromRedis = async () => {
        try {
            
            setLoading(true);

            const response = await fetch('/api/nfts')
            const data = await response.json()

            console.log(data);
            // if Redis has no record than we get data from blockchain server else 
            // we get data from redis
            if(data.length=== 0) {
                loadMarketplaceItems();
            } else {
                setItems(data);
                setLoading(false);
            }
        } catch (error) {
            loadMarketplaceItems();
        }
        
    }

    useEffect(() => {

        // loadMarketplaceItems()

        // get NFT data from redis
        getDataFromRedis()
    }, [])

    const buyMarketItem = async (item) => {

        try {

            const web3Modal = new Web3Modal({
                network: 'rinkeby',
                cacheProvider: true,
            })

            const web3ModalProvider = await web3Modal.connect();

            const provider = new ethers.providers.Web3Provider(web3ModalProvider);
            const signer = provider.getSigner();

            const market_place = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer);

            //const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);

            await (await market_place.purchaseItem(item.itemId, { value: item.totalPrice })).wait()

            loadMarketplaceItems();

        } catch (err) {
            //setErrMsg("Insufficient fund to buy this NFT");
            buyErrorMsg();
            //console.log(error)
        }

    }



    if (!currentAccount) {
        return (
            <div>
                <NotFound status="401" name="Unauthenticated Route" description="Please Install Metamask to Sign in" />
            </div>
        )
    }

    return (
        <div>
            <h2 className='h2 max-w-[95%] m-auto md:px-2 px-2 my-4'>All Listed<span className='text-blue-500'> NFTs</span></h2>
            {loading === true ? (<GridLoader />) : (<NftGrid items={items} buyMarketItem={buyMarketItem} />)}
        </div>
    )
}



export default Explore;