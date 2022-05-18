import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

export const TransactionContext = React.createContext();

export const TransactionProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [hasWallet, setHasWallet] = useState(false);
    // const [connectMetamask, setConnectMetamask] = useState(false);

    let web3Modal;

    //checking wheather metamask is there are not
    //setting up metamsk true

    useEffect(() => {
        const checkIfWalletIsConnected = async () => {
            try {
                if (!typeof window.ethereum) {
                    return alert("please install metamask");
                } else {
                    setHasWallet(true);
                    web3Modal = new Web3Modal();
                    const web3ModalProvider = await web3Modal.connect();
                    const accounts = await web3ModalProvider.request({ method: 'eth_requestAccounts' });
                    const account = await accounts[0];
                    setCurrentAccount(account);
                }

            } catch (error) {
                console.log(error);
            }
        }

        checkIfWalletIsConnected();

    }, [currentAccount])


    //connection to the wallet
    const connectWallet = async () => {

        try {
            if (hasWallet) {
                web3Modal = new Web3Modal();
                const web3ModalProvider = await web3Modal.connect();
                const accounts = await web3ModalProvider.request({ method: 'eth_requestAccounts' });
                const account = await accounts[0];
                setCurrentAccount(account);
            } else {
                return alert("please install metamask");
            }

        } catch (err) {
            console.log(err)
        }

    }

    // const provider = new ethers.providers.Web3Provider(web3ModalProvider);
    // const signer = provider.getSigner();




    return (
        <TransactionContext.Provider value={{ currentAccount: currentAccount, connectWallet: connectWallet }}>
            {children}
        </TransactionContext.Provider>
    )
}