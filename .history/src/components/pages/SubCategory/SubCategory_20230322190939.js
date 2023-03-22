/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { Button, Modal, Form , Container } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const SubCategory = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);
  const [parent, setP] = useState([]);
  const [each, setEach] = useState(false);
  const [id, setId] = useState("");
  const [edit, setEdit] = useState(false);

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
      console.log(data);
      toast.success("Category Deleted Successfully");
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };


  function DetailModal(props) {
    const [eachData, setEachData] = useState([]);

    const fetchSingleCategory =useCallback(async() => {
      try {
        const { data } = await axios.get(
          `http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:2000/subcategory/getSubcategory/${id}`
        );
        setEachData(data);
      } catch (e) {
        console.log(e);
      }
    },[])

    useEffect(() => {
      if (props.show === true) {
        fetchSingleCategory();
      }
    }, [fetchSingleCategory , props.show]);

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {eachData?.[0]?.subcategory}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <img
              src={eachData?.[0]?.SubcategoryImg}
              alt=""
              style={{ width: "400px", display: "block", margin: "auto" }}
            />
            <div className="cont">
              <p className="cont-p"> Title :  {eachData?.[0]?.subcategory} </p>
              <p className="cont-p"> Category :  {eachData?.[0]?.Category} </p>
            </div>
          </Container>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  }

  function MyVerticallyCenteredModal(props) {
    const [Category, setCategory] = useState("");
    const [subcategory, setSubCategory] = useState("");
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
          "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:2000/subcategory/add/subcategory",
          { image: imageUrl, Category, subcategory }
        );
        console.log(data);
        toast.success("Sub-Category added Successfully");
        setModalShow(false);
        fetchData();
      } catch (err) {
        console.log(err);
      }
    };

    const EditHandler = async (e) => {
      e.preventDefault()
      try{
        const { data } = await axios.post(`http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:2000/subcategory/edit/subcategory/${id}`)
      }catch(e) { 
        console.log(e)
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

            <Form.Select
              aria-label="Default select example"
              onChange={(e) => setCategory(e.target.value)}
              onClick={() => PostImage()}
            >
              <option>Select Parent Category</option>
              {parent?.categories?.map((i, index) => (
                <option key={index} value={i._id}>
                  {i.category}
                </option>
              ))}
            </Form.Select>

            <br />

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setSubCategory(e.target.value)}
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

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
       <DetailModal show={each} onHide={() => setEach(false)} />
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Sub-Categories (Total : {data.length})
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
                <img src={i.SubcategoryImg} alt="" style={{ width: "100px" }} />
              </td>
              <td> {i.subcategory} </td>
              <td> {i.Category?.category} </td>
              <td>
                <div className="d-flex gap-2">
                  <i
                    class="fa-solid fa-trash"
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => deleteCat(i._id)}
                  ></i>
                    <i
                    class="fa-solid fa-eye"
                    style={{ cursor: "pointer", color: "blue" }}
                    onClick={() => {
                      setId(i._id);
                      setEach(true);
                    }}
                  ></i>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default HOC(SubCategory);
