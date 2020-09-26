import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Modal, Form, Input, Select, DatePicker, Switch, Button, message, Spin } from 'antd'

const NewRelease = (props) => {

    const [form] = Form.useForm();

    const id = props.id
    const cancel = props.cancel

    const [firstLoading, setFirstLoading] = useState(false)
    const [loading, setloading] = useState(false)

    useEffect(() => {
        const load = async (id) => {
            setFirstLoading(true)
            if (id) {
                const res = await axios.get(`http://localhost:8080/releases/${id}`)
                const data = res.data
                data.leaving = data.leaving === 'y'
                // form.setFields({ leaving: { checked: data.leaving } })
                delete data.release_date
                delete data.leaving
                form.setFieldsValue(data)
            }

            setFirstLoading(false)

        }

        load(id)
    }, [id, form])

    const submit = async (values) => {
        setloading(true)
        console.log(values)
        values.release_date = "2020-09-22"
        // values.release_date.format("yyyy-mm-dd")
        values.leaving = values.leaving ? 'y' : 'n'
        values.propability = parseInt(values.propability)
        values.release_percentage = parseInt(values.release_percentage)
        try {
            await axios.put(`http://localhost:8080/releases/edit/${id}`, { data: values })
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
                title="Edit Release"
                centered
                visible={props.visible}
                // onOk={cancel}
                onCancel={cancel}
                width={1000}
                footer={[]}
            >
                {firstLoading ? <Spin size="large" style={{ textAlign: 'center', width: '100%' }} /> :
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

                        <Form.Item label="Release Percentage" name="release_percentage" >
                            <Input addonAfter="%" />
                        </Form.Item>

                        <Form.Item label="Status" name="release_status">
                            <Select
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                allowClear
                            >

                                <Select.Option value="open">Open</Select.Option>
                                <Select.Option value="cancelled">Cancelled</Select.Option>
                                <Select.Option value="moved">Moved</Select.Option>
                                <Select.Option value="left">Left</Select.Option>
                                <Select.Option value="booked">Booked</Select.Option>

                            </Select>
                        </Form.Item>

                        <Form.Item>
                            <Button key="submit" htmlType="submit" loading={loading}>
                                Submit
                        </Button>
                        </Form.Item>

                    </Form>
                }

            </Modal>
        </div >
    )
}

export default NewRelease
