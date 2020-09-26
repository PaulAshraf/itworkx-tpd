import React from 'react'
import styled from 'styled-components'

import { Button } from 'antd'
import colors from '../styles/colors'

const Title = (props) => {

    const title = props.title
    const onClick = props.onClick

    return (
        <Container>
            <Heading>{title}</Heading>
            <Button size='small' onClick={onClick}>NEW</Button>
        </Container>
    )
}

const Container = styled.span`
    display: flex;
    align-items: center;
`

const Heading = styled.span`
    font-weight: bold;
    font-size: 3em;
    color: ${colors.red};
    margin-right: 20px;
`

export default Title
