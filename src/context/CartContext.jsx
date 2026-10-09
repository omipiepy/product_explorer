
import { createContext, useContext, useReducer, useEffect } from "react";
import { cartReducer } from "./cartReducer";

const CartContext = createContext(null);

const STORAGE_KEY = "product_explorer_cart_key";

function loadCart() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
}

const CartProvider = ({ children }) => {
    const [items, dispatch] = useReducer(
        cartReducer,
        [],
        loadCart
    );

    useEffect(() => {
        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(items)
            );
        } catch {
            // Handle storage errors if needed
        }
    }, [items]);

    const itemCount = items.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const value = {
        items,
        itemCount,
        subtotal,
        addItem: (product) =>
            dispatch({ type: "ADD", product }),
        removeItem: (id) =>
            dispatch({ type: "REMOVE", id }),
        setQuantity: (id, quantity) =>
            dispatch({ type: "SET_QUANTITY", id, quantity }),
        clearCart: () =>
            dispatch({ type: "CLEAR" }),
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error(
            "useCart must be used within a CartProvider"
        );
    }

    return context;
};

export { CartProvider, useCart };