import { Avatar, Button, Col, List, message, Row, Skeleton, Typography } from "antd";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { getExecutableAgreementsById, getStreamingDataBTWSenderRecipient } from "../../utils/superfluid_queries";
import Page404 from "../errors/404";
import { chainId, useAccount } from "wagmi";
import { TOKEN_SYMBOL } from "../../data/tokens";
import { OFFERTYPES } from "../../data";
import { getExecutableContract, getSigningManagerContract, weiToEth } from "../../utils/helpers";

function SuperFluidList({ issuer, assenter, targetToken }) {
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState([]);
    const [funds, setFunds] = useState([]);
    const [streamedAmount, setStreamedAmount] = useState(0);

    useEffect(() => {
        (async () => {
            if (!issuer || !assenter) return;
            const results = await getStreamingDataBTWSenderRecipient(issuer, assenter);

            setFunds(results);
        })();
    }, [issuer, assenter, targetToken]);

    useEffect(() => {
        if (!funds.length) return;
        const item = funds[0];
        const timer = setInterval(() => {
            const amount = item.stream.streamedUntilUpdatedAt + ((Date.now() / 1000) - parseInt(item.stream.updatedAtTimestamp)) * item.flowRate / 10 ** 18;
            setStreamedAmount(amount)
        }, 100)

        return () => clearInterval(timer)
    }, [funds]);
    return (
        <List
            className="demo-loadmore-list"
            loading={loading}
            itemLayout="horizontal"
            dataSource={funds}
            header={<div>Funds Information</div>}
            renderItem={item => (
                <List.Item
                >
                    <Skeleton avatar title={false} loading={item.loading} active>
                        <List.Item.Meta
                            avatar={<Avatar src={item.stream.token.symbol} />}
                            title={"Agreement Funds Stream"}
                            description={
                                <Row>
                                    <Col span={24}>Flow Rate: {item.flowRate}</Col>
                                    <Col span={24}>Total steamed: <b>{streamedAmount}</b></Col>
                                </Row>
                            }
                        />
                    </Skeleton>
                </List.Item>
            )}
        />
    )
}

const filterExecutors = (executorAddress) => {
    return (executorAddress === "0x0000000000000000000000000000000000000001") ? "SuperFluid" : executorAddress
}

const SignAgreement = ({ proxyAddress }) => {
    const [hasSigned, setHasSigned] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const { address } = useAccount();


    const handleSignAgreement = async () => {
        try {
            setLoading(true);
            const executableContract = getExecutableContract(proxyAddress);
            const signingManagerAddress = await executableContract.agreementSigningManager();

            const signingManagerContract = await getSigningManagerContract(signingManagerAddress);

            const txn = await signingManagerContract.signAgreement();

            await txn.wait();
            await checkHasSigned(address);
        } catch (error) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    const checkHasSigned = async (address) => {
        const contract = getExecutableContract(proxyAddress);

        const [hasSigned, isSigner] = await Promise.all([contract.hasSigned(address), contract.isSigner(address)]);

        if (!isSigner) {
            return setDisabled(true);
        }

        setHasSigned(hasSigned);
    }

    useEffect(() => {
        (async () => {
            await checkHasSigned(address);
        })()
    }, [address]);

    return (
        <Button disabled={hasSigned || disabled} onClick={handleSignAgreement} loading={loading}>Sign Agreement</Button>
    )
}

export default function AgreementDetail() {
    const [agreement, setAgreement] = useState(null);
    const [agreementContent, setAgreementContent] = useState(null);

    const location = useLocation();

    const id = location.pathname.split("/")[3];

    const formatClauses = (clausesArr) => {
        return clausesArr.reduce((acc, cur) => {
            return `${acc} \r\r - ${cur.clause}`;
        }, "");
    }

    const formatValidators = (validators, index) => {

        if (!Array.isArray(validators[index])) {
            return `- ${validators[index]._address}`
        }
        return validators[index].reduce((acc, cur) => {
            return `${acc} - ${cur._address}`
        }, "")
    }

    const formatExecutors = (executors, index) => {

        if (!Array.isArray(executors[index])) {

            return `- ${filterExecutors(executors[index]._address)}`
        }
        return executors[index].reduce((acc, cur) => {
            return `${acc} - ${filterExecutors(cur._address)}`
        }, "")
    }
    const formatDeliverables = (deliverables, executors, validators) => {
        return deliverables.reduce((acc, cur, idx) => {
            return `${acc} - ### ${cur.title} \r\r \t ${cur.description} \r\r 
\t - **Payout Amount** ${weiToEth(cur.payoutAmount)} \r\r \t - **Payout Time**: ${cur.totalSeconds} \r\r 
\t - **Validators** \r\r \t\t ${formatValidators(validators, idx)} \r\r \t - **Executors** \r\r \t\t ${formatExecutors(executors, idx)}`
        }, "");
    }

    useEffect(() => {
        (async () => {
            if (!id) return;
            const results = await getExecutableAgreementsById(id);

            //load from IPFS
            const cid = results[0].contractTokenURI?.split("//")[1];
            const metadata = await axios.get(`https://nftstorage.link/ipfs/${cid}`);
            setAgreementContent(metadata.data);
            setAgreement(results[0]);
        })();
    }, [id]);

    if (!id || !agreementContent) {
        return <Page404 />
    }

    // return;
    return (
        <Row gutter={[8, 16]}>
            <Col flex={2}>
                <div style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", padding: "1vh 2vw", justifyContent: "space-between" }}>
                    <Typography.Title level={3}>Agreement</Typography.Title>
                    <SignAgreement proxyAddress={agreement.proxy} />
                </div>
                <ReactMarkdown >
                    {`## ${agreementContent?.properties.title}  \r\r ${agreementContent?.description} \r\r 
**OfferType**: ${OFFERTYPES[agreementContent?.properties.offerType]} \r ### Parties \r - Employer Party Address: ${agreementContent?.properties.issuer} \r 
- Assent Party Address: ${agreementContent?.properties.assenter} \r\r **Duration**: ${agreementContent?.properties.duration} \r\r 
**Location**: ${agreementContent?.properties.location} \r\r **Position**: ${agreementContent?.properties.position} 
\r\r **Contract Sum**: ${weiToEth(agreementContent?.properties.contractSum || 0)} \r\r
**Payment Token**: ${TOKEN_SYMBOL[chainId.polygonMumbai][agreementContent?.properties.targetToken]} \r\r ## Clauses \r\r ${formatClauses(agreementContent?.properties.clauses.clauses)} \r\r 
### Deliverables \r\r ${formatDeliverables(agreementContent?.properties.deliverables, agreementContent?.properties.executors, agreementContent?.properties.validators)}`}
                </ReactMarkdown>
            </Col>
            <Col flex={1}>
                <SuperFluidList {...agreement} />
            </Col>
        </Row>
    )
}
