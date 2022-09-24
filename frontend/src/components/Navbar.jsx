import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Menu, Space } from "antd";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import UpgradeTokens from "./UpgradeTokens";

export default function Navbar() {

    const location = useLocation();

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <img src="/logo.png" alt="logo" style={{height:'60px'}} />

            <Menu style={{flexGrow: 1, background: "transparent"}} mode="horizontal" >
                <Menu.Item>
                    <Link to="">
                    Home
                        </Link>
                </Menu.Item>
                <Menu.Item><Link to="/dashboard">Dashboard</Link></Menu.Item>
                <Menu.Item><Link to="/create-agreement">Create Agreement</Link></Menu.Item>
            </Menu>

            <div>
                <Space>
                    <UpgradeTokens />
                    <ConnectButton chainStatus="name" />
                </Space>
            </div>

        </div>
    );
}
