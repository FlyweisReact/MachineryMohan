/** @format */

import React from "react";
import { Button } from "react-bootstrap";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { AiOutlineEdit, AiOutlineEye, AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const data = [
  {
    img: "https://cdn.shopify.com/s/files/1/0548/8849/7221/files/Anchor_4_800x.png?v=1664285998",
    Name: "Wireless Bluetooth",
    Stock: 120,
    Price: 4500,
    address: "Delhi",
    description:
      " publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholde",
    features:
      " publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholde",
    aboutCom:
      " publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholde",
    info: " publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholde",
  },
];

const Products = () => {
  const navigate = useNavigate();
  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Products
          </span>
          <Button variant="outline-success">Add Product</Button>
        </div>
      </section>
      <Table
        striped
        bordered
        hover
        style={{
          marginTop: "5%",
          scrollBehavior: "smooth",
          overflow: "scroll",
        }}
      >
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Location</th>
            <th>Description</th>
            <th>Features</th>
            <th>About Company</th>
            <th>Additional Info</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((i, index) => (
            <tr key={index}>
              <td style={{ width: "120px" }}>
                <img src={i.img} alt="" className="fast-food" />
              </td>
              <td>{i.Name}</td>
              <td>{i.Stock}</td>
              <td>{i.Price}</td>
              <td>{i.address}</td>
              <td>{i.description}</td>
              <td>{i.features}</td>
              <td>{i.aboutCom}</td>
              <td>{i.info}</td>
              <td>
                <div style={{ display: "flex", gap: "10px" }}>
                  {" "}
                  <AiOutlineEdit color="black" cursor="pointer" />
                  <AiOutlineEye
                    color="blue"
                    cursor="pointer"
                    onClick={() => navigate(`/viewProduct/${i._id}`)}
                  />
                  <AiFillDelete color="red" cursor="pointer" />
                </div>
              </td>
            </tr>
          ))}
         
        </tbody>
      </Table>
    </>
  );
};

export default HOC(Products);
