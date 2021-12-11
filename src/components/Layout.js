import React from 'react'
import styled from 'styled-components'
import LogoImage from '../images/logo.png'
import {useHistory} from 'react-router'
import { HomeOutlined, ShoppingCartOutlined, ShoppingOutlined, LogoutOutlined } from '@ant-design/icons'
import firebase from '../firebase/firebase'
import ViewersCounter from './ViewersCounter'

const Container = styled.div`
  position: relative;
  background-color: #a5a5a5;
  margin: 0 auto;
  padding: 40px 0;
  text-align: center;
  max-width: 1000px;
  min-height: 100vh;
  box-shadow: 0 0 30px 2px rgba(0,0,0,0.85);
`

const Logo = styled.img`
  display: block;
  margin: 0 auto;
  padding: 30px 0 50px;
  max-width: 70vw;
`

const MainMenu = styled.div`
  background-color: #e0e0e0;
  display: flex;
  flex-direction: row;
  border-top: 2px solid #767676;
  border-bottom: 2px solid #767676;
`

const MenuItem = styled.div`
  flex: 1;
  cursor: pointer;
  min-height: 40px;
  transition: .2s;
  padding: 15px;
  border-left: 1px solid #aaaaaa;

  span {
    display: block;
    font-size: 2rem;
    padding-bottom: 5px;
  }

  &:first-child {
    border-left: none;
  }

  &:hover {
    background-color: #c7c7c7;
  }
`

const Layout = ({children, showMenu}) => {
    const history = useHistory()

    const signOut = () => {
        firebase.auth().signOut()
        history.push('/')
    }

    const menuConfig = [
        { action: () => history.push('/shop'), text: 'Produkty', icon: <HomeOutlined /> },
        { action: () => history.push('/cart'), text: 'Koszyk', icon: <ShoppingCartOutlined /> },
        { action: () => history.push('/orders'), text: 'Moje zamówienia', icon: <ShoppingOutlined /> },
        { action: signOut, text: 'Wyloguj', icon: <LogoutOutlined /> },
    ]

    return (
        <Container>
          <ViewersCounter />
            <Logo src={LogoImage} />
            {
                showMenu
                &&
                <MainMenu>
                    {
                        menuConfig.map(item => (
                            <MenuItem key={item.text} onClick={item.action}>
                                {item.icon}
                                {item.text}
                            </MenuItem>
                        ))
                    }
                </MainMenu>
            }
            {children}
        </Container>
    )
}

export default Layout
