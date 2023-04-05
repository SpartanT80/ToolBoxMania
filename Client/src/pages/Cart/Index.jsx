import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { modifyCart } from '../../store/slices/cart';
import { calculateTotalAmount, addOneToCart, deleteOneFromCart } from '../../helpers/cart';

import style from "./cart.module.css";

const Cart = () => {
    const cart = useSelector(state => state.cart.cart);
    const dispatch = useDispatch();
    const totalAmount = useSelector(state => state.cart.totalAmount);

    const handleRemove = (item) => {
        const updatedCart = cart.filter(cartItem => cartItem.id !== item.id);
        const updatedTotalAmount = calculateTotalAmount(updatedCart).toFixed(2);
        dispatch(modifyCart({ cart: updatedCart, totalAmount: updatedTotalAmount }));
    };

    const handleAddOne = (item) => {
        const updatedCart = addOneToCart(cart, item);
        const updatedTotalAmount = calculateTotalAmount(updatedCart).toFixed(2);
        dispatch(modifyCart({ cart: updatedCart, totalAmount: updatedTotalAmount }));
    };

    const handleDeleteOne = (item) => {
        const updatedCart = deleteOneFromCart(cart, item);
        const updatedTotalAmount = calculateTotalAmount(updatedCart).toFixed(2);
        dispatch(modifyCart({ cart: updatedCart, totalAmount: updatedTotalAmount }));
    };

    return (
        <section className={style.ctn}>
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map(item => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <button className={style.deleteBtn} onClick={() => handleDeleteOne(item)}>-</button>
                                        {item.quantity}
                                        <button className={style.addBtn} onClick={() => handleAddOne(item)}>+</button>
                                    </td>
                                    <td>{item.totalAmount}</td>
                                    <td>
                                        <button className={style.removeBtn} onClick={() => handleRemove(item)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p>Total Price: {totalAmount}</p>
                </>
            )}
        </section>
    );
};

export default Cart;
