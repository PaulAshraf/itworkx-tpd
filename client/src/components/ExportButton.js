import React, { useState } from 'react'
import axios from 'axios'
import fileDownload from 'js-file-download'
import styled from 'styled-components'

import { Button, message } from 'antd'
import { FileExcelOutlined } from '@ant-design/icons'

const ExportButton = (props) => {

    const type = props.mode
    const data = props.data

    const [loading, setLoading] = useState(false)

    const exportExcel = async (data) => {
        setLoading(true)
        try {
            const response = await axios.post(`http://localhost:8080/${type}/excel`, { data }, {
                responseType: 'blob'
            })
            fileDownload(response.data, 'Release_Requests.xlsx');

        } catch (error) {
            message.error(error.toString())
        }
        setLoading(false)
    }

    return (
        <ButtonContainer>
            <Button type='primary' onClick={() => exportExcel(data)} loading={loading}> Export <FileExcelOutlined /></Button>
        </ButtonContainer>
    )
}

const ButtonContainer = styled.div`
    padding: 0.3em;
    margin: 1em;
`

export default ExportButton
