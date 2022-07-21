const Web3 = require('web3');
var Accounts = require('web3-eth-accounts');
var Contract = require('web3-eth-contract');
const contract = require("./abi.json");
require('dotenv').config();
const pubkey =`0x65AE85Dfa2b6be89F0e31E171A99b2F5981B4d58`

const web3 = new Web3(process.env.JSON_RPC);
const myContract = new web3.eth.Contract(contract.abi, process.env.CONTRACT_ADDRESS);
web3.eth.accounts.wallet.add(`0x${process.env.PRIVATE_KEY}`);
async function main(){

    var requiredGas = await myContract.methods.createToken("testweb3js","TST", "web3js.com").estimateGas({from: pubkey});
    console.log(requiredGas);
    
    var rawTransaction = {
        from: pubkey,
        gas: 200000,
    };


    console.log('loading')
    const tx = await myContract.methods.
        createToken("testweb3js","TST", "web3js.com").
        send(rawTransaction);
    console.log('done')
    console.log('tx',tx)
}
main()
