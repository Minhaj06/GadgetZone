import toast from "react-hot-toast";

const addToCart = (product, cartQuantity = 1, cart, setCart) => {
  const exists = cart.find((item) => item._id === product?._id);
  if (!exists) {
    const updatedCart = [...cart, { ...product, cartQuantity: cartQuantity }];
    setCart(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Added to cart");
  } else {
    const updatedCart = cart.map((item) =>
      item._id === product?._id ? { ...item, cartQuantity: cartQuantity } : item
    );
    setCart(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Added to cart");
  }
};

const removeFromCart = (id, cart, setCart) => {
  const updatedCart = cart.filter((item) => item?._id !== id);
  setCart(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  toast.success("Removed from cart.");
};

const removeAllFromCart = (setCart) => {
  localStorage.removeItem("cart");
  setCart([]);
  toast.success("Removed all products from cart");
};

export { addToCart, removeFromCart, removeAllFromCart };
