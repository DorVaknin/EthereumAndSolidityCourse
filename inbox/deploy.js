const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
const fs = require('fs');
const configData = JSON.parse(fs.readFileSync('account-data.json'));
const provider = new HDWalletProvider(
    configData.phrase,
    'https://rinkeby.infura.io/v3/5c12edf2fa794355b32ed81b7612aeed'
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there!']})
    .send({ gas: '100000', from: accounts[0] });

    console.log('Contract deployed to', result.options.address);
};

deploy();