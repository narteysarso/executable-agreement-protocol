import { Form } from "antd";
import AddDeliverables from "./AddDeliverables";

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


export default function AgreementDeliverableForm(){
    return (
        <Form name="dynamic_deliverables" {...formItemLayout}>
            <AddDeliverables />
        </Form>
    )
}