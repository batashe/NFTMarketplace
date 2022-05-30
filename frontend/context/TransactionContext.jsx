import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import MarketplaceAbi from "../utils/Marketplace.json";
// import NFTAbi from "../utils/NFT.json";
// import MarketplaceAddress from "../utils/MarketplaceAdd.json";
// import NFTAddress from "../utils/NFTAdd.json";

export const TransactionContext = React.createContext();

export const TransactionProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [hasWallet, setHasWallet] = useState(false);
    const [marketplace, setMarketplace] = useState({});
    const [NFT, setNFT] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const notifyInstallWallet = () => toast.warn("Please Install Metamask");

    let web3Modal;

    // checking wheather metamask is there are not
    // setting up metamsk 

    useEffect(() => {
        const checkIfWalletIsConnected = async () => {
            try {
                if (typeof window.ethereum === "undefined") {
                    alert("Please install metamask")
                    console.log("no metamask");
                    return;
                } else {
                    setHasWallet(true);
                    web3Modal = new Web3Modal();
                    const web3ModalProvider = await web3Modal.connect();
                    const accounts = await web3ModalProvider.request({ method: 'eth_requestAccounts' });
                    const account = await accounts[0];
                    setCurrentAccount(account);
                    const provider = new ethers.providers.Web3Provider(web3ModalProvider);
                    const signer = provider.getSigner();
                    // loadContracts(signer);
                }

            } catch (error) {
                console.log("User rejected metamask: " + error);
            }
        }
        checkIfWalletIsConnected();
    }, [])


    //connection to the wallet
    const connectWallet = async () => {
        try {
            if (hasWallet) {
                web3Modal = new Web3Modal();
                const web3ModalProvider = await web3Modal.connect();
                const accounts = await web3ModalProvider.request({ method: 'eth_requestAccounts' });
                const account = await accounts[0];
                setCurrentAccount(account);
                const provider = new ethers.providers.Web3Provider(web3ModalProvider);
                const signer = provider.getSigner();
                // loadContracts(signer);


            } else {
                notifyInstallWallet();
                console.log("no metamask");
            }


        } catch (err) {
            console.log("User rejected metamask:" + error);
        }

    }



    //loading NFT and NFTMarkeplace contract

    // const loadContracts = async (signer) => {
    //     const market_place = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer);
    //     setMarketplace(market_place);
    //     const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);
    //     setNFT(nft);
    // }


    return (
        <TransactionContext.Provider value={
            {
                currentAccount: currentAccount,
                connectWallet: connectWallet,
                marketplace: marketplace,
                NFT: NFT,
                loading: loading,
                setLoading: setLoading,
                error: error,
                setError: setError,
                hasWallet: hasWallet,
                setHasWallet: setHasWallet,
                setCurrentAccount: setCurrentAccount
            }
        }>
            {children}
        </TransactionContext.Provider>
    )
}