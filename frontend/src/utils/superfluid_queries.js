
import axios from "axios";

export async function subgraphQuery(url, query) {
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

//query creators from narteysarso/genrez-celo graph
export const getStreamingDataBTWSenderRecipient = async (sender, recipient) => {
    try {
        //if `searchkey` is not empty surround it with `''` to handle spaces
        //if not ignore
        // const tokenSymbol = "fDAIx"
        // const sender = "0x440e65EAAb7A23be8b1a61108643B2cff2E5A967"
        // const recipient = "0xd8101E537Ba2368ddB14f039098EF13C0703e5D2"
        
        //query data from the graph
        const response = await subgraphQuery(process.env.REACT_APP_SUPERFLUID_GRAPH_URL, `query{ 
            flowUpdatedEvents(where:{sender: "${sender}", receiver: "${recipient}"}) {
                oldFlowRate
                flowRate
                userData	
                stream {
                    token {
                        symbol
                    }
                    createdAtTimestamp
                    updatedAtTimestamp
                    currentFlowRate
                    streamedUntilUpdatedAt
                    sender {
                        id
                    }
                    receiver {
                        id
                    }
                }	
         }
            
        }`);
        return response?.flowUpdatedEvents;
        
    } catch (error) {
        console.log(error);
    }
};
//query creators from narteysarso/genrez-celo graph
export const getCreatedExecutableAgreements = async (issuer) => {
    try {
        //query data from the graph
        const response = await subgraphQuery(process.env.REACT_APP_EA_GRAPH_URL,`query{ 
            executableAgreements(first: 10, where:{issuer: "${issuer}"}) {
                id
                proxy
                offerType
                duration
                contractSum
                targetToken
                issuer
                assenter
                position
                contractTokenURI
                name
                title
                symbol
                description
                location
                status
              }
            
        }`);

        return response?.executableAgreements

    } catch (error) {
        console.log(error);
    }
};
//query creators from narteysarso/genrez-celo graph
export const getCreatedExecutableAgreementsByTitle = async (issuer, title) => {
    try {
        //query data from the graph
        const response = await subgraphQuery(process.env.REACT_APP_EA_GRAPH_URL,`query{ 
            executableAgreements(first: 10, where:{issuer: "${issuer}", title_contains_nocase: "${title}"}) {
                id
                proxy
                offerType
                duration
                contractSum
                targetToken
                issuer
                assenter
                position
                contractTokenURI
                name
                title
                symbol
                description
                location
                status
              }
            
        }`);

        return response?.executableAgreements

    } catch (error) {
        console.log(error);
    }
};

//query creators from narteysarso/genrez-celo graph
export const getAssenterExecutableAgreements = async (signer) => {
    try {
        
        //query data from the graph
        const response = await subgraphQuery(process.env.REACT_APP_EA_GRAPH_URL,`query{ 
            executableAgreements(first: 10, where:{assenter: "${signer}"}) {
                id
                proxy
                offerType
                duration
                contractSum
                targetToken
                issuer
                assenter
                position
                contractTokenURI
                name
                title
                symbol
                description
                location
                status
              }
            
        }`);

        return response?.executableAgreements;

    } catch (error) {
        console.log(error);
    }
};
//query creators from narteysarso/genrez-celo graph
export const getAssenterExecutableAgreementsByTitle = async (signer, title) => {
    try {
        
        //query data from the graph
        const response = await subgraphQuery(process.env.REACT_APP_EA_GRAPH_URL,`query{ 
            executableAgreements(first: 10, where:{assenter: "${signer}", title_contains_nocase: "${title}"}) {
                id
                proxy
                offerType
                duration
                contractSum
                targetToken
                issuer
                assenter
                position
                contractTokenURI
                name
                title
                symbol
                description
                location
                status
              }
            
        }`);

        return response?.executableAgreements;

    } catch (error) {
        console.log(error);
    }
};

export const getExecutableAgreementsById = async (id) => {
    try {
        
        //query data from the graph
        const response = await subgraphQuery(process.env.REACT_APP_EA_GRAPH_URL,`query{ 
            executableAgreements(first: 10, where:{id: "${id}"}) {
                id
                proxy
                offerType
                duration
                contractSum
                targetToken
                issuer
                assenter
                position
                contractTokenURI
                name
                title
                symbol
                description
                location
                status
              }
            
        }`);

        return response?.executableAgreements;

    } catch (error) {
        console.log(error);
    }
};

