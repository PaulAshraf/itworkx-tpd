import React, { useState, useEffect } from 'react'
import { Table, Spin, Empty } from 'antd'
// import { DeleteOutlined } from '@ant-design/icons'
import axios from 'axios'

import MiniRow from '../components/MiniRow'
import Title from '../components/Title'
import NewResource from '../components/NewResource'
import EditResource from '../components/EditResource'
import History from '../components/History'
import tableColumns from '../util/resourceColumns'
import ExportButton from '../components/ExportButton'
import Search from '../components/Search'

const ResourceHome = () => {

    const [data, setData] = useState(null)
    const [filterdData, setFilterdData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const requests = await axios.post('http://localhost:8080/resources/search')
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
            <Title title='Resource Requests' onClick={() => toggleNew(true)} />

            <Search data={data} filterData={setFilterdData} />

            <NewResource visible={newVisible} cancel={() => toggleNew(false)} />

            <EditResource visible={editVisible} cancel={() => toggleEdit(false)} id={selectedId} />

            <History visible={historyVisible} cancel={() => toggleHistory(false)} id={selectedId} mode='resources' />

            {!data ? <Spin size="large" style={{ textAlign: 'center', width: '100%' }} /> : data.length !== 0 ?
                <Table
                    columns={cols.columns}
                    dataSource={filterdData}
                    // expandable={{
                    //     expandedRowRender: record => <MiniRow columns={cols.miniColoumns} dataSource={record} />,
                    //     rowExpandable: _ => true,
                    // }}
                    scroll={{ x: 1500 }}
                    pagination={{ defaultPageSize: 20 }}
                /> : <Empty />}

            <ExportButton data={filterdData} mode='resources' />
        </div>
    )
}

export default ResourceHome
