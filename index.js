const Web3 = require('web3');
const axios = require("axios");
const contract = require("./abi.json");
require('dotenv').config();
const pubkey =`0x65AE85Dfa2b6be89F0e31E171A99b2F5981B4d58`

const web3 = new Web3(process.env.JSON_RPC);
const myContract = new web3.eth.Contract(contract.abi, process.env.CONTRACT_ADDRESS);
web3.eth.accounts.wallet.add(`0x${process.env.PRIVATE_KEY}`);

const mainnet = "https://gasstation-mumbai.matic.today/v2"

    async function main(){
        
        const gasAmount = await myContract.methods.createToken("testweb3js","TST", "web3js.com").estimateGas({ from: pubkey });

        const res = await axios('https://gasstation-mumbai.matic.today/v2')
        console.log('ress', gasAmount, res?.data) 
        
        const rawTransaction = {
            from: pubkey,
            gas: gasAmount,
            gasPrice: web3.utils.toWei(
                String(Math.ceil(res?.data?.fast?.maxPriorityFee)), // converts Number to BN, which is accepted by `toWei()`
                'Gwei'
            )
        };        
        console.log('loading')
        const start = new Date().getTime();
        const tx = await myContract.methods.
            createToken("working","WRK", "web3js.com").
            send(rawTransaction);
        const end = new Date().getTime();
        const time = end - start;
        console.log('done')
        console.log('tx',tx)
}

main()
