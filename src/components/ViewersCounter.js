import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import firebase from '../firebase/firebase'

const Container = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.2rem;
  background-color: #bebebe;
  padding: 5px 10px;
  border-radius: 5px;
  opacity: ${props => props.show ? 100 : 0};
  transition: 1s;
`

const ViewersCounter = () => {
    const [count, setCount] = useState(null)

    useEffect(() => {
        const docRef = firebase.firestore().collection('stats').doc('viewers')
        docRef.get()
            .then(doc => {
                let c = doc.exists && doc.data().count
                if(c) {
                    setCount(++c)
                    docRef.set({ count: c })
                }else{
                    setCount(1)
                    docRef.set({ count: 1 })
                }
            })
    }, [])

    return(
        <Container show={count !== null}>
            Licznik odwiedzin: {count || 0}
        </Container>
    )
}

export default ViewersCounter