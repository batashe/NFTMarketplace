import { Client, Entity, Schema } from 'redis-om'

const client = new Client()

class NFT extends Entity {}
let nftSchema = new Schema(
    NFT,
    {
        name: { type: "string" },
        description: { type: "string" },
        image: { type: "string" },
        seller: { type: "string" },
        totalPrice: { type: "point" },
        itemId: { type: "point" },
    },
    {
        dataStructure: 'JSON',
    }
);

export async function getNFTs() {

    await client.open(process.env.REDIS_URL) // open the connection with redis

    const nftRepository = client.fetchRepository(nftSchema) // fetch the repository

    await nftRepository.createIndex(); // create index

    const nfts = await nftRepository.search().return.all(); // returning all the entries

    await client.close() // note - after every request, close the connection

    return nfts;
}


export async function createNFT(nft){
    console.log('Hit createNFT');
    await client.open(process.env.REDIS_URL)

    const nftRepository = client.fetchRepository(nftSchema)

    await nftRepository.createIndex();

    const nfts = await nftRepository.createAndSave(nft);

    await client.close() 

    return nfts;
}