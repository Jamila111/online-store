import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utils/formatCurrency.ts";

type StoreItemProps = {
    id: number;
    name: string;
    price: number;
    imgUrl: string;
    description: string;
    category: string;
    brand: string;
    rating: number;
    onImageClick: () => void;
};

export function StoreItem({
                              id,
                              name,
                              description,
                              price,
                              imgUrl,
                              category,
                              rating,
                              brand,
                              onImageClick,
                          }: StoreItemProps) {
    const {
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
    } = useShoppingCart();

    const quantity = getItemQuantity(id);

    return (
        <Card
            className="text-center h-100"
            border="primary"
            style={{ width: "18rem" }}
        >
            <div onClick={onImageClick} style={{ cursor: "pointer" }}>
                <Card.Img
                    variant="top"
                    src={imgUrl}
                    style={{ objectFit: "cover" }}
                    className="mb-3"
                    height="250px"
                    width="250px"
                />
            </div>
            <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-baseline mb-3">
                    <span className="fs-5">{brand}</span>
                    <span className="text-bg-success">{formatCurrency(price)}</span>
                </div>
                <div className="mb-2">
                    <span className="badge bg-secondary me-2">{category}</span>
                </div>
                <div className="mb-2 d-flex align-items-center">
                    {rating} ⭐️
                </div>
                <Card.Title className="text-black" style={{ gap: "1rem" }}>
                    {name}
                </Card.Title>
                <Card.Text>{description}</Card.Text>

                <div className="mt-auto">
                    {quantity === 0 ? (
                        <Button
                            className="w-100"
                            variant="primary"
                            onClick={() => increaseCartQuantity(id)}
                        >
                            + Add to Cart
                        </Button>
                    ) : (
                        <div
                            className="d-flex align-items-center flex-column"
                            style={{ gap: "1rem" }}
                        >
                            <div
                                className="d-flex justify-content-center align-items-center"
                                style={{ gap: "1rem" }}
                            >
                                <Button
                                    variant="outline-secondary"
                                    onClick={() => decreaseCartQuantity(id)}
                                >
                                    -
                                </Button>
                                <div>
                                    <span>{quantity}</span> in cart
                                </div>
                                <Button
                                    variant="outline-secondary"
                                    onClick={() => increaseCartQuantity(id)}
                                >
                                    +
                                </Button>
                            </div>
                            <Button
                                variant="outline-danger"
                                onClick={() => removeFromCart(id)}
                            >
                                Remove
                            </Button>
                        </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}
