import { Button, Divider, Form, Input, message, Modal, Select } from "antd";
import {ethers} from "ethers";
import { useState } from "react";
import { chainId } from "wagmi";
import {  PAYMENT_TOKENS } from "../data/tokens";
import useAgreementContract from "../hooks/useAgreementContract";
import { getProvider } from "../utils/helpers";


function FundAgreementForm({proxy}) {
    const [loading, setLoading] = useState(false);
    const {fundAgreement} = useAgreementContract()
    const handleOnFinish = async ({ targetToken, amount }) => {
        try {
            setLoading(true);
            
            const provider = getProvider();

            await fundAgreement(proxy, targetToken, ethers.utils.parseEther(amount),  provider.getSigner());
            
        } catch (error) {
            message.error(error.message);
        }finally{
            setLoading(false);
        }

    }
    return (
        <Form onFinish={handleOnFinish} disabled={loading}>
            <Form.Item label="Super Token" hasFeedback name={"targetToken"}>
                <Select size="large" placeholder="Select token used for payment" allowClear>
                    {Object.entries(PAYMENT_TOKENS[chainId.polygonMumbai]).map(([k, v], idx) => (<Select.Option key={idx} value={v}>{k}</Select.Option>))}
                </Select>
            </Form.Item>
            <Form.Item label="Amout" hasFeedback name={"amount"} rules={[{ required: true }]}>
                <Input type="number" size="large" placeholder="Amount to upgrade" min={1} />
            </Form.Item>

            <Form.Item>
                <Button htmlType="reset" >
                    Reset
                </Button>
                <Divider type="vertical" />
                <Button type="primary" htmlType="submit" loading={loading}>
                    Fund
                </Button>
            </Form.Item>
        </Form>
    )
}

export default function FundAgreement({proxy}) {
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <Modal open={open}
                title="Fund Agreement"
                onCancel={handleCancel}
                footer={[]}>
                <FundAgreementForm proxy={proxy} />
            </Modal>
            <Button onClick={showModal}>Fund Agreement</Button>
        </>
    )
}