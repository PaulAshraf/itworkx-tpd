import React, { useState, useEffect } from 'react'
import { Table, Spin } from 'antd'
// import { DeleteOutlined } from '@ant-design/icons'
import axios from 'axios'

import MiniRow from '../components/MiniRow'
import Title from '../components/Title'
import NewRelease from '../components/NewRelease'
import EditRelease from '../components/EditRelease'
import History from '../components/History'
import tableColumns from '../util/releaseColumns'
import ExportButton from '../components/ExportButton'
import Search from '../components/Search'

const ReleaseHome = () => {

    const [data, setData] = useState(null)
    const [filterdData, setFilterdData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const requests = await axios.post('http://localhost:8080/releases/search')
            requests.data.forEach(element => {
                element.key = element.reference_number
                element.actions = element.reference_number
            })
            setData(requests.data)
            setFilterdData(requests.data)
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

    const [historyVisible, setHistoryVisible] = useState(false)
    const toggleHistory = (bool) => {
        setHistoryVisible(bool)
    }

    const [selectedId, setselectedId] = useState(null)

    const cols = tableColumns(setselectedId, setEditVisible, setHistoryVisible)

    return (
        <div>
            <Title title='Release Requests' onClick={() => toggleNew(true)} />

            <Search data={data} filterData={setFilterdData} />

            <NewRelease visible={newVisible} cancel={() => toggleNew(false)} />

            <EditRelease visible={editVisible} cancel={() => toggleEdit(false)} id={selectedId} />

            <History visible={historyVisible} cancel={() => toggleHistory(false)} id={selectedId} mode='releases' />

            {!data ? <Spin size="large" style={{ textAlign: 'center', width: '100%' }} /> :
                <Table
                    columns={cols.columns}
                    dataSource={filterdData}
                    expandable={{
                        expandedRowRender: record => <MiniRow columns={cols.miniColoumns} dataSource={record} />,
                        rowExpandable: _ => true,
                    }}
                    scroll={{ x: 1500 }}
                    pagination={{ defaultPageSize: 20 }}
                />}

            <ExportButton data={filterdData} mode='releases' />
        </div>
    )
}

export default ReleaseHome
