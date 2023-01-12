import Web3 from "web3";

let web3;

const ethEnabled = async () => {
    if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
        // We are in the browser and metamask is running.
        web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        console.log(web3);
    } else {
        // We are on the server *OR* the user is not running metamask
        const provider = new Web3.providers.HttpProvider(process.env.REACT_APP_GOERLI_PROVIDER);
        web3 = new Web3(provider);
        console.log(web3);
    }
}

ethEnabled();
export default web3;
