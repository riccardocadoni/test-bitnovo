import Web3 from "web3";
import { useState, useEffect } from "react";

declare global {
  interface Window {
    ethereum?: any;
  }
}
const useMetamask = (address: string, amount: number) => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTransactionStarted, setIsTransactionStarted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setIsMetamaskInstalled(true);
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
      checkIfWalletIsConnected(web3Instance);
    }
  }, []);

  const connectWallet = async () => {
    try {
      setIsLoading(true);
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
    } catch (error) {
      console.error("Error connecting to MetaMask", error);
      setError("Error al conectar con MetaMask.");
    } finally {
      setIsLoading(false);
    }
  };

  const checkIfWalletIsConnected = async (web3Instance: Web3) => {
    try {
      const accounts = await web3Instance.eth.getAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    } catch (error) {
      console.error("Error checking for connected MetaMask account", error);
      setError("Error al verificar la cuenta de MetaMask conectada.");
    }
  };

  const sendPayment = async () => {
    if (!web3 || !account) return;
    setIsLoading(true);
    try {
      const response = await web3.eth.sendTransaction({
        from: account,
        to: address,
        value: web3.utils.toWei(amount.toString(), "ether"),
      });
      console.log("Transaction:", response);
      setIsTransactionStarted(true);
    } catch (error) {
      console.error("Payment failed", error);
      setError("El pago ha fallado.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    connectWallet,
    sendPayment,
    account,
    isMetamaskInstalled,
    isLoading,
    isTransactionStarted,
    error,
  };
};

export default useMetamask;
