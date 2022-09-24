import { createContext, useContext, useState } from "react";

export const AgreementFormContext = createContext([]);


export function AgreementFormProvider({ children }) {
    const [infoDataFields, setInfoDataFields] = useState([]);
    const [clauseDataFields, setClauseDataFields] = useState([]);
    const [tokenDataFields, setTokenDataFields] = useState([]);
    const [deliverableDataFields, setDeliverableDataFields] = useState([]);
    const [validatorsDataFields, setValidatorsDataFields] = useState([]);


    return (
        <AgreementFormContext.Provider value={{
            infoDataFields,
            setInfoDataFields,
            clauseDataFields,
            setClauseDataFields,
            deliverableDataFields,
            setDeliverableDataFields,
            validatorsDataFields,
            setValidatorsDataFields,
            tokenDataFields,
            setTokenDataFields
        }}>
            {children}
        </AgreementFormContext.Provider>
    )
}

export function useAgreement() {
    return Object.freeze({
        ...useContext(AgreementFormContext)
    });
}