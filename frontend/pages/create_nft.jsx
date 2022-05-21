import React, { useState} from 'react';
import { ethers } from 'ethers';
import { create } from 'ipfs-http-client';
import Web3Modal from "web3modal";
import MarketplaceAbi from "../utils/Marketplace.json";
import NFTAbi from "../utils/nft.json";
import MarketplaceAddress from "../utils/MarketplaceAdd.json";
import NFTAddress from "../utils/NFTAdd.json";

const client = create('https://ipfs.infura.io:5001/api/v0');


const create_nft = () => {

    const [image, setImage] = useState('');
    const [price, setPrice] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

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
            mintThenList(result)
        } catch (error) {
            console.log("ipfs uri upload error: ", error)
        }
    }

    const mintThenList = async (result) => {

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
    }

    return (
        <div className='flex flex-col justify-center h-screen'>
            <h2>Create nft</h2>
            <div>
                <div className="w-1/2 flex flex-col pb-12">
                    <input
                        placeholder="Asset Name"
                        className="mt-8 border rounded p-4"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <textarea
                        placeholder="Asset Description"
                        className="mt-2 border rounded p-4"
                        onChange={(e) => setDescription(e.target.value)}

                    />
                    <input
                        placeholder="Asset Price in Eth"
                        className="mt-2 border rounded p-4"
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <form>
                        <input
                            type="file"
                            name="file"
                            className="my-4 cursor-pointer"
                            onChange={uploadToIPFS}
                        />
                    </form>

                    <button className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg" onClick={createNFT}>
                        Create nft
                    </button>
                </div>
            </div>
        </div>
    )
}

export default create_nft;