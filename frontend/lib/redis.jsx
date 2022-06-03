import { createClient } from 'redis'
import { Client, Entity, Schema } from 'redis-om'

const client = new Client()

// async function connect() {
//     const redis = createClient(process.env.REDIS_URL)
//         await redis.connect()
//         const client = await new Client().use(redis)

//         return client;
// }

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

// export async function createNFT(data) {
//     await connect();

//     const repository = new Repository(nftSchema, client);

//     const nft = repository.createEntity(data);

//     const id = await repository.save(nft);
//     return id;
// }

export async function getNFTs() {

    // return "hello"

    await client.open(process.env.REDIS_URL)

    const nftRepository = client.fetchRepository(nftSchema)

    await nftRepository.createIndex();

    // const albums = await nftRepository.fetch();
    const albums = await nftRepository.search().return.all();

    console.log(albums)
    return albums;
}

