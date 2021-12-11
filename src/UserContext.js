import React, {createContext, useState, useEffect, useContext} from 'react'
import { useHistory } from 'react-router'
import firebase from './firebase/firebase'

const UserContext = createContext({})

export const AUTH_STATE = {
    AUTHORIZED: 'authorized',
    UNAUTHORIZED: 'unauthorized',
    UNKNOWN: 'unknown',
  }

export const UserProvider = ({children}) => {
    const [auth, setAuth] = useState(AUTH_STATE.UNKNOWN)
    const history = useHistory()

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            setAuth(user ? AUTH_STATE.AUTHORIZED : AUTH_STATE.UNAUTHORIZED)
            history.push(user ? '/shop' : '/')
          })
    }, [history])

    return(
        <UserContext.Provider value={auth}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext)
