import { Form, Input, Select } from "antd"
import { chainId } from "wagmi";
import { PAYMENT_TOKENS } from "../../data/tokens";


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


export default function AgreementDataForm({ form }) {
    // const {infoDataFields, setInfoDataFields} = useAgreement();

    // const handleChange = (changedFields, allFields) => {

    //     setInfoDataFields(allFields);
    // }

    return (
        <Form name="agreement-data-form" {...formItemLayout} >
            <Form.Item label="Title" hasFeedback name={"title"} >
                <Input size="large" placeholder="Agreement Title" />
            </Form.Item>
            <Form.Item label="Position" hasFeedback name={"position"} >
                <Input size="large" placeholder="Job title, position, role, etc... " />
            </Form.Item>
            <Form.Item label="Offer Type" hasFeedback name={"offerType"} >
                <Select size="large" placeholder="Select Offer Type" allowClear>
                    <Select.Option value="0">Full time</Select.Option>
                    <Select.Option value="1">Part time</Select.Option>
                    <Select.Option value="2">Contract</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Issuer Address" hasFeedback name="issuer">
                <Input size="large" placeholder="Agreement Issuer" />
            </Form.Item>
            <Form.Item label="Signer Address" hasFeedback name={"assenter"}>
                <Input size="large" placeholder="Agreement Signer" />
            </Form.Item>
            <Form.Item label="Contract Sum" hasFeedback name={"contractSum"}>
                <Input type="number" size="large" placeholder="Contract Sum" min={0} />
            </Form.Item>
            <Form.Item label="Payment Token" hasFeedback name={"targetToken"}>
                <Select size="large" placeholder="Select token used for payment" allowClear>
                    {Object.entries(PAYMENT_TOKENS[chainId.polygonMumbai]).map(([k, v], idx) => (<Select.Option key={idx} value={v}>{k}</Select.Option>))}
                </Select>
            </Form.Item>

            <Form.Item label="Duration">
                <Form.Item name="unit" style={{ margin: 0, padding: 0 }}>
                    <Input type="number" style={{ width: '100%', margin: 0 }} min='1' addonAfter={
                        <Form.Item name="unit_seconds" style={{ margin: 0, width: "10vw", padding: 0 }}>
                            <Select placeholder="Time">
                                <Select.Option value={3600}>hours</Select.Option>
                                <Select.Option value={86400}>Day</Select.Option>
                                <Select.Option value={604800}>Week</Select.Option>
                                <Select.Option value={2419200}>Month</Select.Option>
                                <Select.Option value={29030400}>Year</Select.Option>
                            </Select>
                        </Form.Item>
                    } />
                </Form.Item>
            </Form.Item>

            <Form.Item label="Agreement Description" hasFeedback help="(Supports MarkDown)" name={"description"}>
                <Input.TextArea size="large" allowClear showCount />
            </Form.Item>

            <Form.Item label="Location" hasFeedback name={"location"}>
                <Input size="large" placeholder="location: remote, Africa, US, UK, etc..." />
            </Form.Item>

        </Form>
    )
}