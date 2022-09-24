import { Form, Input, Select } from "antd"

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};


export default function AgreementTokenizationForm() {

    return (
        <Form  name="agreement-tokenization-form" {...formItemLayout} style={{paddingTop: "4vh"}}>
            <Form.Item label="Name" hasFeedback name={"name"} >
                <Input size="large" placeholder="Contract NFT token name"/>
            </Form.Item>
            <Form.Item label="Symbol" hasFeedback name={"symbol"} >
                <Input size="large" placeholder="Contract NFT symbol "/>
            </Form.Item>
        </Form>
    )
}