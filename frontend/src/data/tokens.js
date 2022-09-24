import { chain } from "wagmi";

export const PAYMENT_TOKENS = {
    [chain.polygonMumbai.id]: {
        "MATICx": "0x96B82B65ACF7072eFEb00502F45757F254c2a0D4",
        "fDAIx": "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f",
        "fUSDCx": "0x42bb40bF79730451B11f6De1CbA222F17b87Afd7",
        "fUSDx": "0x918E0d5C96cAC79674E2D38066651212be3C9C48"
    },
    [chain.polygon.id]: {},
    [chain.mainnet.id]: {}
}

export const TOKEN_SYMBOL = {
    [chain.polygonMumbai.id]: {
        "0x96B82B65ACF7072eFEb00502F45757F254c2a0D4": "MATICx",
        "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f": "fDAIx",
        "0x42bb40bF79730451B11f6De1CbA222F17b87Afd7": "fUSDCx",
        "0x918E0d5C96cAC79674E2D38066651212be3C9C48": "fUSDx"
    },
    [chain.polygon.id]: {},
    [chain.mainnet.id]: {}
}


export const CHAIN_TOKENS = {
    [chain.polygonMumbai.id]: {
        "MATIC": "0x96B82B65ACF7072eFEb00502F45757F254c2a0D4",
        "fDAI": "0x15F0Ca26781C3852f8166eD2ebce5D18265cceb7",
        "fUSDC": "0xbe49ac1EadAc65dccf204D4Df81d650B50122aB2"
    },
    [chain.polygon.id]: {},
    [chain.mainnet.id]: {}
}
