import React from 'react'
import NftCard from '../components/nft/NftGrid';
import NFT_DATA from "../dummyNFTs";

const index = ({ nfts }) => {
  return (
    <div>
      <NftCard nfts={nfts} />
    </div>
  )
}

export async function getStaticProps() {
  const nftsData = NFT_DATA || [];
  return {
    props: {
      nfts: nftsData
    }
  }
}


export default index