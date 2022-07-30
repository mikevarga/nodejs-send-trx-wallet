/*
    Script to send money from Trx (tron) wallet to another
*/

const TronWeb = require('tronweb');
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider('https://api.trongrid.io');
const solidityNode = new HttpProvider('https://api.trongrid.io');
const eventServer = 'https://api.trongrid.io';
require('dotenv').config();

const privateKey = "614b035569c9f7b03396d64c7e44022759b404ee28f26fc0c47e7ced852767a2"; //PK of sending account
const toAddress = "";
const fromAddress = "";

const tronWeb = new TronWeb(
    fullNode,
    solidityNode,
    eventServer
);
const getBalance = async (address) => {
    const balance = await tronWeb.trx.getBalance(address);
    return balance;
}

const sendMoney = async (amount) => {
    console.log(`--- Sending money`);
    console.log(toAddress, fromAddress)
    try{
        tradeobj = await tronWeb.transactionBuilder.sendTrx(
            toAddress,
            amount,
            fromAddress
        );
        const sign = await tronWeb.trx.sign(tradeobj, privateKey, 2);
        //console.log(signedTx);
        var broastTx = await tronWeb.trx.sendRawTransaction(sign);
        if (broastTx.result){
            console.log(`+++ Successfully sent ${amount} SUN to ${toAddress}`);
        }        
    }catch(e){
        //console.log(e)
    }
}
