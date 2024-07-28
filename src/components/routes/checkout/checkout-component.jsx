import CheckOutItems from "../../checkout-items/checkout-items-component";
import { useContext } from "react";
import { CartContext } from "../../../contexts/cart-context";
import "./checkout-styles.scss";

const CheckOut = () => {
    const { cartItems, clearCartItems,cartTotal} = useContext(CartContext)
    // const clearCarthandler = ()=> 

    return (
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
            {cartItems.map((cartItem) =>
                <CheckOutItems key={cartItem.id} cartItem={cartItem} />
            )}
            <span className="total">Total : $ {cartTotal}</span>
        </div>
    )
}

export default CheckOut;