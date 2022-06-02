import { Client, Entity, Schema, Repository } from 'redis-om';

const client = new Client();

async function connect() {
    if(!client.isOpen()) {
        await client.open(process.env.REDIS_URL);
    }
}

class NFT extends Entity {}
let schema = new Schema(
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

export async function createNFT(data) {
    await connect();

    const repository = new Repository(schema, client);

    const nft = repository.createEntity(data);

    const id = await repository.save(nft);
    return id;
}

