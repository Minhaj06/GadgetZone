import { useState, createContext, useContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let existingCart = localStorage.getItem("cart");
    if (existingCart) setCart(JSON.parse(existingCart));
  }, []);

  return <CartContext.Provider value={[cart, setCart]}>{children}</CartContext.Provider>;
};

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };

//
//
//
//
//
//
// import { useState, createContext, useContext, useEffect } from "react";

// const CartContext = createContext();

// const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     let existingCart = localStorage.getItem("cart");
//     if (existingCart) setCart(JSON.parse(existingCart));
//   }, []);

//   const addToCart = (product) => {
//     const existingProductIndex = cart.findIndex((item) => item.id === product.id);
//     if (existingProductIndex !== -1) {
//       const updatedCart = [...cart];
//       updatedCart[existingProductIndex].cartQuantity += 1;
//       setCart(updatedCart);
//       localStorage.setItem("cart", JSON.stringify(updatedCart));
//     } else {
//       const updatedCart = [...cart, { ...product, cartQuantity: 1 }];
//       setCart(updatedCart);
//       localStorage.setItem("cart", JSON.stringify(updatedCart));
//     }
//   };

//   return <CartContext.Provider value={{ cart, addToCart }}>{children}</CartContext.Provider>;
// };

// const useCart = () => useContext(CartContext);

// export { useCart, CartProvider };
