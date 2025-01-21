import { createContext, ReactNode, useContext, useState } from "react";
import storeItems from "../data/items.json";
import useLocalStorage from "../data/useLocalStorage.ts";

type CartItem = {
    id: number;
    quantity: number;
}

type ShoppingCartContext = {
    searchText: string;
    setSearchText: (text: string) => void;
    filteredItems: StoreItem[];
    setFilteredItems: (items: StoreItem[]) => void;
    getItemQuantity: (id: number) => number;
    increaseCartQuantity: (id: number) => void;
    decreaseCartQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;
    cartQuantity: number;
    cartItems: CartItem[];
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    handleClose: () => void;
    showSearch: boolean;
    setShowSearch: (show: boolean) => void;

}

type ShoppingCartProviderProps = {
    children: ReactNode;
}

type StoreItem = {
    id: number;
    name: string;
    price: number;
    imgUrl: string;
    description: string;
    category: string;
    brand: string;
    rating: number;
}

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [searchText, setSearchText] = useState("");
    const [filteredItems, setFilteredItems] = useState<StoreItem[]>(storeItems);
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(

        "cart-items",
        []
    )
    const [isOpen, setIsOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);


    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0
    );

    const handleClose = () => {
        setShowSearch(false);
    };

    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0;
    }

    function increaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, quantity: 1 }];
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    }

    function decreaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id);
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    }

    function removeFromCart(id: number) {
        setCartItems(currItems => currItems.filter(item => item.id !== id));
    }

    return (
        <ShoppingCartContext.Provider
            value={{
                searchText,
                setSearchText,
                filteredItems,
                setFilteredItems,
                getItemQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
                cartQuantity,
                cartItems,
                isOpen,
                setIsOpen,
                handleClose,
                showSearch,
                setShowSearch
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    );
}
