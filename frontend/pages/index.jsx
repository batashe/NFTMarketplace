import React from 'react';
import NftCard from '../components/nft/NftGrid';
import NFT_DATA from "../helpers/dummyNFTs";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

/**
 * @title Index
 * @author -
 * @component functional
 **/


const index = ({ nfts }) => {
  return (
    <div>
      <NftCard nfts={NFT_DATA} />
    </div>
  )
}

// Get Static Props
// export async function getStaticProps() {
//   const nftsData = NFT_DATA || [];
//   return {
//     props: {
//       nfts: nftsData
//     }
//   }
// }


export default index;