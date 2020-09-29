import React, { useState, useEffect } from 'react'
import { DateTime } from 'luxon'
import axios from 'axios'

import { Modal, Form, Input, Select, DatePicker, Switch, Button, message } from 'antd'

const NewRelease = (props) => {

    const [employees, setEmployees] = useState(null)
    const [managers, setManagers] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseEmployees = await axios.get('http://localhost:8080/employees')
                setEmployees(responseEmployees.data)
                const responseManagers = await axios.get('http://localhost:8080/employees/managers')
                setManagers(responseManagers.data)
            } catch (error) {
                message.error(error.toString())
            }
        }
        fetchData()
    }, [])

    const [form] = Form.useForm()

    const onChange = value => {
        const employee = employees.find(em => em.name === value)
        if (employee) {
            form.setFieldsValue({ employee_id: employee.id, employee_title: employee.title, function: employee.function })
        }
    }

    const cancel = props.cancel

    const [loading, setloading] = useState(false)

    const submit = async (values) => {
        setloading(true)
        values.release_date = DateTime.fromJSDate(values.release_date._d).toFormat('yyyy-MM-dd')
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

                    <Form.Item label="Leaving" name="leaving" valuePropName='checked' rules={[{ required: true, message: 'Please fill in this field' }]}>
                        < Switch />
                    </Form.Item>

                    <Form.Item label="Employee Name" name="employee_name" rules={[{ required: true, message: 'Please fill in this field' }]}>
                        <Select
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            onChange={onChange}
                            allowClear
                        >
                            {employees && employees.map(employee => <Select.Option key={employee.id} value={employee.name}>{employee.name}</Select.Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Manager Name" name="manager_name" rules={[{ required: true, message: 'Please fill in this field' }]}>
                        <Select
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            allowClear
                        >
                            {managers && managers.map(manager => <Select.Option key={manager.id} value={manager.name}>{manager.name}</Select.Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Employee ID" name="employee_id" >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Employee Title" name="employee_title" >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Function" name="function" rules={[{ required: true, message: 'Please fill in this field' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Release Date" name="release_date" rules={[{ required: true, message: 'Please fill in this field' }]}>
                        <DatePicker />
                    </Form.Item>

                    <Form.Item label="Probability" name="propability" rules={[{ required: true, message: 'Please fill in this field' }]}>
                        <Input addonAfter="%" />
                    </Form.Item>

                    <Form.Item label="Release Percentage" name="release_percentage" rules={[{ required: true, message: 'Please fill in this field' }]}>
                        <Input addonAfter="%" />
                    </Form.Item>

                    <Form.Item label="Release Reason" name="release_reason" rules={[{ required: true, message: 'Please fill in this field' }]}>
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
