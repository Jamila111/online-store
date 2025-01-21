import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/items.json";
import {formatCurrency} from "../utils/formatCurrency.ts";

type ProductDetailParams = {
    id: string;
};

export function ProductDetail() {
    const { id } = useParams<ProductDetailParams>();
    const navigate = useNavigate();
    const location = useLocation();
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart();

    const previousSearch = location.state?.previousSearch || '';
    const item = storeItems.find(i => i.id === parseInt(id || '0'));

    if (!item) {
        return (
            <Container className="mt-lg-5">
                <h2>Product not found</h2>
                <Button
                    variant="primary"
                    onClick={() => navigate(previousSearch ? `/store?search=${previousSearch}` : '/store')}
                >
                    Back to Store
                </Button>
            </Container>
        );
    }

    const quantity = getItemQuantity(item.id);

    return (
        <Container className="mt-lg-5">
            <Button
                variant="outline-primary"
                className="mb-4"
                onClick={() => navigate(previousSearch ? `/store?search=${previousSearch}` : '/store')}
            >
                Back to Store
            </Button>

            <Row>
                <Col md={6}>
                    <Card>
                        <Card.Img
                            variant="top"
                            src={item.imgUrl}
                            height="400px"
                            style={{ objectFit: "cover" }}
                        />
                    </Card>
                </Col>
                <Col md={6}>
                    <h1>{item.name}</h1>
                    <h2 className="text-muted mb-4">{formatCurrency(item.price)}</h2>
                    <p className="mb-4">{item.description}</p>
                    <p><strong>Brand:</strong> {item.brand}</p>
                    <p><strong>Category:</strong> {item.category}</p>
                    <p><strong>Rating:</strong> {item.rating} ⭐️</p>

                    <div className="mt-4">
                        {quantity === 0 ? (
                            <Button
                                className="w-100"
                                onClick={() => increaseCartQuantity(item.id)}
                            >
                                Add to Cart
                            </Button>
                        ) : (
                            <div className="d-flex align-items-center flex-column">
                                <div className="d-flex align-items-center justify-content-center gap-2">
                                    <Button onClick={() => decreaseCartQuantity(item.id)}>-</Button>
                                    <span className="fs-3">{quantity} in cart</span>
                                    <Button onClick={() => increaseCartQuantity(item.id)}>+</Button>
                                </div>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    className="mt-2"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    Remove
                                </Button>
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}