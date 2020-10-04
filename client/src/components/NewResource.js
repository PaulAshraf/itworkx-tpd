import React, { useState, useEffect } from 'react'
import { DateTime } from 'luxon'
import axios from 'axios'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Modal, Form, Input, Select, DatePicker, Switch, Button, message, Divider, InputNumber, Space } from 'antd'

const NewResource = (props) => {

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

    // const onChange = value => {
    //     const employee = employees.find(em => em.name === value)
    //     if (employee) {
    //         form.setFieldsValue({ employee_id: employee.id, employee_title: employee.title, function: employee.function })
    //     }
    // }

    const formArr = (key, arr) => {
        let newArr = []
        arr.forEach(element => {
            newArr.push(element[key])
        })
        return [...new Set(newArr)]
    }

    const cancel = props.cancel

    const [loading, setloading] = useState(false)

    const submit = async (values) => {
        setloading(true)
        console.log(values)
        values.start_date = DateTime.fromJSDate(values.start_date._d).toFormat('yyyy-MM-dd')
        values.end_date = DateTime.fromJSDate(values.end_date._d).toFormat('yyyy-MM-dd')
        values.created_at = DateTime.local().toFormat('yyyy-MM-dd')
        values.core_team_member = values.core_team_member ? 'y' : 'n'
        values.replacenement = values.replacenement ? 'y' : 'n'
        values.status = 'open'
        values.propability = parseInt(values.propability)
        values.percentage = parseInt(values.percentage)
        try {
            await axios.post('http://localhost:8080/resources/new', values)
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
                title="New Resource"
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
                    initialValues={{ requests_count: 1 }}
                >

                    <Divider >Request Details</Divider>

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

                    <Form.Item label="Function" name="function" rules={[{ required: true, message: 'Please fill in this field' }]}>
                        <Select
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            allowClear
                        >
                            {employees && formArr('function', employees).map(item => <Select.Option key={item} value={item}>{item}</Select.Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Job Title" name="title" rules={[{ required: true, message: 'Please fill in this field' }]}>
                        <Select
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            allowClear
                        >
                            {employees && formArr('title', employees).map(item => <Select.Option key={item} value={item}>{item}</Select.Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Core Team Member" name="core_team_member" valuePropName='checked' >
                        < Switch />
                    </Form.Item>

                    <Form.Item label="Replacenment" name="replacenement" valuePropName='checked' >
                        < Switch />
                    </Form.Item>

                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.replacenement !== currentValues.replacenement}
                    >
                        {({ getFieldValue }) => {
                            return getFieldValue('replacenement') ? (
                                <Form.Item name="replacement_for" label="Replacement For" rules={[{ required: true, message: 'Please fill in this field' }]}>
                                    <Input />
                                </Form.Item>
                            ) : null
                        }}
                    </Form.Item>

                    <Form.Item label="Number of Requests" name="requests_count" rules={[{ required: true, message: 'Please fill in this field' }]}>
                        <InputNumber />
                    </Form.Item>

                    <Divider >Assignment</Divider>

                    <Form.Item label="Probability" name="propability" rules={[{ required: true, message: 'Please fill in this field' }]}>
                        <Input addonAfter="%" />
                    </Form.Item>

                    <Form.Item label="Percentage" name="percentage" rules={[{ required: true, message: 'Please fill in this field' }]}>
                        <Input addonAfter="%" />
                    </Form.Item>

                    <Form.Item label="Start Date" name="start_date" rules={[{ required: true, message: 'Please fill in this field' }]}>
                        <DatePicker />
                    </Form.Item>

                    <Form.Item label="End Date" name="end_date" rules={[{ required: true, message: 'Please fill in this field' }]}>
                        <DatePicker />
                    </Form.Item>

                    <Form.Item label="Comments" name="comments" >
                        <Input.TextArea rows={3} />
                    </Form.Item>

                    <Divider>Technical Skills</Divider>

                    <Form.List name="skills">
                        {(fields, { add, remove }) => {
                            return (
                                <div>
                                    {fields.map(field => (
                                        <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">

                                            <Form.Item {...field} name={[field.name, 'category']} fieldKey={[field.fieldKey, 'category']} rules={[{ required: true, message: 'Missing Category' }]}>
                                                <Input placeholder="Category" style={{ width: '200px' }} />
                                            </Form.Item>

                                            <Form.Item {...field} name={[field.name, 'subcategory']} fieldKey={[field.fieldKey, 'subcategory']} >
                                                <Input placeholder="Sub Category" style={{ width: '200px' }} />
                                            </Form.Item>

                                            <MinusCircleOutlined onClick={() => { remove(field.name) }} />
                                        </Space>
                                    ))}

                                    <Form.Item>
                                        <Button type="dashed" onClick={() => { add() }} block>
                                            <PlusOutlined /> Add Skill
                                        </Button>
                                    </Form.Item>
                                </div>
                            )
                        }}
                    </Form.List>

                    <Divider />

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

export default NewResource
