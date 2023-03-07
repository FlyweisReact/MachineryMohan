/** @format */

import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal, Form, Container, FloatingLabel } from "react-bootstrap";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { AiOutlineEdit, AiOutlineEye, AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Products = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const getCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:2000/category/get/category"
      );
      setCategory(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getSubCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:2000/subcategory/get/subcategory"
      );
      setSubCategory(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:2000/product//get/product"
      );
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategory();
    getSubCategory();
    fetchData();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [image, setI] = useState("");
    const [productcategory, setC] = useState("");
    const [subcategory, setSC] = useState("");
    const [Product_name, setN] = useState("");
    const [Description, setD] = useState("");
    const [Product_type, setPT] = useState("");
    const [Contact_number, setCN] = useState("");
    const [Location, setL] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const PostImage = (e) => {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "ml_default");
      data.append("cloud_name", "dbcnha741");
      fetch("https://api.cloudinary.com/v1_1/dbcnha741/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setImageUrl(data.url);
          console.log(data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const AddProduct = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:2000/product/add/",
          {
            image: imageUrl,
            productcategory,
            subcategory,
            Product_name,
            Product_type,
            Description,
            Contact_number,
            Location,
          }
        );
        console.log(data);
        toast.success("Product Added");
        props.onHide();
        fetchData();
      } catch (e) {
        console.log(e);
      }
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {edit ? "Edit Product" : "Add Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container style={{ width: "600px" }}>
            <Form onSubmit={AddProduct}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setI(e.target.files[0])}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setC(e.target.value)}
                >
                  <option>Product Category</option>
                  {category?.categories?.map((i, index) => (
                    <option value={i._id} key={index}>
                      {i.category}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setSC(e.target.value)}
                >
                  <option>Product Sub-Category</option>
                  {subCategory?.map((i, index) => (
                    <option value={i._id} key={index}>
                      {i.subcategory}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Product Name</Form.Label>
                <Form.Control type="text"   onChange={(e) => setC(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text"  onChange={(e) => setC(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Product Type</Form.Label>
                <Form.Control type="text"  onChange={(e) => setC(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control type="text"  onChange={(e) => setC(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" />
              </Form.Group>

              <Button
                variant="outline-success"
                onClick={() => setModalShow(false)}
              >
                Submit
              </Button>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  }

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Products ( Total : {data?.total} )
          </span>
          <Button
            variant="outline-success"
            onClick={() => {
              setEdit(false);
              setModalShow(true);
            }}
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
            <th>Prouct Category</th>
            <th>Sub-Category</th>
            <th>Description</th>
            <th>Product Type</th>
            <th>Contact Number</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((i, index) => (
            <tr key={index}>
              <td>
                <img src={i.image} alt="" style={{ width: "100px" }} />
              </td>
              <td> {i.Product_name} </td>
              <td> {i.productcategory} </td>
              <td> {i.subcategory} </td>
              <td> {i.Description} </td>
              <td> {i.Product_type} </td>
              <td> {i.Contact_number} </td>
              <td> {i.Location} </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default HOC(Products);
