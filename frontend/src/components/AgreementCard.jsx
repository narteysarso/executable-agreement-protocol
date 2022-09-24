import { Avatar, Card } from "antd";
import { ethers } from "ethers";
import makeBlockie from 'ethereum-blockies-base64';
import {  EllipsisOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom";

export default function AgreementCard({ title = "", description = "", id = "", contractTokenURI }) {
    return (
        <Card>
            <Card
                style={{ width: 300 }}
                cover={
                    <img
                        alt="example"
                        src={makeBlockie(ethers.utils.hashMessage(JSON.stringify(contractTokenURI)))}
                    />
                }
                actions={[
                    <Link to={`agreements/${id}`}> <EllipsisOutlined key="ellipsis" /> </Link>,
                ]}
            >
                <Card.Meta
                    avatar={<Avatar src={makeBlockie(ethers.utils.hashMessage(JSON.stringify(id)))} />}
                    title={title}
                    description={description?.substr(0, 30)}
                />
            </Card>
        </Card>
    )
}