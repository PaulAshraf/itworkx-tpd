import React, { useState } from 'react'

import { Form, Select, Row, Col, Button } from 'antd'
import { UpOutlined, DownOutlined } from '@ant-design/icons'

const Search = (props) => {

    const data = props.data
    const filterData = props.filterData

    const [expand, setExpand] = useState(false)
    const [form] = Form.useForm()

    const onFinish = (values) => {
        const newData = data.filter(element => {
            let isCorrect = true
            Object.keys(values).forEach(key => {
                if (values[key]) {
                    isCorrect = isCorrect && values[key].reduce((acc, curr) => {
                        return (curr === element[key]) && acc
                    }, true)
                }
            })
            return isCorrect
        })
        filterData(newData)
    }

    const formArr = (key, arr) => {
        let newArr = []
        arr.forEach(element => {
            newArr.push(element[key])
        })
        return [...new Set(newArr)]
    }

    return (
        <Form
            form={form}
            name="advanced_search"
            className="ant-advanced-search-form"
            onFinish={onFinish}
            initialValues={{ request_status: ['open'] }}
        >
            {expand ? <><Row gutter={24}>

                <Col span={8} >
                    <Form.Item label="Employee Title" name="employee_title" >
                        <Select
                            mode="tags"
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            // onChange={onChange}
                            allowClear
                        >
                            {formArr('employee_title', data).map(item => <Select.Option key={item} value={item}>{item}</Select.Option>)}
                        </Select>
                    </Form.Item>
                </Col>

                <Col span={8} >
                    <Form.Item label="Manager Name" name="manager_name" >
                        <Select
                            mode="tags"
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            allowClear
                        >
                            {formArr('manager_name', data).map(item => <Select.Option key={item} value={item}>{item}</Select.Option>)}
                        </Select>
                    </Form.Item>
                </Col>

                <Col span={8} >
                    <Form.Item label="Employee Name" name="employee_name" >
                        <Select
                            mode="tags"
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            allowClear
                        >
                            {formArr('employee_name', data).map(item => <Select.Option key={item} value={item}>{item}</Select.Option>)}
                        </Select>
                    </Form.Item>
                </Col>

                <Col span={8} >
                    <Form.Item label="Function" name="function" >
                        <Select
                            mode="tags"
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            allowClear
                        >
                            {formArr('function', data).map(item => <Select.Option key={item} value={item}>{item}</Select.Option>)}
                        </Select>
                    </Form.Item>
                </Col>

                <Col span={8} >
                    <Form.Item label="Status" name="request_status" >
                        <Select
                            mode='tags'
                            showSearch
                            // defaultValue={['open']}
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
                </Col>

            </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit"> Search </Button>
                        <Button style={{ margin: '0 8px' }} onClick={() => { form.resetFields() }}> Clear </Button>
                    </Col>
                </Row>
            </> : <></>}
            <Row>
                <Col span={24} style={{ textAlign: 'right', }}>
                    <Button type='text' onClick={() => { setExpand(!expand) }}>
                        {expand ? <UpOutlined /> : <DownOutlined />} Search
                    </Button>
                </Col>
            </Row>
        </Form >
    )
}


export default Search
