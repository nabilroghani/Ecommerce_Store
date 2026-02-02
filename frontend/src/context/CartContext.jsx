import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add ya Increase Quantity
  const addToCart = (product) => {
    setCartItems((prev) => {
      const isExist = prev.find((item) => item._id === product._id);
      if (isExist) {
        return prev.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart"); 
  };

  // Decrease Quantity (Auto remove at 0)
  const decreaseQty = (id) => {
    setCartItems((prev) => {
      const item = prev.find((i) => i._id === id);
      if (item.qty === 1) {
        return prev.filter((i) => i._id !== id);
      }
      return prev.map((i) =>
        i._id === id ? { ...i, qty: i.qty - 1 } : i
      );
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart, decreaseQty, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);