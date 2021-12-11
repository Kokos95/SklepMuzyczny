import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Layout from '../components/Layout'
import { getUserOrders } from '../database'

const OrderItemContainer = styled.div`
    background-color: #fff;
    border-radius: 6px;
    margin: 25px auto 0;
    padding: 30px;
    max-width: 700px;
    text-align: left;
    position: relative;
`

const OrderItem = ({item}) => {

    return(
        <OrderItemContainer>
            ID zamówienia: {item.date}<br/>
            Suma: {item.total}zł<br/>
            <br/>
            Produkty:<br />
            <ul>
                { item.items.map(i => <li key={i.id}>[ 1x {i.price}zł ] {i.name}</li>) }
            </ul>
        </OrderItemContainer>
    )
}

const Orders = () => {
    const [list, setList] = useState([])

    useEffect(() => {
        getUserOrders().then(data => setList(data))
    }, [])

    return(
        <Layout showMenu>
            {
                list.length === 0
                ?
                <>Lista jest pusta</>
                :
                list.map(order => (
                    <OrderItem key={order.date} item={order} />
                ))
            }
        </Layout>
    )
}

export default Orders
