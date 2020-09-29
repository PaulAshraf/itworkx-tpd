import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Modal, Timeline, message, Spin, Empty } from 'antd'

const History = (props) => {

    const type = props.mode
    const id = props.id
    const cancel = props.cancel

    const [actionsHistory, setActionsHistory] = useState([])
    const [firstLoading, setFirstLoading] = useState(false)



    useEffect(() => {
        const fetchData = async (id) => {
            try {
                setFirstLoading(true)

                const response = await axios.get(`http://localhost:8080/${type}/actions_history/${id}`)
                setActionsHistory(response.data)

                setFirstLoading(false)
            } catch (error) {
                message.error(error.toString())
                setFirstLoading(false)
            }
        }

        fetchData(id)


    }, [id, type])


    return (
        <div>
            <Modal
                title="Actions History"
                centered
                visible={props.visible}
                // onOk={cancel}
                onCancel={cancel}
                width={700}
                footer={[]}
            >
                {firstLoading ? <Spin size="large" style={{ textAlign: 'center', width: '100%' }} /> :
                    <Timeline mode='left'>
                        {actionsHistory.length === 0 ? <Empty /> :
                            actionsHistory.map(item => <Timeline.Item key={item.action_id} label={item.action_date}>{`${item.action} by ${item.action_owner}`}</Timeline.Item>)}

                    </Timeline>
                }

            </Modal>
        </div >
    )
}

export default History
