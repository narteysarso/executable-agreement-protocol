import { Col, Input, message, Row, Typography } from "antd";


import { useEffect, useState } from "react";
import { useAccount } from "wagmi"
import { getCreatedExecutableAgreements, getCreatedExecutableAgreementsByTitle } from "../../utils/superfluid_queries";
import Page404 from "../errors/404";
import AgreementCard from "../../components/AgreementCard";

export default function Created() {
    const { address } = useAccount();
    const [agreements, setAgreements] = useState([]);
    const [searching, setSearching] = useState(false);

    const handleSearchAgreement = async (title = "") => {
        try {
            setSearching(true);
            if (!title) return;
            const results = await getCreatedExecutableAgreementsByTitle(address, title)
            if (!results.length) {
                throw Error("Nothing found");
            }

        } catch (error) {
            message.error(error.message);
            await loadCreatedAgreements(address);
        } finally {
            setSearching(false);
        }
    }

    const loadCreatedAgreements = async (address) => {
        const results = await getCreatedExecutableAgreements(address)

        setAgreements(results);
    };

    useEffect(() => {
        if (!address) return;
        loadCreatedAgreements(address)
    }, [address]);

    if (!agreements || !agreements.length) {
        return <Page404 />
    }

    return (
        <Row>
            <Col span={24}>
                <div style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", padding: "1vh 2vw", justifyContent: "space-between" }}>

                    <Typography.Title level={3}>Created Agreements</Typography.Title>

                    <div flex={1}>
                        <Input.Search placeholder="Search agreement" enterButton="Search" loading={searching} onSearch={handleSearchAgreement} />
                    </div>

                </div>
            </Col>
            <Col>
                <Row gutter={[8, 16]}>
                    {agreements.map((agreement, idx) => <Col span={{ xs: 24, sm: 8, md: 4 }} key={idx}> <AgreementCard {...agreement} /></Col>)}
                </Row>
            </Col>
        </Row>
    )
}