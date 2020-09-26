import React, { useState, useEffect } from 'react'
import { Table, Tag, Button, Spin, Modal, message } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import axios from 'axios'

import MiniRow from '../components/MiniRow'
import Title from '../components/Title'
import NewRelease from '../components/NewRelease'
import EditRelease from '../components/EditRelease'

import Code from '../styles/Code'
import colors from '../styles/colors'

const ReleaseHome = () => {

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
            title: 'Employee Name',
            dataIndex: 'employee_name',
            key: 'employee_name',
        },
        {
            title: 'Employee ID',
            dataIndex: 'employee_id',
            key: 'employee_id',
            render:
                id => <Code>{id}</Code>
        },
        // {
        //     title: 'Employee Title',
        //     dataIndex: 'employeeTitle',
        //     key: 'employeeTitle',
        // },
        {
            title: 'Function',
            dataIndex: 'function',
            key: 'function',
        },
        {
            title: 'Release Date',
            dataIndex: 'release_date',
            key: 'release_date',
        },
        // {
        //     title: 'Release Reason',
        //     dataIndex: 'releaseReason',
        //     key: 'releaseReason',
        // },
        {
            title: 'Release %',
            dataIndex: 'release_percentage',
            key: 'release_percentage',
        },
        // {
        //     title: 'Leaving',
        //     dataIndex: 'leaving',
        //     key: 'leaving',
        // },
        {
            title: 'Status',
            dataIndex: 'request_status',
            key: 'request_status',
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
                        <Button size='small' onClick={() => confirmDelete(id)}><DeleteOutlined /></Button>
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
    const [deleteLoading, setDeleteLoading] = useState(false)

    const confirmDelete = async (id) => {
        Modal.confirm({
            title: 'Are you sure delete this Release Request?',
            icon: <DeleteOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            okButtonProps: { loading: deleteLoading },
            onOk() {
                console.log('OK')
                setDeleteLoading(true)
                axios.delete(`http://localhost:8080/releases/delete/${id}`)
                    .then(() => setDeleteLoading(false))
                    .catch((error) => message(error.toString()))

                // setDeleteLoading(false)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

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
