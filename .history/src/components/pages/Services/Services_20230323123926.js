/** @format */

import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal, Form, Container, FloatingLabel } from "react-bootstrap";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import {  AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

const Services = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);
  const [ subCategory , setSC] = useState([])
  const [id, setId] = useState("");
  const [view, setView] = useState(false);

  const getService = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:2000/service/get/service"
      );
      setData(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  
  const getSubCategory = async () => {
    try{
      const { data }  = await axios.get("http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:2000/subcategory/get/subcategory")
      setSC(data)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    getService();
    getSubCategory()
  }, [getService]);

  function MyVerticallyCenteredModal(props) {
    const [Service_name, setServiceName] = useState("");
    const [Service_Price, setServicePrice] = useState("");
    const [Location, setServiceLocation] = useState("");
    const [Conatct_number, setContactNumber] = useState("");
    const [About_service, setAboutService] = useState("");
    const [service_images, setServiceImage] = useState("");
    const [subcategory, setSubCategory] = useState("");

    const addProduct = async (e) => {
      e.preventDefault();
      const fd = new FormData();
      fd.append("Service_name", Service_name);
      fd.append("Service_Price", Service_Price);
      fd.append("Location", Location);
      fd.append("Conatct_number", Conatct_number);
      fd.append("About_service", About_service);
      fd.append("subcategory", subcategory);
      Array.from(service_images).forEach((img) => {
        fd.append("service_images", img);
      });
      try {
        const { data } = await axios.post(
          "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:2000/service/addByadmin",
          fd
        );
        console.log(data);
        props.onHide();
        toast.success("Machine Added");
        getService();
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
          <Modal.Title id="contained-modal-title-vcenter">
            Add Service
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={addProduct}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Service Images</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setServiceImage(e.target.files)}
                  multiple
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Service Name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setServiceName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  onChange={(e) => setServicePrice(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setServiceLocation(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="tel"
                  pattern="[0-9]{10}"
                  onChange={(e) => setContactNumber(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label>Sub-Category</Form.Label> 
                <Form.Select aria-label="Default select example" onChange={(e) => setSubCategory(e.target.value)} >
      <option>Open this select Sub-Category</option>
      {subCategory?.map((i ,index) => (
        <option key={index} value={i._id}> {i.subcategory} </option>
      ))}
      
    </Form.Select>
              </Form.Group>

              <FloatingLabel
                controlId="floatingTextarea"
                label="About Service"
                className="mb-3"
              >
                <Form.Control
                  as="textarea"
                  onChange={(e) => setAboutService(e.target.value)}
                />
              </FloatingLabel>

              <Button
                variant="outline-success"
               type="submit"
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

  const deleteData = async (id) => {
    try{
      const { data }  = await axios.delete(`http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:2000/service//deletebyid/${id}`)
      console.log(data)
      toast.success("Deleted")
      getService()
    }catch(e){
      console.log(e)
    }
  }

  function ViewModal(props) {
    const [each, setEach] = useState([]);

    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:2000/service/get/${id}`
        );
        setEach(data[0]);
        console.log(data)
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
            {each?.Service_name}
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
            All Services
          </span>
          <Button
            variant="outline-success"
            onClick={() => {
              setModalShow(true);
            }}
          >
            Add Service
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
            <th>Name</th>
            <th>User</th>
            <th>Sub-Category</th>
            <th>Price</th>
            <th>Location</th>
            <th>Contact Details</th>
            <th>About Service</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((i, index) => (
            <tr key={index}>
              <td>
                {i.servicePictures?.map((img, index) => (
                  <img
                    src={img.img}
                    alt=""
                    key={index}
                    style={{ width: "100px", marginTop: "10px" }}
                  />
                ))}
              </td>
              <td>{i.Service_name}</td>
              <td>{i.User}</td>
              <td>{i.subcategory}</td>
              <td>₹{i.Service_Price}</td>
              <td>{i.Location}</td>
              <td>{i.Conatct_number}</td>
              <td>{i.About_service}</td>
              <td>
              <div className=""
                <AiFillDelete color="red" cursor="pointer" onClick={() => deleteData(i._id)} />
                <i
                    className="fa-solid fa-eye"
                    onClick={() => {
                      setId(i._id);
                      setView(true);
                    }}
                  ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default HOC(Services);
