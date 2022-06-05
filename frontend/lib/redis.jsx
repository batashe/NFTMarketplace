import { Client, Entity, Schema } from 'redis-om'

const client = new Client()

class NFT extends Entity {}
let nftSchema = new Schema(
    NFT,
    {
        name: { type: "string" },
        description: { type: "string" },
        images: { type: "string" },
        price: { type: "number" },
        sender: { type: "string" },
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

