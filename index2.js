//using etherjs

const ethers = require('ethers');
const contract = require("./abi.json");
require('dotenv').config();
// const pubkey =`0x65AE85Dfa2b6be89F0e31E171A99b2F5981B4d58`

const alchemyProvider = new ethers.providers.JsonRpcProvider(process.env.JSON_RPC);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, alchemyProvider);
const uniteaContract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contract.abi, signer);

async function main(){
    let info = await uniteaContract.getTokenInfo(2);
    console.log("The info is: " + info);
}
main()