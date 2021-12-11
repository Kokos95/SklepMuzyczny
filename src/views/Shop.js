import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import categories from '../config/categories'
import Layout from '../components/Layout'
import ShopItem from '../components/ShopItem'
import {FormButton} from '../components/forms'
import firebase from '../firebase/firebase'

const FilterButtonContainer = styled.div`
  margin-top: 20px;
`

const FilterButton = styled(FormButton)`
  background-color: ${props => props.selected ? '#75a72f' : '#dcdcdc'};
`

const Shop = ({history}) => {
    const [categoryFilter, setCategoryFilter] = useState('')
    const [list, setList] = useState([])

    useEffect(() => {
        firebase.firestore().collection('items').get()
        .then(snap => {
            const docs = []
            snap.forEach(doc => {
                docs.push({
                    id: doc.id,
                    ...doc.data(),
                })
            })
            setList(docs)
        })
    }, [])

    return(
        <Layout showMenu>
            <FilterButtonContainer>
                <FilterButton onClick={() => setCategoryFilter('')} selected={categoryFilter === ''}>
                    Wszystkie
                </FilterButton>
                {
                    Object.values(categories).map(cat => (
                        <FilterButton key={cat.slug} onClick={() => setCategoryFilter(cat.slug)} selected={categoryFilter === cat.slug}>
                            {cat.name}
                        </FilterButton>
                    ))
                }
            </FilterButtonContainer>
            {
                list.length === 0
                ?
                <>Ładowanie danych...</>
                :
                list.filter(product => (
                    categoryFilter === '' || product.category === categoryFilter
                )).map(product => (
                    <ShopItem key={product.id} item={product} addBtn />
                ))
            }
        </Layout>
    )
}

export default Shop
