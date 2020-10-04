import React from 'react'

import Code from '../styles/Code'
import colors from '../styles/colors'

import { Tag, Button, Tooltip } from 'antd'
import { CheckOutlined, EditOutlined, HistoryOutlined, CloseOutlined } from '@ant-design/icons'

export default (setselectedId, setEditVisible, setHistoryVisible) => {

    return {
        columns: [
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
                            case 'onHold':
                                return <Tag color={colors.black}>ON HOLD</Tag>
                            case 'moved':
                                return <Tag color={colors.black}>MOVED</Tag>
                            case 'pendingHiringRequest':
                                return <Tag color={colors.darkRed}>PENDING HIRING</Tag>
                            case 'pendingOutsourcingRequest':
                                return <Tag color={colors.darkRed}>PENDING OUTSOURCING</Tag>
                            case 'overAllocated':
                                return <Tag color={colors.red}>OVER ALLOCATED</Tag>
                            case 'hired':
                                return <Tag color={colors.blue}>HIRED</Tag>
                            case 'outsourced':
                                return <Tag color={colors.blue}>OUTSOURCED</Tag>
                            default:
                                return <Tag color={colors.black}>{status ? status.toUpperCase() : 'NONE'}</Tag>
                        }
                    }
            },
            // {
            //     title: 'Action Taken',
            //     dataIndex: 'actionTaken',
            //     key: 'actionTaken',
            //     render:
            //         actionTaken => {
            //             switch (actionTaken) {
            //                 case 'movingList':
            //                     return <Tag color={colors.blue}>MOVING LIST</Tag>
            //                 case 'leavingList':
            //                     return <Tag color={colors.red}>LEAVING LIST</Tag>
            //                 default:
            //                     return <Tag color={colors.black}>{actionTaken ? actionTaken.toUpperCase() : 'NONE'}</Tag>
            //             }
            //         }
            // },
            {
                title: 'Actions',
                dataIndex: 'actions',
                key: 'actions',
                fixed: 'right',
                render: id => {
                    return (
                        <>
                            <Tooltip title='Edit Request'>
                                <Button size='middle' style={{ fontSize: '16px', margin: '4px' }} onClick={() => { setselectedId(id); setEditVisible(true); }}><EditOutlined /></Button>
                            </Tooltip>
                            <Tooltip title='Action History'>
                                <Button size='middle' style={{ fontSize: '16px', margin: '4px' }} onClick={() => { setselectedId(id); setHistoryVisible(true); }}><HistoryOutlined /></Button>
                            </Tooltip>
                        </>
                    )
                }
            }
        ],

        miniColoumns: [
            {
                title: 'Employee Title',
                dataIndex: 'employee_title',
                key: 'employee_title',
            },
            {
                title: 'Leaving',
                dataIndex: 'leaving',
                key: 'leaving',
                render: leaving => leaving === 'y' ? <CheckOutlined /> : <CloseOutlined />
            },
            {
                title: 'Employee ID',
                dataIndex: 'employee_id',
                key: 'employee_id',
                render:
                    id => <Code>{id}</Code>
            },
            {
                title: 'Resource Reason',
                dataIndex: 'resource_reason',
                key: 'resource_reason',
            },

        ]
    }
}
