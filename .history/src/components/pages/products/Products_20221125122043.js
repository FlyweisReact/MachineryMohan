import React from "react";
import { Button } from "react-bootstrap";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";


const data = [
  {
    img : 'https://cdn.shopify.com/s/files/1/0548/8849/7221/files/Anchor_4_800x.png?v=1664285998'
  }
]

const Products = () => {
  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Products
          </span>
          <Button
            variant="outline-success"
          >
            Add Product
          </Button>
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
          {/* {data?.data?.map((i) => (
            <tr>
              <td>
                {" "}
                <img
                  src={
                    i.image
                      ? i.image
                      : "https://cdn.pixabay.com/photo/2018/04/17/17/15/italian-3328121_960_720.png"
                  }
                  alt={i.Name}
                  className="fast-food"
                />{" "}
              </td>
              <td> {i._id} </td>
              <td> {i.name} </td>
              <td> {i.stock} </td>
              <td> {i.variant} </td>
              <td>
                {" "}
                {i.categorymain?.map((i) => (
                  <span key={i.id}> {i.name} </span>
                ))}{" "}
              </td>
              <td> ₹{i.mrp} </td>
              <td>
                <div
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  {" "}
                  <AiOutlineEdit
                    color="black"
                    cursor="pointer"
                    onClick={() => navigate(`/editProduct/${i._id}`)}
                  />
                  <AiOutlineEye
                    color="blue"
                    cursor="pointer"
                    onClick={() => navigate(`/viewProduct/${i._id}`)}
                  />
                  <AiFillDelete
                    color="red"
                    cursor="pointer"
                    onClick={() => navigate(`/deleteProduct/${i._id}`)}
                  />
                </div>
              </td>
            </tr>
          ))} */}
        </tbody>
      </Table>
    </>
  );
};

export default HOC(Products);
