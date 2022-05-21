import React, { useEffect, useState } from 'react';
import NftGrid from '../components/nft/NftGrid';
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import MarketplaceAbi from "../utils/Marketplace.json";
import NFTAbi from "../utils/NFT.json";
import MarketplaceAddress from "../utils/MarketplaceAdd.json";
import NFTAddress from "../utils/NFTAdd.json";


/**
 * @title Index
 * @author - Adarsh
 * @component functional
 **/


const index = () => {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadMarketplaceItems = async () => {

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
        setItems(items)
        setLoading(false)
    }

    useEffect(() => {
        loadMarketplaceItems()
    }, [])



    const buyMarketItem = async (item) => {

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

        //const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);

        await (await market_place.purchaseItem(item.itemId, { value: item.totalPrice })).wait()

        loadMarketplaceItems();
    }




    return (
        <div>
            {loading === true ? (<div>Loading...</div>) : (<NftGrid items={items} buyMarketItem={buyMarketItem} />)}
        </div>
    )
}



export default index;