import { createNFT } from "../../lib/redis";

export default async function handler(req, res) {
    const id = await createNFT(req.body);

    res.status(200).json({ id });
}