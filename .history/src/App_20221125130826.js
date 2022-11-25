/** @format */

import { Routes, Route } from "react-router-dom";
import Login from "./components/forms/Login";
import Dashboard from "./components/pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Orders from "./components/pages/orders/Orders";
import ViewOrder from "./components/pages/orders/ViewOrder";
import DeleteOrder from "./components/pages/orders/DeleteOrder";
import Products from "./components/pages/products/Products";
import ViewProduct from "./components/pages/products/ViewProduct";
import Customers from "./components/pages/Customers/Customers";
import Service from "./components/pages/Services/Service";
import EditService from "./components/pages/Services/EditService";
import ViewService from "./components/pages/Services/ViewService";
import AddService from "./components/pages/Services/AddService";
import Payment from "./components/pages/Payment/Payment";
import Inventory from "./components/pages/Inventory/Inventory";
import Discount from "./components/pages/Discount/Discount";
import Cat from "./components/pages/Cat/Cat";
import Editcat from "./components/pages/Cat/Editcat";
import AddCat from "./components/pages/Cat/AddCat";
import AddSubCat from "./components/pages/Cat/AddSubCat";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/*----------------------  Orders  ---------------------------- */}
        <Route path="/orders" element={<Orders />} />
        <Route path="/viewOrder/:id" element={<ViewOrder />} />
        <Route path="/deleteOrder/:id" element={<DeleteOrder />} />
        {/*----------------------------------------------------------------- */}

        {/*----------------------  Products  --------------------------------- */}
        <Route path="/products" element={<Products />} />
        <Route path="/viewProduct/:id" element={<ViewProduct />} />
        {/*----------------------------------------------------------------- */}

        {/*-----------------------  Customer  ------------------------------ */}
        <Route path="/customer" element={<Customers />} />
        {/*----------------------------------------------------------------- */}

        {/*-------------------------  Services  ------------------------------ */}
        <Route path="/service" element={<Service />} />
        <Route path="/editService/:id" element={<EditService />} />
        <Route path="/viewService/:id" element={<ViewService />} />
        <Route path="/addService" element={<AddService />} />
        {/*----------------------------------------------------------------- */}

        {/*-------------------------  Payment  ------------------------------ */}
        <Route path="/payment" element={<Payment />} />
        {/*----------------------------------------------------------------- */}

        {/*-------------------------  Inventory  ------------------------------ */}
        <Route path="/inventory" element={<Inventory />} />
        {/*----------------------------------------------------------------- */}

        {/*-------------------------  Inventory  ------------------------------ */}
        <Route path="/discount" element={<Discount />} />
        {/*----------------------------------------------------------------- */}

        {/*-------------------------  Inventory  ------------------------------ */}
        <Route path="/cat" element={<Cat />} />
        <Route path="/editCat/:id" element={<Editcat />} />
        <Route path="/addCat" element={<AddCat />} />
        <Route path="/addSubCat/:id" element={<AddSubCat />} />
        {/*---------------------------------------------------------------- */}
      </Routes>
    </>
  );
}

export default App;
