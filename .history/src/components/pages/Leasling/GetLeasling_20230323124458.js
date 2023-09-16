/** @format */

import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal, Form, Container, FloatingLabel } from "react-bootstrap";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

const GetLeasling = () => {
  const [modalShow, setModalShow] = React.useState(false);

  const [data, setData] = useState([]);
  const [subCategory, setSC] = useState([]);
  const [id, setId] = useState("");
  const [view, setView] = useState(false);

  const getSubCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:2000/subcategory/get/subcategory"
      );
      setSC(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getService = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:2000/leaselisting/get/leaselisting"
      );
      setData(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getService();
    getSubCategory();
  }, [getService]);

  function MyVerticallyCenteredModal(props) {
    const [subcategory, setSubcategory] = useState("");
    const [Property_name, setProperty_name] = useState("");
    const [Description, setDescription] = useState("");
    const [Product_price, setProduct_price] = useState("");
    const [Contact_number, setContact_number] = useState("");
    const [Location, setLocation] = useState("");
    const [leaselisting_images, setleaselisting_images] = useState("");

    const postData = async (e) => {
      e.preventDefault();

      const fd = new FormData();
      fd.append("subcategory", subcategory);
      fd.append("Property_name", Property_name);
      fd.append("Description", Description);
      fd.append("Product_price", Product_price);
      fd.append("Contact_number", Contact_number);
      fd.append("Location", Location);
      Array.from(leaselisting_images).forEach((img) => {
        fd.append("leaselisting_images", img);
      });
      try {
        const { data } = await axios.post(
          "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:2000/leaselisting/addByadmin/",
          fd
        );
        console.log(data);
        toast.success("Added");
        getService();
        props.onHide();
      } catch (err) {
        console.log(err);
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
          <Modal.Title id="contained-modal-title-vcenter">Add</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={postData}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setleaselisting_images(e.target.files)}
                  multiple
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setProperty_name(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="num"
                  min={0}
                  onChange={(e) => setProduct_price(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="tel"
                  pattern="[0-9]{10}"
                  onChange={(e) => setContact_number(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Form.Group>

              <FloatingLabel
                controlId="floatingTextarea"
                label="Description"
                className="mb-3"
              >
                <Form.Control
                  as="textarea"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FloatingLabel>

              <Form.Group className="mb-3">
                <Form.Label>Sub-Category</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setSubcategory(e.target.value)}
                >
                  <option>Open this select Sub-Category</option>
                  {subCategory?.map((i, index) => (
                    <option key={index} value={i._id}>
                      {" "}
                      {i.subcategory}{" "}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Button variant="outline-success" type="submit">
                Submit
              </Button>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  }

  const deleteData = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:2000/leaselisting/deletebyid/${id}`
      );
      console.log(data);
      toast.success("Deleted");
      getService();
    } catch (e) {
      console.log(e);
    }
  };

  function ViewModal(props) {
    const [each, setEach] = useState([]);

    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:2000/leaselisting/get/${id}`
        );
        setEach(data[0]);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };

    useEffect(() => {
      setTimeout(() => {
        if (props.show === true) {
          fetchData();
        }
      }, 500);
    }, [props.show]);

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {each?.Property_name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <div className="manyImage">
              {each?.machinePictures?.map((i, index) => (
                <img src={i.img} alt="" key={index} />
              ))}
            </div>

            <div className="cont">
              <p className="cont-p"> Condition : {each?.Condition} </p>
              <p className="cont-p"> Price : ₹{each?.Price} </p>
            </div>
            <div className="cont">
              <p className="cont-p"> Location : {each?.Location} </p>
              <p className="cont-p">
                {" "}
                Conatct Number : {each?.Conatct_number}{" "}
              </p>
            </div>
            <div className="cont">
              <p className="cont-p"> Features : {each?.Features} </p>
              <p className="cont-p"> About_company : {each?.About_company} </p>
            </div>
            <div className="cont">
              <p className="cont-p">
                {" "}
                Additional Info : {each?.Additional_info}{" "}
              </p>
              <p className="cont-p"> Speed : {each?.Description?.Speed} </p>
            </div>
            <div className="cont">
              <p className="cont-p">
                {" "}
                Output paper width : {
                  each?.Description?.Output_paper_width
                }{" "}
              </p>
              <p className="cont-p">
                {" "}
                Capacity : {each?.Description?.Capacity}{" "}
              </p>
            </div>
            <div className="cont">
              <p className="cont-p">
                {" "}
                Model name number : {each?.Description?.Model_name_number}{" "}
              </p>
              <p className="cont-p"> Brand : {each?.Description?.Brand} </p>
            </div>
            <div className="cont">
              <p className="cont-p">Model no: {each?.Description?.Model_no} </p>
              <p className="cont-p"> Brand : {each?.subcategory} </p>
            </div>
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
            All Lease Listing
          </span>
          <Button
            variant="outline-success"
            onClick={() => {
              setModalShow(true);
            }}
          >
            Add Lease Listing
          </Button>
        </div>
      </section>

      <Table
        striped
        bordered
        hover
        style={{
          marginTop: "2%",
          scrollBehavior: "smooth",
          overflow: "scroll",
        }}
      >
        <thead>
          <tr>
            <th>Image</th>
            <th>Property Name</th>
            <th>User</th>
            <th>Sub-Category</th>
            <th>Description</th>
            <th>Price</th>
            <th>Contact Details</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((i, index) => (
            <tr key={index}>
              <td>
                {i.leaselistingPictures?.map((img, index) => (
                  <img
                    src={img.img}
                    alt=""
                    key={index}
                    style={{ width: "100px" }}
                  />
                ))}
              </td>
              <td>{i.Property_name}</td>
              <td>{i.User}</td>
              <td>{i.subcategory}</td>
              <td>{i.Description}</td>
              <td>₹{i.Product_price}</td>
              <td>{i.Contact_number}</td>
              <td>{i.Location}</td>
              <td style={{ display: "flex", gap: "10px" }}>
                <AiFillDelete
                  color="red"
                  cursor="pointer"
                  onClick={() => deleteData(i._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default HOC(GetLeasling);
