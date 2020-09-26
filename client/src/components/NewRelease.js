import React, { useState } from 'react'
import axios from 'axios'

import { Modal, Form, Input, Select, DatePicker, Switch, Button, message } from 'antd'

const NewRelease = (props) => {

    const [form] = Form.useForm();

    const onChange = value => {
        switch (value) {
            case "Hanna Sharaf":
                form.setFieldsValue({ employee_id: "00376965-8F0E-4272-98AA-052DA616E8C1", employee_title: "Software Engineer" })
                return
            case "Mona Hawash":
                form.setFieldsValue({ employee_id: "02BC9A80-BF8F-48E5-8E49-05345017FD10", employee_title: "Principal Software Engineer" })
                return
            default:
                return
        }
    };

    const cancel = props.cancel

    const [loading, setloading] = useState(false)

    const submit = async (values) => {
        setloading(true)
        console.log(values)
        values.release_date = "2020-09-22"
        // values.release_date.format("yyyy-mm-dd")
        values.leaving = values.leaving ? 'y' : 'n'
        values.request_status = 'open'
        values.propability = parseInt(values.propability)
        values.release_percentage = parseInt(values.release_percentage)
        try {
            await axios.post('http://localhost:8080/releases/new', values)
            setloading(false)
            cancel()
        }
        catch (error) {
            message.error(error.toString())
            setloading(false)
        }
    }

    return (
        <div>
            <Modal
                title="New Release"
                centered
                visible={props.visible}
                // onOk={cancel}
                onCancel={cancel}
                width={1000}
                footer={[]}
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    onFinish={submit}
                    form={form}
                >

                    <Form.Item label="Leaving" name="leaving">
                        <Switch />
                    </Form.Item>

                    <Form.Item label="Employee Name" name="employee_name">
                        <Select
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            onChange={onChange}
                            allowClear
                        >

                            <Select.Option value="Hanna Sharaf">Hanna Sharaf</Select.Option>
                            <Select.Option value="Mona Hawash">Mona Hawash</Select.Option>

                        </Select>
                    </Form.Item>

                    <Form.Item label="Manager Name" name="manager_name">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Employee ID" name="employee_id">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Employee Title" name="employee_title">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Function" name="function">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Release Date" name="release_date">
                        <DatePicker />
                    </Form.Item>

                    <Form.Item label="Probability" name="propability" >
                        <Input addonAfter="%" />
                    </Form.Item>

                    <Form.Item label="Release Percentage" name="release_percentage" >
                        <Input addonAfter="%" />
                    </Form.Item>

                    <Form.Item label="Release Reason" name="release_reason">
                        <Input.TextArea rows={3} />
                    </Form.Item>

                    <Form.Item>
                        <Button key="submit" htmlType="submit" loading={loading}>
                            Submit
                        </Button>
                    </Form.Item>

                </Form>

            </Modal>
        </div >
    )
}

export default NewRelease
