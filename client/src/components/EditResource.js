import React, { useState, useEffect } from 'react'
import { DateTime } from 'luxon'
import axios from 'axios'
import moment from 'moment'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

import { Modal, Space, Form, Input, Select, DatePicker, Switch, Button, message, Spin, Divider, InputNumber } from 'antd'

const EditResource = (props) => {

    const formArr = (key, arr) => {
        let newArr = []
        arr.forEach(element => {
            newArr.push(element[key])
        })
        return [...new Set(newArr)]
    }

    const [form] = Form.useForm();

    const id = props.id
    const cancel = props.cancel

    const [firstLoading, setFirstLoading] = useState(false)
    const [loading, setloading] = useState(false)

    const [employees, setEmployees] = useState(null)
    const [managers, setManagers] = useState(null)

    useEffect(() => {


        const load = async (id) => {
            setFirstLoading(true)

            if (id) {
                const res = await axios.get(`http://localhost:8080/resources/${id}`)
                const data = res.data.request
                const skills = res.data.skills
                data.core_team_member = data.core_team_member === 'y'
                data.replacenement = data.replacenement === 'y'
                data.start_date = moment(data.start_date, 'YYYY-MM-DD')
                data.end_date = moment(data.end_date, 'YYYY-MM-DD')
                data.action_taken = { other: '' }
                data.skills = skills
                form.setFieldsValue(data)
            }


        }

        const fetchData = async () => {
            try {

                const responseEmployees = await axios.get('http://localhost:8080/employees')
                setEmployees(responseEmployees.data)
                const responseManagers = await axios.get('http://localhost:8080/employees/managers')
                setManagers(responseManagers.data)

                setFirstLoading(false)
            } catch (error) {
                message.error(error.toString())
            }
        }

        fetchData()
        load(id)


    }, [id, form])

    const submit = async (values) => {
        setloading(true)
        values.start_date = DateTime.fromJSDate(values.start_date._d).toFormat('yyyy-MM-dd')
        values.end_date = DateTime.fromJSDate(values.end_date._d).toFormat('yyyy-MM-dd')
        if (values.actual_start_date) {
            values.actual_start_date = DateTime.fromJSDate(values.actual_start_date._d).toFormat('yyyy-MM-dd')
        }
        if (values.actual_end_date) {
            values.actual_end_date = DateTime.fromJSDate(values.actual_end_date._d).toFormat('yyyy-MM-dd')
        }
        values.created_at = DateTime.local().toFormat('yyyy-MM-dd')
        values.core_team_member = values.core_team_member ? 'y' : 'n'
        values.replacenement = values.replacenement ? 'y' : 'n'
        values.propability = parseInt(values.propability)
        values.percentage = parseInt(values.percentage)
        if (values.actual_percentage) {
            values.actual_percentage = parseInt(values.actual_percentage)
        }

        let action_taken = null
        if (values.action_taken.list && values.action_taken.list !== '') {
            action_taken = values.action_taken.list
        }
        if (values.action_taken.other && values.action_taken.other !== '') {
            action_taken = values.action_taken.other
        }
        let payload = { data: values }
        if (action_taken) {
            payload.action = { action: action_taken }
        }
        console.log(values)
        console.log(payload)
        delete values.action_taken

        try {
            await axios.put(`http://localhost:8080/resources/edit/${id}`, payload)
            setloading(false)
            cancel()
        }
        catch (error) {
            message.error(error.toString())
            setloading(false)
        }
    }

    // const onChange = value => {
    //     const employee = employees.find(em => em.name === value)
    //     if (employee) {
    //         form.setFieldsValue({ employee_id: employee.id, employee_title: employee.title })
    //     }
    // }

    const onChangeAction = value => {
        switch (value) {
            case 'release':
                form.setFieldsValue({ status: 'hired' })
                break;
            case 'Taleo':
                form.setFieldsValue({ status: 'pendingHiringRequest' })
                break;
            case 'Outsourcing':
                form.setFieldsValue({ status: 'pendingOutsourcingRequest' })
                break;
            case 'Overallocation':
                form.setFieldsValue({ status: 'overAllocated' })
                break;
            default:
                break;
        }
    }

    return (
        <div>
            <Modal
                title="Edit Resource"
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
                        <Divider >Take Action</Divider>


                        <Form.Item label='Action Taken'>
                            {/* <Input.Group compact> */}
                            <Form.Item name={["action_taken", "list"]}>
                                <Select
                                    showSearch
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    allowClear
                                    onChange={onChangeAction}
                                >

                                    <Select.Option key='release' value="release">Assigned from release list</Select.Option>
                                    <Select.Option key='Taleo' value="Taleo">Added to Taleo</Select.Option>
                                    <Select.Option key='Outsourcing' value="Outsourcing">Added to Outsourcing list</Select.Option>
                                    <Select.Option key='Overallocation' value="Overallocation">Assigned as Over allocation</Select.Option>

                                </Select>
                            </Form.Item>

                            <Form.Item name={["action_taken", "other"]}>
                                <Input placeholder='Other action ...' />
                            </Form.Item>
                            {/* </Input.Group> */}
                        </Form.Item>

                        <Form.Item label="Status" name="status">
                            <Select
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                allowClear
                            >

                                <Select.Option key='open' value="open">Open</Select.Option>
                                <Select.Option key='cancelled' value="cancelled">Cancelled</Select.Option>
                                <Select.Option key='moved' value="moved">Moved</Select.Option>
                                <Select.Option key='onHold' value="onHold">On Hold</Select.Option>
                                <Select.Option key='pendingHiringRequest' value="pendingHiringRequest">Pending Hiring Request</Select.Option>
                                <Select.Option key='pendingOutsourcingRequest' value="pendingOutsourcingRequest">Pending Outsourcing Request</Select.Option>
                                <Select.Option key='overAllocated' value="overAllocated">Over Allocated</Select.Option>
                                <Select.Option key='hired' value="hired">Hired</Select.Option>
                                <Select.Option key='outsourced' value="outsourced">Outsourced</Select.Option>

                            </Select>
                        </Form.Item>

                        <Divider> Request Details </Divider>

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

                        <Form.Item label="Actual Percentage" name="actual_percentage" >
                            <Input addonAfter="%" />
                        </Form.Item>

                        <Form.Item label="Actual Start Date" name="actual_start_date" >
                            <DatePicker />
                        </Form.Item>

                        <Form.Item label="Actual End Date" name="actual_end_date" >
                            <DatePicker />
                        </Form.Item>

                        <Form.Item label="Comments" name="comments" >
                            <Input.TextArea rows={3} />
                        </Form.Item>

                        <Form.Item label="Assigned Resource" name="assigned_resource" >
                            <Input />
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
                }

            </Modal>
        </div >
    )
}

export default EditResource
