import { Layout, Menu, Tabs } from "antd";
import { Link, useLocation } from "react-router-dom";
import Page404 from "../errors/404";
import AgreementDetail from "./AgreementDetails";
import Created from "./Created";
import Pending from "./Pending";
import Validations from "./Validations";

export default function Dashboard() {

    const location = useLocation();
    return (
        <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
            <Layout.Sider className="site-layout-background" width={200}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', paddingTop: "3vh" }}
                >
                    <Menu.Item><Link to="created">Created Agreements</Link></Menu.Item>
                    <Menu.Item><Link to="assigned">Assigned Agreements</Link></Menu.Item>
                    <Menu.Item><Link to="validations">Assigned Validations</Link></Menu.Item>
                </Menu>
            </Layout.Sider>
            <Layout.Content style={{ padding: '0 24px', minHeight: "85vh" }}>
                {renderContent(location.pathname.split("/")[2])}
            </Layout.Content>
        </Layout>
    )
}


function renderContent(path){
    if(path === "created" || !path){
        return <Created />
    }

    if( path === "assigned"){
        return <Pending />
    }
    
    if( path === "validations"){
        return <Validations />
    }

    if(path === "agreements"){
        return <AgreementDetail />
    }

    return <Page404 />
}