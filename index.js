//using web3js

const Web3 = require('web3');
var Contract = require('web3-eth-contract');
const contract = require("./abi.json");
require('dotenv').config();
// const pubkey =`0x65AE85Dfa2b6be89F0e31E171A99b2F5981B4d58`

Contract.setProvider(process.env.JSON_RPC);
const myContract = new Contract(contract.abi, process.env.CONTRACT_ADDRESS);

async function main(){
    const tx = await myContract.methods.getTokenInfo(2).call();
    console.log('tx', tx);
}
main()