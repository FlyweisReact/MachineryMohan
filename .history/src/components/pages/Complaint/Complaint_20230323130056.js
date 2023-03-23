/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { Button, Container, Form, Modal, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";

const Complaint = () => {
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");

  const getData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:2000/package"
      );
      setData(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  function MyVerticallyCenteredModal(props) {

    const [price , setPrice  ] = useState("")
    const [ valid , setValid] = useState("")
    const [desc , setDesc ] = useState("")

    const postData = async (e) => {
      e.preventDefault()
      try{
          const { data } = await axios.post("http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:2000/package" , {price  , desc , valid } )
          console.log(data)
          props.onHide()
          toast.success("Package Added")
          getData()
      }catch(err){
        console.log(err)
      }
    }
    const EditHandler = async (e) => {
      e.preventDefault()
      try{
          const { data } = await axios.put(`http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:2000/package/update/${id}` , {price  , desc , valid } )
          console.log(data)
          props.onHide()
          toast.success("Package Edited")
          getData()
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
          <Modal.Title id="contained-modal-title-vcenter">
            {edit ? "Edit Package" : "Add Package"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={edit ? EditHandler : postData}>
              
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" min={1} onChange={(e) => setPrice(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Valid</Form.Label>
                <Form.Control type="date"  onChange={(e) => setValid(e.target.value)} />
              </Form.Group>
              
              <FloatingLabel
                controlId="floatingTextarea"
                label="Description"
                className="mb-3"
              >
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  onChange={(e) => setDesc(e.target.value)}
                />
              </FloatingLabel>
        <Button type='submit'>Submit</Button>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    );
  }

  const deleteData = async (id) => {
    try{
      const { data } = await axios.delete(`http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:2000/package/delete/${id}`)
      console.log(data)
      getData()
      toast.success("Package Deleted ")
    }catch(e){
      console.log(e)
    }
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
            All Packages
          </span>
          <Button variant="outline-success" onClick={() => setModalShow(true)}>
            Add Packages
          </Button>
        </div>
      </section>
      <Table
        striped
        bordered
        hover
        style={{
          scrollBehavior: "smooth",
          overflow: "scroll",
        }}
      >
        <thead>
          <tr>
            <th>Price</th>
            <th>Valid</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.message?.map((i, index) => (
            <tr key={index}>
              <td>{i.price}</td>
              <td>{i.valid}</td>
              <td>{i.desc}</td>
              <td>
              <div className="d-flex g-2"></div>
                <AiFillDelete color="red" onClick={() => deleteData(i._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default HOC(Complaint);
