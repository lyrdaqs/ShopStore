import { HashRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import HomePage from './screens/HomePage.js';
import ProductPage from './screens/ProductPage.js';
import CartPage from './screens/CartPage.js';
import LoginPage from './screens/LoginPage.js';
import RegisterPage from './screens/RegisterPage.js';
import ProfilePage from './screens/ProfilePage.js';
import ShippingPage from './screens/ShippingPage.js';
import PaymentPage from './screens/PaymentPage.js';
import PlaceorderPage from './screens/PlaceorderPage.js';
import OrderPage from './screens/OrderPage.js';
import UserListPage from './screens/UserListPage.js';
import UserEditPage from './screens/UserEditPage.js';
import ProductListPage from './screens/ProductListPage.js';
import ProductEditPage from './screens/ProductEditPage.js';
import OrderListPage from './screens/OrderListPage.js';
import {Container} from 'react-bootstrap';

function App() {
  return (
    <Router>
       <Header/>
          <main className="py-3">
              <Container>
                <Route path="/" component={HomePage} exact />
                <Route path="/product/:id" component={ProductPage} />
                <Route path="/cart/:id?" component={CartPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <Route path="/profile" component={ProfilePage} />
                <Route path="/shipping" component={ShippingPage} />
                <Route path="/payment" component={PaymentPage} />
                <Route path="/placeorder" component={PlaceorderPage} />
                <Route path="/order/:id" component={OrderPage} />
                <Route path="/admin/users" component={UserListPage} />
                <Route path="/admin/user/:id/edit" component={UserEditPage} />
                <Route path="/admin/products" component={ProductListPage} />
                <Route path="/admin/product/:id/edit" component={ProductEditPage} />
                <Route path="/admin/orders" component={OrderListPage} />
              </Container>
          </main>
       <Footer/>
    </Router>
  );
}

export default App;
