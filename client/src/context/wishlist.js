import { useState, useContext, createContext, useEffect } from "react";

const WishContext = createContext();
const WishListProvider = ({ children }) => {
  const [Wishlist, setWishlist] = useState([]);

  useEffect(() => {
    let existingListItem = localStorage.getItem("wishlist");
    if (existingListItem) setWishlist(JSON.parse(existingListItem));
  }, []);

  return (
    <WishListContext.Provider value={[Wishlist, setWishlist]}>
      {children}
    </WishListContext.Provider>
  );
};

// custom hook
const useWishList = () => useContext(WishContext);

export { useWishList, WishListProvider };
