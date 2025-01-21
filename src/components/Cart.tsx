
import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import storeItems from "../data/items.json";
import {formatCurrency} from "../utils/formatCurrency.ts";

type ShoppingCartProps = {
    isOpen: boolean;
};

export function Cart({ isOpen }: ShoppingCartProps) {
    const { setIsOpen, cartItems } = useShoppingCart();

    const total = cartItems.reduce((total, cartItem) => {
        const item = storeItems.find((i) => i.id === cartItem.id);
        return total + (item?.price || 0) * cartItem.quantity;
    }, 0);

    return (
        <Offcanvas show={isOpen} onHide={() => setIsOpen(false)} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>My Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map((item) => (
                        <CartItem key={item.id} {...item} />
                    ))}
                    {cartItems.length > 0 && (
                        <div className="ms-auto fw-bold fs-5">
                            Total: {formatCurrency(total)}
                        </div>
                    )}
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    );
}
