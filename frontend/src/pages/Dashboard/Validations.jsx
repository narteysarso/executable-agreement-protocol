import { Col, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import ValidationCard from "../../components/ValidationCard";
import { getValidatorsOf } from "../../utils/superfluid_queries";
import Page404 from "../errors/404";

export default function Validations() {
    const { address } = useAccount();
    const [validators, setValidators] = useState([]);

    const loadValidation = async (address) => {
        const results = await getValidatorsOf(address);
        
        setValidators(results);
    };

    useEffect(() => {
        if(!address) return;
        loadValidation(address);
    }, [address]);

    if(!validators.length){
        return <Page404 />
    }

    return (
        <Row>
        <Col span={24}>
            <div style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", padding: "1vh 2vw", justifyContent: "space-between" }}>
            <Typography.Title level={3}>Validations</Typography.Title>

            </div>
        </Col>
        <Col>
            {validators.map((validtor, idx) => <Col span={{xs: 24, sm: 8, md: 4}} key={idx}> <ValidationCard {...validators} /></Col> )}
        </Col>
    </Row>
    )
}