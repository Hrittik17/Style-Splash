import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart-context';
import Button from '../button/button-component'
import CartItem from "../cart-items/cart-items-component"
import './cart-dropdown-styles.scss';

const CartDropdown = () => {
    const navigate = useNavigate()
    const goToCheckOut = () => navigate('/checkout')

    const { cartItems } = useContext(CartContext)
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map((items) => <CartItem key={items.id} cartItem={items} />)}
            </div>
            <Button onClick={goToCheckOut}>Go to Cart </Button>
        </div>
    )
}

export default CartDropdown;

