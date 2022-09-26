/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */

const { ethers } = require("ethers");
const axios = require("axios");
const ExecutableAgreementABI = require("./ExecutableAgreement.json");
// wallets and configurations

const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY);

const provider = new ethers.providers.AlchemyProvider("maticmum",process.env.PROVIDER_KEY)

const signer = wallet.connect(provider);

module.exports = (app) => {
  // Your code here
  app.log.info("Yay, the app was loaded!");
  // vote("0x45ac5efb6d68e1056ceaf20cd756c86b01463ebe", 0).then(res => console.log(res));
  
  app.on("issues.closed", async (context) => {
    console.log(context.payload.issue.number)
    console.log(context.payload.issue.title)
    console.log(context.payload.issue.state_reason)
    
    if(context.payload.issue.state_reason !== "completed"){
      return;
    }
    const validations = await getValidatorsOf(signer.address);
    for(let validation of validations){
      if(validation?.deliverable?.title.toLowerCase() === context.payload.issue.title.toLowerCase()){
        const txn = await vote(validation.proxy, validation.deliverableIndex);
        await txn.wait();
      }
    }
  });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
async function subgraphQuery(url, query) {
  try {
      // Replace YOUR-SUBGRAPH-URL with the url of your subgraph
      const response = await axios.post(url, {
          query,
      });
      if (response.data.errors) {
          console.error(response.data.errors);
          throw new Error(`Error making subgraph query ${response.data.errors}`);
      }
      return response.data.data;
  } catch (error) {
      console.error(error);
      throw new Error(`Could not query the subgraph ${error.message}`);
  }
}

const getValidatorsOf = async (address) => {
  try {
    //query data from the graph
    const response = await subgraphQuery(process.env.EA_GRAPH_URL, `query{ 
          validators(first: 100, where: {address: "${address}", hasVoted: false}) {
              id
              proxy
              address
              deliverableIndex
              deliverable{
                  title
              }
            }
          
      }`);

    return response?.validators

  } catch (error) {
    console.log(error);
  }
};

async function vote(proxy, deliverableIndex) {
  const YES = 1;
  const contract = new ethers.Contract(proxy, ExecutableAgreementABI.abi, provider);
  const contractWithSigner = contract.connect(signer);

  const txn = await contractWithSigner.vote(deliverableIndex, YES);
  await txn.wait()
}