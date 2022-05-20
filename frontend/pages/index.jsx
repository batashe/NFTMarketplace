import React, { useContext, useEffect, useState } from 'react';
import NftGrid from '../components/nft/NftGrid';
import NFT_DATA from "../helpers/dummyNFTs";
import { TransactionContext } from '../context/TransactionContext';

/**
 * @title Index
 * @author -
 * @component functional
 **/


const index = () => {

  const { NFT, marketplace, loading, setLoading, currentAccount } = useContext(TransactionContext);

  const [items, setItems] = useState([]);


  // useEffect(() => {
  //   setLoading(true);
  //   loadMarketplaceItems()
  //   setLoading(false);
  // }, [])


  const loadMarketplaceItems = async () => {
    // Load all unsold items
    const itemCount = await marketplace.itemCount();
    let items = []
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i)
      if (!item.sold) {
        // get uri url from nft contract
        const uri = await NFT.tokenURI(item.tokenId)
        // use uri to fetch the nft metadata stored on ipfs 
        const response = await fetch(uri)
        const metadata = await response.json()
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(item.itemId)
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
  }


  const buyMarketItem = async (item) => {
    await (await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })).wait()
    loadMarketplaceItems();
  }


  // => This code will work but dom will update continously

  // if (currentAccount) {
  //   // console.log(currentAccount)
  //   try {
  //     loadMarketplaceItems();
  //   } catch (error) {
  //     console.log(error)
  //   }

  // } else {
  //   console.log("please login")
  // }


  return (
    <div>
      {loading === true ? (<div>Loading...</div>) : (<NftGrid items={items} buyMarketItem={buyMarketItem} />)}
      <button onClick={loadMarketplaceItems}>Load</button>
    </div>
  )
}


// export async function getStaticProps() {

//   return {
//     props: {
//       nfts: nftsData
//     }
//   }
// }


export default index;