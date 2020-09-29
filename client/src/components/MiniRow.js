import React from 'react'
import { Table } from 'antd'

const MiniRow = (props) => {

    const columns = props.columns
    const data = [props.dataSource]

    return (
        <div>
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
            />
        </div>
    )
}

export default MiniRow
