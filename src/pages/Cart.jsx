import React from 'react'
import {Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem.jsx";

const Cart = () => {
  const {items, itemCount, subtotal, clearCart} = useCart();
  if (items.length === 0) {
  return (
    <section className="mx-auto max-w-6xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Your Cart</h1>
      <p className="mb-4">Your cart is empty.</p>
      <Link to="/" className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
        Continue Shopping
      </Link>
    </section>
  )
}
return (
  <section>
    <h1 className="mb-4 text-2xl font-bold">Your Cart</h1>
    <ul className="divide-y">
      {items.map(item => (
        <CartItem key={item.id} item={item} />
      ))}
    </ul>
    <div className="mt-4 flex justify-between">
      <p className="text-lg font-semibold">Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"}): ${subtotal.toFixed(2)}</p>
      <div className="flex justify-between">
            <dt>Shipping</dt>
            <dd>Free</dd>
          </div>
      <div className="flex gap-4">
        <button
          onClick={clearCart}
          className="rounded border bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          Clear Cart
        </button>
      </div>
    </div>
  </section>
)
}
export default Cart