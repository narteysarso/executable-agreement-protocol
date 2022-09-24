import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography } from 'antd';



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


export default function AgreementClauseForm() {
    
    return (
        <>
            <Typography.Title level={3}>Add Clauses</Typography.Title>
            <Form  name="dynamic_clauses" {...formItemLayout} >
                <Form.List name="clauses" >

                    {(fields, { add, remove }, { errors }) => {
                        
                        return (
                        <>
                            {fields.map((field, index) => (
                                
                                <Form.Item
                                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                    label={index === 0 ? 'Agreement Clause(s)' : ''}
                                    required={false}
                                    key={field.key}
                                    
                                >
                                    <Form.Item
                                        validateTrigger={['onChange', 'onBlur']}
                                        hasFeedback
                                        help="(Supports MarkDown)"
                                        rules={[
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: "Please specify clause or delete this field.",
                                            },
                                        ]}
                                        
                                        name={[field.name, "clause"]}
                                    >
                                        <Input.TextArea style={{borderRadius: "15px 15px"}} size="large" allowClear showCount />
                                    </Form.Item>
                                    {fields.length > 1 ? (
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            onClick={() => remove(field.name)}
                                        />
                                    ) : null}
                                </Form.Item>
                            ))}
                            <Form.Item style={{textAlign: "center"}}>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    style={{ }}
                                    icon={<PlusOutlined />}
                                >
                                    Add Clause
                                </Button>

                                <Form.ErrorList errors={errors} />
                            </Form.Item>
                        </>
                    )}}

                </Form.List>

            </Form>
        </>
    )
}