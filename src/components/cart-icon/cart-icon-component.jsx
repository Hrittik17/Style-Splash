import React from 'react';
import {useContext} from 'react';
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import './cart-icon-styles.scss';
import { CartContext } from '../../contexts/cart-context';

const CartIcon = ()=>{
    const {isCartOpen,setiscartOpen,cartCount} = useContext(CartContext)

    const toggleIsOpenCart = ()=> setiscartOpen(!isCartOpen)
    return (
        <div className='cart-icon-container' onClick={toggleIsOpenCart}>
            <ShoppingIcon className="shopping-icon"/>
            <span className='item-count'>{cartCount}</span>
        </div>
    )
}

export default CartIcon;