const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
const compiledFactory = require('./build/CampaignFactory.json');

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

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();
//deploy address 0x3734A41ABE1Cccbb4519FE361E7C5cE0dfE879f8