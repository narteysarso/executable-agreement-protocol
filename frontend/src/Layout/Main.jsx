import { Layout } from 'antd';
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Main() {
    return (
        <Layout>
            <Layout.Header style={{ background: "transparent", zIndex: 1 }}>
                <Navbar />
            </Layout.Header>
            <Layout.Content style={{ padding: "0 50px", minHeight: "80vh" }}>
                <Outlet />
            </Layout.Content>
            <Layout.Footer>
                <p style={{textAlign: "center"}}>Executable Agreement &copy; 2022</p>
            </Layout.Footer>
        </Layout>
    )
}