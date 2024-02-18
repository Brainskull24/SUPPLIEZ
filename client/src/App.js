import {Routes,Route} from "react-router-dom";
import './App.css'
import Homepage from "./components/Homepage"
import Login from "./pages/Auth/login"
import Register from "./pages/Auth/register"
import About from './components/About'
import Contact from './components/Contact'
import ForgotPassword from "./pages/Auth/forgotPassword";
import AdminRoute from "./components/Routes/AdminRoute";
import Adashboard from './pages/admin/dashboard';
import CreateCategory from "./pages/admin/createCategory"
import CreateProduct from "./pages/admin/createProduct";
import UpdateProduct from "./pages/admin/updateProduct";
import Products from "./pages/admin/allProducts";
import Users from "./pages/admin/Users";
import SupplierRoute from "./components/Routes/SupplierRoute";
import Sdashboard from "./pages/user/Dashboard";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct.js";
import Policy from "./components/Policy";
import Pagenotfound from "./components/Pagenotfound";
import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/admin/AdminOrders";
import ProfilePage from "./pages/profile";
function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<Homepage />}/>
          <Route path="/dashboard" element = {<AdminRoute />}>
            <Route path="admin" element = {<Adashboard />}/>
            <Route path="admin/createcategory" element = {<CreateCategory />}/>
            <Route path="admin/createproduct" element = {<CreateProduct />}/>
            <Route path="admin/products" element={<Products />} />
            <Route path="admin/product/:slug" element = {<UpdateProduct />} />
            <Route path="admin/users" element = {<Users />} />
            <Route path="admin/orders" element={<AdminOrders />} />
          </Route>

          <Route path="/dashboard" element={<SupplierRoute />}>
            <Route path="user" element={<Sdashboard />} />
            <Route path="user/orders" element={<Orders />} />
            <Route path="user/profile" element={<Profile />} />
          </Route>
          
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:slug" element={<CategoryProduct />} />
          <Route path="/search" element={<Search />} />
          <Route path="/register" element = {<Register/>}/>
          <Route path="/login" element = {<Login/>}/>
          <Route path ="/about" element = {<About/>}/>
          <Route path ="/contact" element = {<Contact/>}/>
          <Route path ="/profile" element = {<ProfilePage/>}/>
          <Route path="/forgot-password" element = {<ForgotPassword/>}/>
          <Route path="/policy" element={<Policy />} />
          <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
