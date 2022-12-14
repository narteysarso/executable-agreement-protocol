import { Button, Divider, Form, Input, message, Modal, Select } from "antd";
import { ethers } from "ethers";
import { useState } from "react";
import { chainId } from "wagmi";
import { CHAIN_TOKENS, PAYMENT_TOKENS } from "../data/tokens";
import { swapForSuperToken } from "../utils/superToken";

function UpgradeTokenForm() {
    const [loading, setLoading] = useState(false);
    const handleOnFinish = async ({ fromToken, toToken, amount }) => {
        try {
            setLoading(true);
            await swapForSuperToken(fromToken, toToken, ethers.utils.parseEther(amount), chainId.polygonMumbai);
            
        } catch (error) {
            message.error(error.message);
        }finally{
            setLoading(false);
        }

    }
    return (
        <Form onFinish={handleOnFinish} disabled={loading}>
            <Form.Item label="From Token" hasFeedback name={"fromToken"}>
                <Select size="large" placeholder="Select token used for payment" allowClear>
                    {Object.entries(CHAIN_TOKENS[chainId.polygonMumbai]).map(([k, v], idx) => (<Select.Option key={idx} value={v}>{k}</Select.Option>))}
                </Select>
            </Form.Item>
            <Form.Item label="Amout" hasFeedback name={"amount"} rules={[{ required: true }]}>
                <Input type="number" size="large" placeholder="Amount to upgrade" min={0.02} />
            </Form.Item>
            <Divider />
            <Form.Item label="Super Token" hasFeedback name={"toToken"}>
                <Select size="large" placeholder="Select token used for payment" allowClear>
                    {Object.entries(PAYMENT_TOKENS[chainId.polygonMumbai]).map(([k, v], idx) => (<Select.Option key={idx} value={v}>{k}</Select.Option>))}
                </Select>
            </Form.Item>

            <Form.Item>
                <Button htmlType="reset" >
                    Reset
                </Button>
                <Divider type="vertical" />
                <Button type="primary" htmlType="submit" loading={loading}>
                    Upgrade
                </Button>
            </Form.Item>
        </Form>
    )
}

export default function UpgradeTokens() {
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
                title="Upgrade Token to SuperToken"
                onCancel={handleCancel}
                footer={[]}>
                <UpgradeTokenForm />
            </Modal>
            <Button onClick={showModal}>Upgrade Tokens</Button>
        </>
    )
}