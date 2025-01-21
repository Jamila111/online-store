import { Col, Row } from "react-bootstrap";
import storeItems from "../data/items.json";
import { StoreItem } from "../components/StoreItem.tsx";
import { useShoppingCart } from "../context/ShoppingCartContext.tsx";
import { useEffect, useMemo } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";

export function Store() {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';
    const { setSearchText, setFilteredItems, setShowSearch, handleClose } = useShoppingCart();
    const navigate = useNavigate();

    const filteredItems = useMemo(() => {
        const searchTerm = searchQuery.toLowerCase().trim();
        return storeItems.filter((item) =>
            item.name.toLowerCase().includes(searchTerm) ||
            item.brand.toLowerCase().includes(searchTerm) ||
            item.category.toLowerCase().includes(searchTerm)
        );
    }, [searchQuery]);

    useEffect(() => {
        setSearchText(searchQuery);
        setFilteredItems(filteredItems);
    }, [searchQuery, filteredItems, setFilteredItems, setSearchText]);

    const handleItemClick = (id: number) => {
        navigate(`/store/product/${id}`, { state: { previousSearch: searchQuery } });
        setShowSearch(false);
        handleClose();
    };

    return (
        <>
            <h1 className="mt-lg-5">Store Page</h1>
            {searchQuery && (
                <h4 className="mb-4">Search results for: "{searchQuery}"</h4>
            )}

            {filteredItems.length === 0 ? (
                <div className="text-center mt-4">
                    <h3>No items found {searchQuery && `matching "${searchQuery}"`}</h3>
                </div>
            ) : (
                <Row xs={1} sm={1} md={2} lg={3} className="g-3">
                    {filteredItems.map((item) => (
                        <Col key={item.id}>
                            <Link
                                to={`/store/product/${item.id}`}
                                style={{textDecoration: 'none'}}
                                onClick={() => handleItemClick(item.id)}
                                className="d-block h-100"
                            >
                                <StoreItem {...item} />
                            </Link>
                        </Col>
                    ))}
                </Row>
            )}
        </>
    );
}