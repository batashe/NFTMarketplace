# NFTMarketplace
A non-fungible token (NFT) is a financial security consisting of digital data stored in a blockchain, a form of distributed ledger. The ownership of an NFT is recorded in the blockchain, and can be transferred by the owner, allowing NFTs to be sold and traded. NFTs typically contain references to digital files such as photos, videos, and audio.  And we are here to sell NFT, this is our college minor project also

# SET UP HARDHAT DEVELOPMENT ENVIRONMENT

## Install dependencies

Do all this in root folder only (Do not do aything inside fronted folder)

``` npm install ```

## For deploying smart contract in localhost

``` npx hardhat node ```

```npx hardhat run scripts/deploy.js --network localhost```

New folders are created

* artifacts
* cache

## For running hardhat test cases

``` npx hardhat test```

## OUTPUT

***

- NFTMarketplace
    - Deployment
      * ✔ Should track name and symbol of the nft collection (63ms)
      * ✔ Should track feeAccount and feePercent of the marketplace
    - Minting NFTs
      * ✔ Should track each minted NFT (170ms)
    - Making marketplace items
      * ✔ Should track newly created item, transfer NFT from seller to marketplace and emit Offered event (120ms)
      * ✔ Should fail if price is set to zero (52ms)
    - Purchasing marketplace items
      * ✔ Should update item as sold, pay seller, transfer NFT to buyer, charge fees and emit a Bought event (124ms)
      * ✔ Should fail for invalid item ids, sold items and when not enough ether is paid (149ms)


  _7 passing (4s)

***

