/** @format */

import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Container, FloatingLabel } from "react-bootstrap";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

const Machine = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);
  const [subCategory, setSC] = useState([]);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");
  const [view, setView] = useState(false);

  const getAllMachine = async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:2000/machine/get/machine"
      );
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getSubCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:2000/subcategory/get/subcategory"
      );
      setSC(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllMachine();
    getSubCategory();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [Machine_name, setMachineName] = useState("");
    const [Condition, setCondition] = useState("");
    const [Price, setPrice] = useState("");
    const [Location, setLocation] = useState("");
    const [Conatct_number, setContactNumber] = useState("");
    const [Features, setFeatures] = useState("");
    const [About_company, setAbout_Company] = useState("");
    const [Speed, setSpeed] = useState("");
    const [Output_paper_width, setOutput_paper_width] = useState("");
    const [Capacity, setCapacity] = useState("");
    const [Model_name_number, setModel_name_number] = useState("");
    const [Brand, setBrand] = useState("");
    const [Model_no, setModel_no] = useState("");
    const [machine_images, setmachine_images] = useState("");
    const [subcategory, setsubcategory] = useState("");
    const [Additional_info, setAdditional_info] = useState("");

    const addProduct = async (e) => {
      e.preventDefault();

      const fd = new FormData();
      fd.append("Machine_name", Machine_name);
      fd.append("Condition", Condition);
      fd.append("Price", Price);
      fd.append("Location", Location);
      fd.append("Conatct_number", Conatct_number);
      fd.append("Features", Features);
      fd.append("About_company", About_company);
      fd.append("Speed", Speed);
      fd.append("Output_paper_width", Output_paper_width);
      fd.append("Capacity", Capacity);
      fd.append("Model_name_number", Model_name_number);
      fd.append("Brand", Brand);
      fd.append("Model_no", Model_no);
      Array.from(machine_images).forEach((img) => {
        fd.append("machine_images", img);
      });
      fd.append("subcategory", subcategory);
      fd.append("Additional_info", Additional_info);

      try {
        const { data } = await axios.post(
          "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:2000/machine/addByAdmin",
          fd
        );
        console.log(data);
        props.onHide();
        toast.success("Machine Added");
        getAllMachine();
      } catch (err) {
        console.log(err);
      }
    };

    const EditHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.patch(
          `http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:2000/machine/edit/machine/${id}`,
          fd
        );
        console.log(data);
        props.onHide();
        toast.success("Machine Edites");
        getAllMachine();
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
            {edit ? "Edit Machine" : " Add Machine"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={edit ? EditHandler : addProduct}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setMachineName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Condition</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setCondition(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="tel"
                  pattern="[0-9]{10}"
                  onChange={(e) => setContactNumber(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Speed</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setSpeed(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Output Paper Width</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setOutput_paper_width(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Capacity</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setCapacity(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Model Number</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setModel_no(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Model Name Number</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setModel_name_number(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setBrand(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Machine Image</Form.Label>
                <Form.Control
                  type="file"
                  multiple
                  onChange={(e) => setmachine_images(e.target.files)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Sub-Category</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setsubcategory(e.target.value)}
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

              <FloatingLabel
                controlId="floatingTextarea"
                label="Features"
                className="mb-3"
              >
                <Form.Control
                  as="textarea"
                  onChange={(e) => setFeatures(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingTextarea"
                label="About Company"
                className="mb-3"
              >
                <Form.Control
                  as="textarea"
                  onChange={(e) => setAbout_Company(e.target.value)}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingTextarea"
                label="Additional Info"
                className="mb-3"
              >
                <Form.Control
                  as="textarea"
                  onChange={(e) => setAdditional_info(e.target.value)}
                />
              </FloatingLabel>

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
        `http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:2000/machine/deletebyid/${id}`
      );
      console.log(data);
      toast.success("Machine Deleted");
      getAllMachine();
    } catch (e) {
      console.log(e);
    }
  };

  function ViewModal(props) {
    const [each, setEach] = useState([]);

    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:2000/machine/get/${id}`
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
            {each?.Machine_name}
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
      <ViewModal show={view} onHide={() => setView(false)} />
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Machines ( Total : {data.length})
          </span>
          <Button
            variant="outline-success"
            onClick={() => {
              setEdit(false);
              setModalShow(true);
            }}
          >
            Add Machines
          </Button>
        </div>
      </section>

      <div style={{ overflow: "auto" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Sub-Category</th>
              <th>Condition</th>
              <th>Price</th>
              <th>Location</th>
              <th>About Company</th>
              <th>Features</th>
              <th>Contact Details</th>
              <th>Output Paper Width </th>
              <th>Brand </th>
              <th>Speed </th>
              <th>Capacity </th>
              <th>Model No. </th>
              <th>User</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((i, index) => (
              <tr key={index}>
                <td>
                  <div className="ManyImages">
                    {i.machinePictures?.map((img, index) => (
                      <img
                        src={img.img}
                        alt=""
                        key={index}
                        style={{ width: "100px", marginTop: "20px" }}
                      />
                    ))}
                  </div>
                </td>
                <td> {i.Machine_name} </td>
                <td> {i.subcategory} </td>
                <td> {i.Condition} </td>
                <td> {i.Price} </td>
                <td> {i.Location} </td>
                <td> {i.About_company} </td>
                <td> {i.Features} </td>
                <td> {i.Conatct_number} </td>
                <td> {i.Description?.Output_paper_width} </td>
                <td> {i.Description?.Brand} </td>
                <td> {i.Description?.Speed} </td>
                <td> {i.Description?.Capacity} </td>
                <td> {i.Description?.Model_name_number} </td>
                <td> {i.User} </td>
                <td style={{ display: "flex", gap: "10px" }}>
                  <AiFillDelete
                    color="red"
                    cursor="pointer"
                    onClick={() => deleteData(i._id)}
                  />
                  <i
                    className="fa-solid fa-pen-to-square"
                    onClick={() => {
                      setEdit(true);
                      setId(i._id);
                      setModalShow(true);
                    }}
                  ></i>
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
      </div>
    </>
  );
};

export default HOC(Machine);
