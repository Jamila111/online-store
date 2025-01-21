import { Button, Container, Nav, Navbar as NavbarBs, NavbarBrand, NavbarCollapse, NavbarToggle, Form, Offcanvas } from "react-bootstrap"
import {NavLink, useLocation, useNavigate} from "react-router-dom"
import { BsFillCartCheckFill } from "react-icons/bs";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Cart } from "./Cart.tsx";
import { Store } from "../pages/Store.tsx";
import { useState, useEffect } from "react";


export function Navbar() {
    const navigate = useNavigate();

    const { cartQuantity, isOpen, setIsOpen, searchText, setSearchText, showSearch, setShowSearch, handleClose} = useShoppingCart();
    const [expanded, setExpanded] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setExpanded(false);
    }, [location]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        setSearchText(searchValue);
        if (!showSearch) {
            setShowSearch(true);
        }
        navigate(`/store?search=${searchValue}`);
    };

    const navigateToStore = () => {
        navigate(`/store?search=${searchText}`);
    };


    const handleToggle = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <NavbarBs
                fixed="top"
                bg="dark"
                data-bs-theme="dark"
                className="mb-4"
                expand="lg"
                expanded={expanded}
            >
                <Container>
                    <NavbarBrand as={NavLink} to="/" onClick={() => setExpanded(false)}>
                        <img
                            style={{width: '50px', height: '50px'}}
                            src="/imgs/logo.jpg"
                            alt="logo"
                        />
                    </NavbarBrand>

                    <div className="d-flex order-lg-2 ms-auto">
                        <Form className="me-2 d-none d-lg-flex" style={{ width: '300px' }}>
                            <Form.Control
                                placeholder="Search for item..."
                                size="sm"
                                type="text"
                                value={searchText}
                                onChange={handleSearchChange}
                            />
                            <Button variant='outline-secondary'
                                    onClick={() => setShowSearch(true)}

                            >
                            Search
                            </Button>
                        </Form>

                        <Button
                            variant="outline-primary"
                            className="rounded-circle me-2"
                            style={{ width: "3rem", height: "3rem", position: "relative" }}
                            onClick={() => setIsOpen(true)}
                        >
                            <BsFillCartCheckFill size='1.7rem' />
                            {cartQuantity > 0 && (
                                <div
                                    className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                                    style={{
                                        color: "white",
                                        width: "1.5rem",
                                        height: "1.5rem",
                                        position: "absolute",
                                        bottom: 0,
                                        right: 0,
                                        transform: "translate(25%, 25%)",
                                    }}
                                >
                                    {cartQuantity}
                                </div>
                            )}
                        </Button>

                        <NavbarToggle
                            aria-controls="basic-navbar-nav"
                            onClick={handleToggle}
                        />
                    </div>

                    <NavbarCollapse id="basic-navbar-nav" className="order-lg-1">
                        <Nav className="me-auto">
                            <Nav.Link
                                to="/"
                                as={NavLink}
                                onClick={() => setExpanded(false)}
                            >
                                Home
                            </Nav.Link>
                            <Nav.Link
                                to="/blog"
                                as={NavLink}
                                onClick={() => setExpanded(false)}
                            >
                                Blog
                            </Nav.Link>
                            <Nav.Link
                                to="/contacts"
                                as={NavLink}
                                onClick={() => setExpanded(false)}
                            >
                                Contacts
                            </Nav.Link>
                            <Nav.Link
                                to="/store"
                                as={NavLink}
                                onClick={() => setExpanded(false)}
                            >
                                Store
                            </Nav.Link>
                        </Nav>

                        <Form className="d-lg-none mt-2">
                            <Form.Control
                                placeholder="Search for item..."
                                size="sm"
                                type="text"
                                value={searchText}
                                onChange={handleSearchChange}
                                onClick={() => setShowSearch(true)}
                            />
                        </Form>
                    </NavbarCollapse>
                </Container>
            </NavbarBs>

            <Cart isOpen={isOpen} />

            <Offcanvas
                show={showSearch}
                onHide={handleClose}
                placement="bottom"
                style={{ height: '90vh' }}
            >
                <Offcanvas.Header>
                    <Form className="me-2 d-none d-lg-flex" style={{ width: '300px' }}>
                        <Form.Control
                            placeholder="Search for item..."
                            size="sm"
                            type="text"
                            value={searchText}
                            onChange={handleSearchChange}
                            onClick={navigateToStore}
                        />
                    </Form>
                    <Offcanvas.Title>Search Results</Offcanvas.Title>
                    <Button
                        variant="outline-secondary"
                        onClick={handleClose}
                        className="ms-auto"
                    >
                        ×
                    </Button>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Store />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}