import { Avatar, Button, Card, message } from "antd";
import { ethers } from "ethers";
import makeBlockie from 'ethereum-blockies-base64';
import { useState } from "react";
import { getExecutableContract } from "../utils/helpers";
import { useEffect } from "react";
import {useAccount} from "wagmi";
const ValidateButton = ({deliverableIndex, proxy}) => {
    const [loading, setLoading] = useState(false);
    const [hasVoted, setHasVoted] = useState(false);
    const {address} = useAccount();

    const handleValidate = async () => {
        try {
            setLoading(true);
            const contract = getExecutableContract(proxy);

            const txn = await contract.vote(1);

            await txn.wait();
        } catch (error) {
            message.error(error.message);
        }
        finally{
            setLoading(false);
        }

    }

    const checkHasVoted = async () => {
        const contract = getExecutableContract(proxy);

        const results = await contract.hasVoted(address, deliverableIndex);

        setHasVoted(results);
    }

    useEffect(() => {
        if(!deliverableIndex) return;
        checkHasVoted(deliverableIndex)
    }, [deliverableIndex]);
    return (
        <Button disable={hasVoted} loading={loading} onClick={handleValidate}>Validate</Button>
    )
}

export default function ValidationCard({ id = "", proxy, deliverableIndex, deliverable = {} }) {
    return (
        <Card>
            <Card
                style={{ width: 300 }}
                cover={
                    <img
                        alt="example"
                        src={makeBlockie(ethers.utils.hashMessage(JSON.stringify(proxy)))}
                    />
                }
                actions={[
                    <ValidateButton proxy={proxy} deliverableIndex={deliverableIndex}/>
                ]}
            >
                <Card.Meta
                    avatar={<Avatar src={makeBlockie(ethers.utils.hashMessage(JSON.stringify(id)))} />}
                    title={deliverable?.title}
                    description={deliverable?.description?.substr(0, 30)}
                />
            </Card>
        </Card>
    )
}