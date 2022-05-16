import React from 'react'
import NftCard from '../components/nft/NftCard';
import Nfts from "../dummyNFTs";

const index = ({ nfts }) => {
  return (
    <div>
      <NftCard nfts={nfts} />
    </div>
  )
}

export async function getStaticProps() {
  const nftsData = Nfts || [];
  return {
    props: {
      nfts: nftsData
    }
  }
}


export default index