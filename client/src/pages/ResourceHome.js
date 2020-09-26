import React from 'react'

const ResourceHome = () => {
    return (
        <div>

        </div>
    )
}

export default ResourceHome
import React, { useState, useEffect } from 'react'
import { Table, Tag, Button, Spin } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import axios from 'axios'

import MiniRow from '../components/MiniRow'
import Title from '../components/Title'
import NewResource from '../components/NewResource'
import EditResource from '../components/EditResource'

import Code from '../styles/Code'
import colors from '../styles/colors'

const ResourceHome = () => {

    const columns = [
        {
            title: 'Reference No.',
            dataIndex: 'reference_number',
            key: 'reference_number',
            render:
                id => <Code>{id}</Code>
        },
        {
            title: 'Manager',
            dataIndex: 'manager_name',
            key: 'manager_name',
        },
        {
            title: 'Function',
            dataIndex: 'function',
            key: 'function',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Start Date',
            dataIndex: 'start_date',
            key: 'start_date',
        },
        {
            title: 'End Date',
            dataIndex: 'end_date',
            key: 'end_date',
        },
        {
            title: 'Percentage',
            dataIndex: 'percentage',
            key: 'percentage',
        },
        {
            title: 'Probability',
            dataIndex: 'probability',
            key: 'probability',
        },
        {
            title: 'Core Team Member',
            dataIndex: 'core_team_member',
            key: 'core_team_member',
        },
        {
            title: 'Replacenement',
            dataIndex: 'replacenement',
            key: 'replacenement',
        },
        {
            title: 'Replacement For',
            dataIndex: 'replacement_for',
            key: 'replacement_for',
        },
        {
            title: 'Replacenement',
            dataIndex: 'replacenement',
            key: 'replacenement',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render:
                status => {
                    switch (status) {
                        case 'open':
                            return <Tag color={colors.blue}>OPEN</Tag>
                        case 'cancelled':
                            return <Tag color={colors.red}>CANCELLED</Tag>
                        case 'moved':
                            return <Tag color={colors.black}>MOVED</Tag>
                        case 'left':
                            return <Tag color={colors.darkRed}>LEFT</Tag>
                        case 'booked':
                            return <Tag color={colors.black}>BOOKED</Tag>
                        default:
                            return <Tag color={colors.black}>{status ? status.toUpperCase() : 'NONE'}</Tag>
                    }
                }
        },
        {
            title: 'Action Taken',
            dataIndex: 'actionTaken',
            key: 'actionTaken',
            render:
                actionTaken => {
                    switch (actionTaken) {
                        case 'movingList':
                            return <Tag color={colors.blue}>MOVING LIST</Tag>
                        case 'leavingList':
                            return <Tag color={colors.red}>LEAVING LIST</Tag>
                        default:
                            return <Tag color={colors.black}>{actionTaken ? actionTaken.toUpperCase() : 'NONE'}</Tag>
                    }
                }
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            fixed: 'right',
            render: id => {
                return (
                    <>
                        <Button size='small' onClick={() => { setselectedId(id); setEditVisible(true); }}><EditOutlined /></Button>
                        <Button size='small' ><DeleteOutlined /></Button>
                    </>
                )
            }
        }
    ]

    const [data, setData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const requests = await axios.post('http://localhost:8080/releases/search')
            requests.data.forEach(element => {
                element.key = element.reference_number
                element.actions = element.reference_number
            })
            setData(requests.data)
        }

        fetchData()
    }, [])

    const [newVisible, setNewVisible] = useState(false)
    const toggleNew = (bool) => {
        setNewVisible(bool)
    }

    const [editVisible, setEditVisible] = useState(false)
    const toggleEdit = (bool) => {
        setEditVisible(bool)
    }

    const [selectedId, setselectedId] = useState(null)

    return (
        <div>
            <Title title='Release Requests' onClick={() => toggleNew(true)} />
            <NewRelease visible={newVisible} cancel={() => toggleNew(false)} />
            <EditRelease visible={editVisible} cancel={() => toggleEdit(false)} id={selectedId} />
            {!data ? <Spin size="large" style={{ textAlign: 'center', width: '100%' }} /> :
                <Table
                    columns={columns}
                    dataSource={data}
                    expandable={{
                        expandedRowRender: record => <MiniRow record={record} />,
                        rowExpandable: _ => true,
                    }}
                    scroll={{ x: 1500 }}
                />}
        </div>
    )
}

export default ReleaseHome
