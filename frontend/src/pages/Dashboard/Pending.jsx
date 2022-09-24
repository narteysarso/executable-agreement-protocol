import { Col, Input, message, Row, Typography } from "antd";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi"
import { getAssenterExecutableAgreements, getAssenterExecutableAgreementsByTitle, getExecutableAgreementsByTitle} from "../../utils/superfluid_queries";
import AgreementCard from "../../components/AgreementCard";
import Page404 from "../errors/404";


export default function Pending() {
    const { address } = useAccount();
    const [agreements, setAgreements] = useState([]);
    const [searching, setSearching] = useState(false);

    const handleSearchAgreement = async (title ="" ) => {
        try {
            setSearching(true);
            if(!title) return;
            const results = await getAssenterExecutableAgreementsByTitle(address, title)
            if(!results.length){
                throw Error("Nothing found");
            }

        } catch (error) {
            message.error(error.message);
            await loadAssenterAgreements(address);
        }finally{
            setSearching(false);
        }
    }

    const loadAssenterAgreements = async (address) => {
        const results = await getAssenterExecutableAgreements(address)
        
        setAgreements(results);
    };
    useEffect(() => {
        if(!address) return;
        loadAssenterAgreements(address);
    }, [address]);

    if(!agreements.length){
        return <Page404 />
    }

    return (
        <Row>
            <Col span={24}>
                <div style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", padding: "1vh 2vw", justifyContent: "space-between" }}>
                <Typography.Title level={3}>Assigned Agreements</Typography.Title>

                 <div flex={1}>
                    <Input.Search placeholder="Search agreement" enterButton="Search" loading={searching} onSearch={handleSearchAgreement}/>
                </div>   
                    
                </div>
            </Col>
            <Col>
                {agreements.map((agreement, idx) => <Col span={{xs: 24, sm: 8, md: 4}} key={idx}> <AgreementCard {...agreement} /></Col> )}
            </Col>
        </Row>
    )
}