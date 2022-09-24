import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';


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

export default function AddValidators({fieldx}) {
    return (
        <Form name={`dynamic_validators_${fieldx.key}`} {...formItemLayout}>
            <Form.List name={`validators_${fieldx.key}`} key={fieldx.name}>
                {(fields, { add, remove }, { errors }) => (
                    <>
                        {fields.map((field, index) => (
                            <Form.Item
                                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                label={index === 0 ? 'Validator(s)' : ''}
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
                                            message: "Please specify validator or delete this field.",
                                        },
                                    ]}
                                    name={[field.name,"validator"]}
                                >
                                    <Input style={{ borderRadius: "8px 8px" }} size="large" allowClear />
                                </Form.Item>
                                {fields.length > 1 ? (
                                    <MinusCircleOutlined
                                        className="dynamic-delete-button"
                                        onClick={() => remove(field.name)}
                                    />
                                ) : null}
                            </Form.Item>
                        ))}
                        <Form.Item style={{ textAlign: "center" }}>
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                style={{}}
                                icon={<PlusOutlined />}
                            >
                                Add Validator
                            </Button>

                            <Form.ErrorList errors={errors} />
                        </Form.Item>
                    </>
                )}

            </Form.List>

        </Form>
    )
}