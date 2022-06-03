import { createNFT, getNFTs } from "../../lib/redis";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const response = await getNFTs();
        res.status(200).json(response)
    } else if (req.method === 'POST') { 
        const id = await createNFT(req.body);
        res.status(200).json({ id });
    }
}