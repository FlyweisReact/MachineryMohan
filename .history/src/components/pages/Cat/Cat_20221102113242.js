import React, { useState } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Cat = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const [id, setId] = useState("");

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://nikhil-backend.herokuapp.com/api/v1/banner",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [setData, token, axios]);

  function MyVerticallyCenteredModal(props) {
    const [name, setN] = useState("");
    const [url, setUrl] = useState("");
    const [image, setI] = useState("");
    const token = localStorage.getItem("token");

    const postDetails = (e) => {
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
          setUrl(data.url);
          console.log(data);
          console.log(data?.url);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const submitHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.patch(
          `https://nikhil-backend.herokuapp.com/api/v1/banner/${id}`,
          {
            name,
            link: url,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setModalShow(false);
        toast.success("Banner  Edited Successfully");
        fetchData()
      } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.message);
      }
    };

    return (
      <Modal
        {...props}
        size="lg-down"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Banner
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            style={{
              color: "black",
              margin: "auto",
            }}
            onSubmit={submitHandler}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setI(e.target.files[0])}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="New"
                required
                onClick={() => postDetails()}
                onChange={(e) => setN(e.target.value)}
              />
            </Form.Group>

            <Button variant="outline-success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const deleteData = async (name) => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.delete(
        `https://nikhil-backend.herokuapp.com/api/v1/banner/${name}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Banner Deleted SuccessFully");
      fetchData();
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
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
            All Banner
          </span>
          <Button variant="outline-success" onClick={() => navigate("/addCat")}>
            Add-Banner
          </Button>
        </div>
      </section>

      <section
        className="main-card--container"
        style={{ color: "black", marginBottom: "10%" }}
      >
        {data?.data?.map((i) => {
          return (
            <>
              <div className="card-container">
                <div className="card">
                  <div className="card-body">
                    <img
                      src={i.link}
                      style={{ width: "100%", height: "200px" }}
                    />
                    <div className="card-title">{i.name}</div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        variant="outline-info"
                        onClick={() => {
                          setModalShow(!modalShow);
                          setId(i._id);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        onClick={() => deleteData(i.name)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </section>

      {/* <div class="gallery" id="gallery">
        {data?.data?.map(
          (i, index) =>
  

            // <div
            //   class="mb-3 pics animation all 1"
            //   key={index}
            //   style={{ border: "1px solid black", borderRadius: "10px" }}
            // >
            //   <img
            //     class="img-fluid"
            //     src={i.link}
            //     style={{ width: "400px", height: "200px" }}
            //     alt="Card image cap"
            //   />
            //   <p style={{ color: "black", textAlign: "center" }}>{i.name}</p>
            // </div>
        )}
      </div> */}

      {/* <div style={{ display: "flex"  }}>
        {data?.data?.map((i, index) => (
          <div>
            <Card style={{ width: "18rem" }} key={index}>
              <Card.Img
                variant="top"
                src={i.link}
                width="300px"
                height="200px"
                className="fluid"
              />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div> */}

      {/* <Table
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((i) => (
            <tr>
              <td>
                <img
                  src={i.link}
                  alt={i.name}
                  style={{
                    width: "100px",
                    borderRadius: "100%",
                    height: "100px",
                  }}
                />
              </td>
              <td> {i.name} </td>

              <td style={{ display: "flex", gap: " 40px" }}>
                {" "}
                <AiFillDelete
                  color="red"
                  cursor="pointer"
                  onClick={() => deleteData(i._id)}
                />{" "}
                <AiOutlineEdit
                  color="blue"
                  cursor="pointer"
                  onClick={() => {
                    setModalShow(true);
                    setId(i._id);
                  }}
                />{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table> */}
    </>
  );
};

export default HOC(Cat);
