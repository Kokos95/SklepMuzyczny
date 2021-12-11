import React, { useState } from 'react'
import Layout from '../components/Layout'
import ShopItem from '../components/ShopItem'
import { getUserCart, clearCart, createNewOrderFromCart } from '../database'
import { FormButton } from '../components/forms'

const Cart = ({history}) => {
    const [, setForceRefresh] = useState(false)

    let totalSum = 0

    const clearCartOnClick = () => {
        clearCart()
        setForceRefresh(v => !v)
    }

    const orderOnClick = () => {
        createNewOrderFromCart().then(() => {
            history.push('/orders')
            setForceRefresh(v => !v)
        })
    }

    return(
        <Layout showMenu>
            <div style={{margin: '20px'}}>
                <FormButton onClick={clearCartOnClick}>
                    Wyczyść koszyk
                </FormButton>
            </div>
            {
                getUserCart().map(product => {
                    totalSum += product.price
                    return <ShopItem key={product.id} item={product} removeBtn onRemove={() => setForceRefresh(v => !v)} />
                })
            }
            <div style={{margin: '20px'}}>
                Razem do zapłaty: {totalSum}zł<br /><br />
                <FormButton onClick={orderOnClick}>
                    Potwierdź i złóż zamówienie
                </FormButton>
            </div>
        </Layout>
    )
}

export default Cart
