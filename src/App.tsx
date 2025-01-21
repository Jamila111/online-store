import {Container} from 'react-bootstrap'
import './App.css'
import {Navbar} from "./components/Navbar.tsx";
import {Route, Routes} from "react-router";
import {Home} from "./pages/Home.tsx";
import {Blog} from "./pages/Blog.tsx";
import {Contacts} from "./pages/Contacts.tsx";
import {Store} from "./pages/Store.tsx";
import {ShoppingCartProvider} from "./context/ShoppingCartContext.tsx";
import { ProductDetail } from "./pages/ProductDetail.tsx";

function App() {

    return (
        <ShoppingCartProvider>

            <Navbar/>

            <Container>
                <Routes>

                    <Route path="/" element={<Home/>}/>
                    <Route path="/blog" element={<Blog/>}/>
                    <Route path="/contacts" element={<Contacts/>}/>
                    <Route path="/store" element={<Store/>}/>
                    <Route path="/store/product/:id" element={<ProductDetail/>}/>


                </Routes>

            </Container>
        </ShoppingCartProvider>
    )
}

export default App
