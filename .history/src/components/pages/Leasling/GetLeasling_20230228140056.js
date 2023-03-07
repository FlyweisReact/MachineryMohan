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

  function MyVerticallyCenteredModal(props) {
    const [subcategory, setSubcategory] = useState("");
    const [Property_name , setProperty_name] = useState("");
    const [Description , setDescription] = useState("");
    const [Product_price , setProduct_price] = useState("");
    const [Contact_number , setContact_number] = useState("");
    const [Location , setLocation] = useState("");
    const [leaselisting_images ,setleaselisting_images] = useState("");

    const postData = async (e) => {
      e.preventDefault()

      const fd= new FormData()
      fd.append("subcategory" , subcategory)
      fd.append("Property_name" , Property_name)
      fd.append("Description" , Description)
      fd.append("Product_price" , Product_price)
      fd.append("Contact_number" , Contact_number)
      fd.append("Location" , Location)
      Array.from(leaselisting_images).forEach((img) => {
        fd.append("leaselisting_images" , img)

      })
      try{
        const { data } = await axios.post("http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:2000/leaselisting/addByadmin/" , fd)
        console.log(data)
        toast.success("Added")
        getService()
        props.onHide()
      }catch(err){
        console.log(err)
      }
    }

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
        <Modal.Body >
          <Container>
            <Form onSubmit={postData}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" onChange={(e) => setleaselisting_images(e.target.files)} multiple />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" onChange={(e) => setProperty_name(e.target.value)} />
              </Form.Group>
            
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Price</Form.Label>
                <Form.Control type="num" min={0} onChange={(e) => setProduct_price(e.target.value)} />
              </Form.Group>
            
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Contact Num</Form.Label>
                <Form.Control type="text" onChange={(e) => setProperty_name(e.target.value)} />
              </Form.Group>
            
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" onChange={(e) => setProperty_name(e.target.value)} />
              </Form.Group>
            

              <FloatingLabel
                controlId="floatingTextarea"
                label="Description"
                className="mb-3"
              >
                <Form.Control as="textarea" onChange={(e) => setDescription(e.target.value)}  />
              </FloatingLabel>

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

  const getService = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:2000/leaselisting/get/leaselisting"
      );
      setData(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getService();
  }, [getService]);

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
                <AiFillDelete color="red" cursor="pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default HOC(GetLeasling);
