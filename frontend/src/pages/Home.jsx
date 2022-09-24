import { Typography, Button, Row, Col } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons';
import Lottie from "react-lottie";

import scanningAnimation from '../lottie-animations/scanning.json'

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: scanningAnimation,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};

export default function Home() {
    return (
        <Col span={24} style={{ overflow: 'hidden', marginBottom: "3vh" }}>
        <div style={{ overflow: "hidden", display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', width: "100%", background: "white", height: "80vh" }}>
            <div style={{ position: "absolute", right: "60px", display: "inline", bottom: "-30px", width: "600px", background: "#b0cbc421", height: "600px", transform: "rotate(-60deg)" }}></div>
            <Row>
                <Col offset={4} span={14}>
                    <Typography.Title style={{ fontFamily: 'BebasNeueRegular', marginTop: '3vh', fontSize: "4vw", fontWeight: '700', textAlign: 'center' }}>
                        Executable Agreement
                    </Typography.Title>
                </Col>
                <Col span={4}>
                    <Lottie options={defaultOptions}
                        width="10vw" style={{ background: 'transparent' }} />
                </Col>
            </Row>
            <div style={{ display: "flex" }}>
               <Typography.Paragraph>Smart Legal Contract</Typography.Paragraph>
            </div>
            <div>
                <div style={{ position: "absolute", right: "10px", top: "-120px", width: "150px", background: "#9bb3e7", height: "150px", transform: "rotate(-45deg)" }}></div>
                <div style={{ position: "absolute", right: "90px", top: "-120px", width: "150px", background: "#b4d7ff", height: "150px", transform: "rotate(-45deg)" }}></div>
                <div style={{ position: "absolute", right: "50px", top: "-120px", width: "150px", background: "#b0cbe4", height: "150px", transform: "rotate(-45deg)" }}></div>
            </div>

            <div>

                <div style={{ position: "absolute", left: "60px", bottom: "-20px", width: "200px", background: "#9bb3e7",height: "200px", transform: "rotate(-45deg)" }}></div>
                <div style={{ position: "absolute", left: "-90px", bottom: "60px", width: "200px", background: "#b4d7ff",height: "200px", transform: "rotate(-45deg)" }}></div>
                <div style={{ position: "absolute", left: "-50px", bottom: "-30px", width: "170px", background: "#b0cbe4", height: "170px", transform: "rotate(-45deg)" }}></div>
            </div>

        </div>
        </Col>

    )
}