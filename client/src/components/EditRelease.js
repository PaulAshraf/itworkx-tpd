import React, { useState, useEffect } from 'react'
import { DateTime } from 'luxon'
import axios from 'axios'
import moment from 'moment'

import { Modal, Form, Input, Select, DatePicker, Switch, Button, message, Spin, Divider } from 'antd'

const EditRelease = (props) => {


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
                const res = await axios.get(`http://localhost:8080/releases/${id}`)
                const data = res.data
                data.leaving = data.leaving === 'y'
                data.release_date = moment(data.release_date, 'YYYY-MM-DD')
                data.action_taken = { other: '' }
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
        values.release_date = DateTime.fromJSDate(values.release_date._d).toFormat('yyyy-MM-dd')
        values.leaving = values.leaving ? 'y' : 'n'
        values.propability = parseInt(values.propability)
        values.release_percentage = parseInt(values.release_percentage)

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
            await axios.put(`http://localhost:8080/releases/edit/${id}`, payload)
            setloading(false)
            cancel()
        }
        catch (error) {
            message.error(error.toString())
            setloading(false)
        }
    }

    const onChange = value => {
        const employee = employees.find(em => em.name === value)
        if (employee) {
            form.setFieldsValue({ employee_id: employee.id, employee_title: employee.title, function: employee.title })
        }
    }

    const onChangeAction = value => {
        switch (value) {
            case 'moved':
                form.setFieldsValue({ request_status: 'moved' })
                break;
            case 'left':
                form.setFieldsValue({ request_status: 'left' })
                break;
            default:
                break;
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

                                    <Select.Option key='moved' value="moved">Moving List</Select.Option>
                                    <Select.Option key='left' value="left">Leaving List</Select.Option>

                                </Select>
                            </Form.Item>

                            <Form.Item name={["action_taken", "other"]}>
                                <Input placeholder='Other action ...' />
                            </Form.Item>
                            {/* </Input.Group> */}
                        </Form.Item>

                        <Form.Item label="Status" name="request_status">
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
                                <Select.Option key='left' value="left">Left</Select.Option>
                                <Select.Option key='booked' value="booked">Booked</Select.Option>

                            </Select>
                        </Form.Item>

                        <Divider />

                        <Form.Item label="Leaving" name="leaving" valuePropName='checked'>
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
                                {employees && employees.map(employee => <Select.Option key={employee.id} value={employee.name}>{employee.name}</Select.Option>)}
                            </Select>
                        </Form.Item>

                        <Form.Item label="Manager Name" name="manager_name">
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

export default EditRelease
