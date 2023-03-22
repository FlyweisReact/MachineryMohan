/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const Inventory = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:2000/category/get/category"
      );
      setData(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const token = localStorage.getItem("token");

  function MyVerticallyCenteredModal(props) {
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
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

    const submitHandler = async (e) => {
      e.preventDefault();
      try {
        const data = await axios.post(
          "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:2000/category/add/category",
          { image: imageUrl, category }
        );
        console.log(data);
        toast.success("Category added Successfully");
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
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setCategory(e.target.value)}
                onClick={() => PostImage()}
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
        `http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:2000/category/delete/category/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      toast.success("Category Deleted Successfully");
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };


  function MyVerticallyCenteredModal(props) {
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
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

    const submitHandler = async (e) => {
      e.preventDefault();
      try {
        const data = await axios.post(
          "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:2000/category/add/category",
          { image: imageUrl, category }
        );
        console.log(data);
        toast.success("Category added Successfully");
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
        <Container>
          
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
            All Categories ( Total : {data?.total})
          </span>
          <div>
            <Button
              variant="outline-success"
              onClick={() => setModalShow(true)}
              style={{ marginLeft: "10px" }}
            >
              Add Category
            </Button>
          </div>
        </div>
      </section>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.categories?.map((i, index) => (
            <tr key={index}>
              <td>
                <img src={i.categoryimg} alt="" style={{ width: "100px" }} />
              </td>
              <td> {i.category} </td>
              <td>
                <div className="d-flex gap-2">
                  <i
                    class="fa-solid fa-trash"
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => deleteCat(i._id)}
                  ></i>
                  <i class="fa-solid fa-eye"  style={{ cursor: "pointer", color: "blue" }}></i>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default HOC(Inventory);
