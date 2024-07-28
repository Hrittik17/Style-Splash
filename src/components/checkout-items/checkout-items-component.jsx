import { useContext } from 'react';
import { CartContext } from '../../contexts/cart-context';
import './checkout-items-styles.scss';

const CheckOutItems = ({cartItem})=>{
    const {name,quantity,imageUrl,price} = cartItem
    const {clearCartItems,addItemToCart,removeItemFromCart} = useContext(CartContext)
    
    const addIncrement = ()=> addItemToCart(cartItem)
    const addDecrement = ()=> removeItemFromCart(cartItem)
    const clearCartHandler = ()=> clearCartItems(cartItem)

    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className="name">{name}</span>
            <span className="price">{price}</span>
            <span className="quantity">
                <div className='arrow' onClick={addDecrement}>
                    &#10094;
                </div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={addIncrement}>
                    &#10095;
                </div>
            </span>
            <div className="remove-button" onClick={clearCartHandler}>&#10005;</div>
        </div>
    )

}

export default CheckOutItems;