import React from 'react';
import NftCard from '../components/nft/NftGrid';
import NFT_DATA from "../helpers/dummyNFTs";

/**
 * @title Index
 * @author -
 * @component functional
 **/

const index = ({ nfts }) => {
  return (
    <div>
      <NftCard nfts={nfts} />
    </div>
  )
}

// Get Static Props
export async function getStaticProps() {
  const nftsData = NFT_DATA || [];
  return {
    props: {
      nfts: nftsData
    }
  }
}


export default index;