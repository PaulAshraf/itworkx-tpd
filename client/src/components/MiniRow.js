import React from 'react'
import { Row, Col } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

const MiniRow = (props) => {

    const employeeTitle = props.record.employee_title
    const leaving = props.record.leaving
    const releaseReason = props.record.release_reason

    return (
        <div>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" span={8}>
                    <strong>Employee Title: </strong> {' ' + employeeTitle}
                </Col>
                <Col className="gutter-row" span={8}>
                    <strong>{'Leaving: '}</strong> {leaving === 'y' ? <CheckOutlined /> : <CloseOutlined />}
                </Col>
                <Col className="gutter-row" span={8}>
                    <strong>Release Reason: </strong> {' ' + releaseReason}
                </Col>
            </Row>
        </div>
    )
}

export default MiniRow
