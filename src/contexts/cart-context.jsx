import { createContext, useState,useEffect } from "react";


const addCartItem = (cartItems, productToAdd) => {
    //find if cartItems.id === productToAdd.id or not
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

    // if existingCartItems is true then increment the quantity..

    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
    }

    // if if havent a product and add it with other products
    return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems,productToRemove)=>{
    //find if cartItems.id === productToAdd.id or not
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id)

    // if existingCartItems is true then decrement the quantity..

    if(existingCartItem.quantity === 1){
        return cartItems.filter((cartItem)=> cartItem.id !== productToRemove.id)
    }

    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
        )
    }

}

const clearCart = (cartItems,cartitemToBecleared)=>{
    return cartItems.filter((cartItem)=> cartItem.id !== cartitemToBecleared.id)
}


export const CartContext = createContext({
    isCartOpen: false,
    setiscartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemFromCart : ()=>{},
    clearCartItems:()=>{},
    cartCount:0,
    cartTotal:0,
})


export const CartProvider = ({ children }) => {
    const [isCartOpen, setiscartOpen] = useState(false)
    const [cartItems, setcartItems] = useState([])
    const [cartCount,setcartCount] = useState(0)
    const [cartTotal,setcartTotal] = useState(0)

    useEffect(()=>{
        const newcartCount = cartItems.reduce((total,cartItem)=> total + cartItem.quantity,0)
        setcartCount(newcartCount)
    },[cartItems])

    useEffect(()=>{
        const newcartCountTotal = cartItems.reduce((total,cartItem)=> total + cartItem.quantity * cartItem.price,0)
        setcartTotal(newcartCountTotal)
    },[cartItems])

    const addItemToCart = (productToAdd) => {
        setcartItems(addCartItem(cartItems, productToAdd))
    }

    const removeItemFromCart = (productToRemove) => {
        setcartItems(removeCartItem(cartItems, productToRemove))
    }

    const clearCartItems = (cartitemToBecleared)=>{
        setcartItems(clearCart(cartItems,cartitemToBecleared))
    }

    const value = { isCartOpen, setiscartOpen, cartItems, addItemToCart,cartCount,removeItemFromCart,clearCartItems,cartTotal}
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}