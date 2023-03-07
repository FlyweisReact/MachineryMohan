/** @format */

import { Routes, Route } from "react-router-dom";
import Login from "./components/forms/Login";
import Dashboard from "./components/pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Orders from "./components/pages/orders/Orders";
import ViewOrder from "./components/pages/orders/ViewOrder";
import Products from "./components/pages/products/Products";
import ViewProduct from "./components/pages/products/ViewProduct";
import Customers from "./components/pages/Customers/Customers";
import Payment from "./components/pages/Payment/Payment";
import Inventory from "./components/pages/Inventory/Inventory";
import Discount from "./components/pages/Discount/Discount";
import Cat from "./components/pages/Cat/Cat";
import Coupon from "./components/pages/Coupon/Coupon";
import Admin from "./components/pages/Admin/Admin";
import Complaint from "./components/pages/Complaint/Complaint";
import SubCategory from "./components/pages/SubCategory/SubCategory";
import Machine from "./components/pages/Machine/Machine";
import ViewMachine from "./components/pages/Machine/ViewMachine";
import Services from "./components/pages/Services/Services";
import GetLeasling from "./components/pages/Leasling/GetLeasling";
import Jobs from "./components/pages/Jobs/Jobs";
import Terms from "./components/pages/Terms";
import Privacy from "./components/pages/Privacy";
import Help from "./components/pages/Help";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/customer" element={<Customers />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/viewOrder/:id" element={<ViewOrder />} />
        <Route path="/products" element={<Products />} />
        <Route path="/viewProduct/:id" element={<ViewProduct />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/discount" element={<Discount />} />
        <Route path="/cat" element={<Cat />} />
        <Route path="/coupon" element={<Coupon />} />
        <Route path="/complaint" element={<Complaint />} />
        <Route path="/subCat" element={<SubCategory />} />
        <Route path="/machine" element={<Machine />} />
        <Route path="/machine/:id" element={<ViewMachine />} />
        <Route path="/services" element={<Services />} />
        <Route path="/leas" element={<GetLeasling />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/help" element={<Help />} />

      </Routes>
    </>
  );
}

export default App;
