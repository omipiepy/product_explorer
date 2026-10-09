import {Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartItem = ({item}) => {
    const { setQuantity, removeItem} = useCart();

    return (
        <li className="flex gap-4 border-b py-4 dark:border-gray-700">
            <div className = "h-24 w-24 shronk-0 bg-gray-100">
                <img
                    src={item.thumbnail}
                    alt={item.title}
                    width="96"
                    height="96"
                    className="h-full w-full object-contain"
                    />
            </div>

            <div className="flex-1">
                <Link to={`/products/${item.id}`} className="font-medium underline">
                    {item.title}
                </Link>
                <p className="text-gray-600 dark:text-gray-400">${item.price.toFixed(2)} each</p>

                <div className="mt-2 flex items-center gap-2">
                    <button 
                    onClick={ () => setQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    aria-label={`Decrease quantity of ${item.title}`}
                    className="rounded border px-2 py-1 disabled:cursor-not-allowed disabled:opacity-50 h-8 w-8"
                    >
                        -
                    </button>
                <span aria-live="polite" className="mx-2">{item.quantity}</span>
                <button 
                    onClick={ () => setQuantity(item.id, item.quantity + 1)}
                    aria-label={`Increase quantity of ${item.title}`}
                    className="rounded border px-2 py-1 h-8 w-8"
                    >
                        +
                </button>
                <button
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.title} from cart`}
                    className="ml-4 rounded border bg-red-100 px-2 py-1 text-red-700"
                    >
                    Remove
                </button>
                </div>
            </div>

            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
        </li>
    )
}

export default CartItem