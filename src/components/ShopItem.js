import React from 'react'
import {addToCart, removeFromCart} from '../database'
import styled from 'styled-components'
import { getProductsImages } from '../config/productsImages'

const ShopItemContainer = styled.div`
  background-color: #fff;
  border-radius: 6px;
  margin: 25px auto 0;
  padding: 30px;
  max-width: 700px;
  text-align: left;
  display: flex;
  position: relative;
`

const BuyButton = styled.button`
  position: absolute;
  right: 20px;
  bottom: 20px;
  background-color: #0d8e0d;
  color: #fff;
  padding: 10px;
  border-radius: 4px;
  border: none;
  transition: .3s;

  &:hover {
    cursor: pointer;
    background-color: #097109;
  }
`

const ImageColumn = styled.div`
  flex: 1;
  text-align: center;

  img {
    max-width: 200px;
    max-height: 200px;
  }
`

const DataColumn = styled.div`
  flex: 2;

  .title {
    font-size: 26px;
    font-weight: bold;
  }

  .category {
    margin-top: 5px;
    font-size: 18px;
    color: #5c5c5c;
  }

  .description {
    margin-top: 5px;
    font-size: 14px;
    color: #2f2f2f;
  }

  .price {
    margin: 30px 0 0 5px;
    font-size: 32px;
    font-weight: bold;
  }
`

const ShopItem = ({item, addBtn, removeBtn, onRemove}) => {

    const buyThis = () => {
        if(addToCart(item) === 'OK') {
            alert('Dodano do koszyka!')
        }else{
            alert('Produkt już znajduje się w koszyku')
        }
    }

    const removeThis = () => {
        if(removeFromCart(item.id) === 'OK') {
            if(onRemove) onRemove()
        }
    }

    return(
        <ShopItemContainer>
            <ImageColumn>
                <img src={getProductsImages(item.id)} alt={item.name} />
            </ImageColumn>
            <DataColumn>
                <div className={'title'}>{item.name}</div>
                <div className={'category'}>{item.category.name}</div>
                <div className={'description'}>{item.description}</div>
                <div className={'price'}>{item.price}zł</div>
            </DataColumn>
            { addBtn && <BuyButton onClick={buyThis}>Dodaj do koszyka</BuyButton> }
            { removeBtn && <BuyButton style={{ backgroundColor: '#c20000' }} onClick={removeThis}>Usuń z koszyka</BuyButton> }
        </ShopItemContainer>
    )
}

export default ShopItem
