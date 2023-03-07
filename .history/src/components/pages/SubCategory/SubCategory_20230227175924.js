/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { AiFillDelete } from "react-icons/ai";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const SubCategory = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);
  const [parent, setP] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:2000/subcategory/get/subcategory"
      );
      setData(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const fetchCategory = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:2000/category/get/category"
      );
      setP(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchData();
    fetchCategory();
  }, [fetchData, fetchCategory]);

  const token = localStorage.getItem("token");

  function MyVerticallyCenteredModal(props) {
    const [Category, setName] = useState("");
    const [Image, setI] = useState("");
    const [category, setC] = useState("");

    const submitHandler = async (e) => {
      e.preventDefault();
 

      try {
        const data = await axios.post(
          "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:2000/subcategory/add/subcategory",
        
        );
        console.log(data)
        toast.success("Sub-Category added Successfully");
        setModalShow(false);
        fetchData();
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
            Add Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setI(e.target.files[0])}
              />
            </Form.Group>

            <Form.Select
              aria-label="Default select example"
              onChange={(e) => setC(e.target.value)}
            >
              <option>Select Parent Category</option>
              {parent?.categories?.map((i, index) => (
                <option key={index} value={i._id}>
                  {" "}
                  {i.category}{" "}
                </option>
              ))}
            </Form.Select>

            <br />

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Button variant="outline-success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  }

  const deleteCat = async (id) => {
    try {
      const data = await axios.delete(
        `http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:2000/subcategory/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data)
      toast.success("Category Deleted Successfully");
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Sub-Categories
          </span>
          <div>
    
            <Button
              variant="outline-success"
              onClick={() => setModalShow(true)}
              style={{ marginLeft: "10px" }}
            >
              Add Sub-Categories
            </Button>
          </div>
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
            <th>Category</th>
            <th>Parent Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((i, index) => (
            <tr key={index}>
              <td>
            <img src={i.SubcategoryImg} alt='' style={{width : '100px'}} />
              </td>
              <td> {i.subcategory} </td>
              <td> {i.Category} </td>
              <td>
                <AiFillDelete
                  color="red"
                  cursor="pointer"
                  onClick={() => deleteCat(i._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default HOC(SubCategory);
