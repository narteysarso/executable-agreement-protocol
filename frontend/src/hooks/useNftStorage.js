import { NFTStorage } from 'nft.storage'
import makeBlockie from 'ethereum-blockies-base64';
import { ethers } from 'ethers';
import dataURItoBlob from '../utils/dataToBlob';

export default function  useNFTStroage(){

    const client = new NFTStorage({ token: process.env.REACT_APP_API_KEY });

     async function store(data = {}) {
        const {name, description, ...rest} = data;
        
        const nft = {
            image: dataURItoBlob(makeBlockie(ethers.utils.hashMessage(JSON.stringify(data)))),
            name,
            description,
            properties: {
                ...rest
            }
        }

    
        const metadata = await client.store(nft);

        return metadata;
    }
    
    return Object.freeze({
        store
    })
}
