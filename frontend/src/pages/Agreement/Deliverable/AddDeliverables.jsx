import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Select } from 'antd';
import { chainId } from "wagmi";

import { useAgreement } from '../../../context/agreementForm';
import AddValidators from './AddValidators';
import { PAYMENT_TOKENS } from "../../../data/tokens";

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

const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 14, offset: 6 },
    }
};

function Deliverable({ field }) {
    const { infoDataFields } = useAgreement();
    
    return (
        <>
            <Form.Item label="Title" name={[field.name, "title"]}>
                <Input size="large" />
            </Form.Item>
            <Form.Item label="Description" name={[field.name, "description"]}>
                <Input.TextArea style={{ borderRadius: "15px 15px" }} size="large" allowClear showCount />
            </Form.Item>
            <Form.Item label="Min validations" name={[field.name, "validatorThreshold"]}>
                <Input type='number' style={{ width: "100%" }} min={0} />
            </Form.Item>
            <Form.Item label="Amount" name={[field.name, "payoutAmount"]}>
                <Input type='number' style={{ width: "100%" }} min={0} />
            </Form.Item>
            <Form.Item label="Payment Token" hasFeedback name={[field.name, "targetToken"]} 
                initialValue={infoDataFields?.targetToken}>
                <Select size="large" placeholder="Select token used for payment" disabled allowClear onChange={()=>alert('changed')}>
                    {Object.entries(PAYMENT_TOKENS[chainId.polygonMumbai]).map(([k, v], idx) => (<Select.Option key={idx} value={v}>{k}</Select.Option>))}
                </Select>
            </Form.Item>
            <Form.Item label="Recipient Address" hasFeedback name={[field.name, "receiver"]} initialValue={infoDataFields?.receiver}>
                <Input size="large" placeholder="Payment recipient address" />
            </Form.Item>
            <Form.Item label="Duration">
                <Form.Item name={[field.name, "unit"]} style={{ margin: 0, padding: 0 }}>
                    <Input type="number" style={{ width: '100%', margin: 0 }} min='1' addonAfter={
                        <Form.Item name={[field.name, "unit_seconds"]} style={{ margin: 0, width: "10vw", padding: 0 }}>
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
            <AddValidators fieldx={field} key={field.key} />
            <Form.Item label="Execute Module" hasFeedback name={[field.name, "executor"]} >
                <Select size="large" placeholder="Select Offer Type" allowClear>
                    <Select.Option value="0x0000000000000000000000000000000000000001">Superfluid</Select.Option>
                </Select>
            </Form.Item>



        </>
    )
}

export default function AddDeliverables() {
    return (

        <Form.List name="deliverables">

            {(fields, { add, remove }, { errors }) => (
                <>
                    {fields.map((field, index) => (
                        <>
                            <Form.Item
                                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                label={index === 0 ? 'Deliverable(s)' : ''}
                                required={true}
                                key={field.key}
                            >
                                <Deliverable field={field} />
                                {fields.length > 1 ? (
                                    <MinusCircleOutlined
                                        className="dynamic-delete-button"
                                        onClick={() => remove(field.name)}
                                    />
                                ) : null}
                            </Form.Item>
                            <Divider />
                        </>
                    ))}
                    <Form.Item style={{ textAlign: "center" }}>
                        <Button
                            type="dashed"
                            onClick={() => add()}
                            style={{}}
                            icon={<PlusOutlined />}
                        >
                            Add Deliverable
                        </Button>

                        <Form.ErrorList errors={errors} />
                    </Form.Item>
                </>
            )}

        </Form.List>
    )

}