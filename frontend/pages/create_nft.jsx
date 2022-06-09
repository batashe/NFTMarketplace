import React, { useState, useContext } from 'react';
import { ethers } from 'ethers';
import { create } from 'ipfs-http-client';
import Web3Modal from "web3modal";
import MarketplaceAbi from "../utils/Marketplace.json";
import NFTAbi from "../utils/NFT.json";
import MarketplaceAddress from "../utils/MarketplaceAdd.json";
import NFTAddress from "../utils/NFTAdd.json";
import { BsImageAlt } from "react-icons/bs";
import { useRouter } from 'next/router';
import { TransactionContext } from '../context/TransactionContext';
import NotFound from '../components/ui/NotFound';


const client = create('https://ipfs.infura.io:5001/api/v0');


const CreateNFT = () => {

    const inputClass = "mt-2 border rounded p-4 required dark:bg-[#474747] dark:border-0 focus:outline-none focus:bg-gray-100 dark:focus:bg-[#292929]";

    const [image, setImage] = useState('');
    const [price, setPrice] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    //const [priceError, setPriceError] = useState(false);
    const router = useRouter();

    const { currentAccount } = useContext(TransactionContext);

    //check vallid value of price of NFT


    //upload to ipfs
    const uploadToIPFS = async (event) => {
        event.preventDefault()
        const file = event.target.files[0]
        if (typeof file !== 'undefined') {
            try {
                const result = await client.add(file)
                console.log(result)
                setImage(`https://ipfs.infura.io/ipfs/${result.path}`)
            } catch (error) {
                console.log("ipfs image upload error: ", error)
            }
        }
    }

    //creating nft
    const createNFT = async (e) => {
        e.preventDefault();
        if (!image || !price || !name || !description) return
        try {
            const result = await client.add(JSON.stringify({ image, price, name, description }))
            // mintThenList(result)
            // console.log(result)
            // call api to create nft in backend

            const resp = await fetch('/api/nfts',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'image': image,
                    'price': parseFloat(price),
                    'name': name,
                    'totalPrice': parseFloat(price),
                    'seller': currentAccount,
                    'description': description,
                    'isFavourite'   : false
            })});
            console.log(resp);
        } catch (error) {
            console.log("ipfs uri upload error: ", error)
        }
    }

    const mintThenList = async (result) => {

        try {

            setLoading(true);

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

            const uri = `https://ipfs.infura.io/ipfs/${result.path}`
            // mint nft 
            await (await nft.mint(uri)).wait()
            // get tokenId of new nft 
            const id = await nft.tokenCount()
            // approve market_place to spend nft
            await (await nft.setApprovalForAll(market_place.address, true)).wait()
            // add nft to market_place
            const listingPrice = ethers.utils.parseEther(price.toString())
            await (await market_place.makeItem(nft.address, id, listingPrice)).wait()

            setLoading(false);

            router.push('/explore');

        } catch (error) {

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
        <div className='flex flex-col md:items-center'>
            <div className="flex flex-col md:w-1/2 gap-4 mt-4 mb-8 md:p-2 px-4">
                <h2 className='md:h1 my-4 h2 '>Create New <span className='text-blue-500'>NFT</span> Item</h2>
                {
                    image ? (
                        <img className="rounded-lg mt-4" width="300" height="300" src={image} />
                    ) : (<p className=' w-[300px] rounded-lg dark:bg-[#474747] bg-[#f1f1f4] flex items-center justify-center p-10 animate-pulse'><BsImageAlt fontSize={200} fill="#222" /></p>)
                }
                <form>
                    <input
                        type="file"
                        name="file"
                        className="file:cursor-pointer block w-full text-sm text-slate-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-violet-50 file:text-blue-500
                            hover:file:bg-violet-100"
                        onChange={uploadToIPFS}
                    />
                </form>
                <input
                    placeholder="NFT Name"
                    className={inputClass}
                    onChange={(e) => setName(e.target.value)}
                />
                <textarea
                    placeholder="NFT Description"
                    className={inputClass}
                    onChange={(e) => setDescription(e.target.value)}

                />
                <input
                    placeholder="NFT Price in Ether"
                    className={inputClass}
                    onChange={(e) => setPrice(e.target.value)}
                    step="0.001"
                    type="number"
                    min="0.001"
                />
                {price < 0  ? <p className='text-[14px] font-normal text-red-500'>*price cannot be negative</p> : ""}
                {loading === true ? (<button className="font-bold mt-4 bg-gradient-to-r from-blue-500 via-[#00ffff] to-green-400 text-gray-800 rounded p-4 shadow-lg disabled animate-pulse">Processing Transaction....</button>) : (<button className="font-bold mt-4 bg-blue-500 text-white rounded p-4 shadow-lg" onClick={createNFT}>
                    Create nft
                </button>)}

            </div>
        </div>
    )
}

export default CreateNFT;