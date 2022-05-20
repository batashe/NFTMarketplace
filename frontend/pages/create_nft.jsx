import React, { useState, useContext } from 'react';
import { ethers } from 'ethers';
import { create } from 'ipfs-http-client';
import { TransactionContext } from '../context/TransactionContext';

const client = create('https://ipfs.infura.io:5001/api/v0');


const create_nft = () => {

    const [image, setImage] = useState('');
    const [price, setPrice] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const { marketplace, NFT } = useContext(TransactionContext);

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

    //creating NFT
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
        const uri = `https://ipfs.infura.io/ipfs/${result.path}`
        // mint nft 
        await (await NFT.mint(uri)).wait()
        // get tokenId of new nft 
        const id = await NFT.tokenCount()
        // approve marketplace to spend nft
        await (await NFT.setApprovalForAll(marketplace.address, true)).wait()
        // add nft to marketplace
        const listingPrice = ethers.utils.parseEther(price.toString())
        await (await marketplace.makeItem(NFT.address, id, listingPrice)).wait()
    }

    return (
        <div className='flex flex-col justify-center h-screen'>
            <h2>Create NFT</h2>
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
                        Create NFT
                    </button>
                </div>
            </div>
        </div>
    )
}

export default create_nft;