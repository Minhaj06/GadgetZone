import toast from "react-hot-toast";

const addToWishlist = (product, wishlist, setWishlist) => {
  const exists = wishlist.find((item) => item._id === product?._id);
  if (!exists) {
    const updatedWishlist = [...wishlist, { ...product }];
    setWishlist(updatedWishlist);

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    toast.success("Added to wishlist");
  } else {
    const updatedWishlist = wishlist.map((item) =>
      item._id === product?._id ? { ...item } : item
    );
    setWishlist(updatedWishlist);

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    toast.success("Added to wishlist");
  }
};

const removeFromWishlist = (id, wishlist, setWishlist) => {
  const updatedWishlist = wishlist.filter((item) => item?._id !== id);
  setWishlist(updatedWishlist);
  localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  toast.success("Removed from wishlist.");
};

const removeAllFromWishlist = (setWishlist) => {
  localStorage.removeItem("wishlist");
  setWishlist([]);
  toast.success("Removed all products from wishlist");
};

export { addToWishlist, removeFromWishlist, removeAllFromWishlist };
