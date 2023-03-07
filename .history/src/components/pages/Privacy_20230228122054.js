import React, { useCallback, useEffect, useState } from "react";
import HOC from '../layout/HOC'
import Table from "react-bootstrap/Table";
import { Button, Container, Form, Modal, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import {  AiFillEdit } from "react-icons/ai";
import { toast } from "react-toastify";

const Privacy = () => {
    const [data, setData] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);
  
    const getData = useCallback(async () => {
      try {
        const { data } = await axios.get(
          "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:2000/privacy"
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

  
      const postData = async (e) => {
        e.preventDefault()
        try{
            const { data } = await axios.put("http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:2000/privacy/63fda4904e0ed28eb1fa10f0" , {privacy : price } )
            console.log(data)
            props.onHide()
            toast.success("Terms&Condition Updated ")
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
             Update Privacy Policy
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Form onSubmit={postData}>
                
              
                
                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Privacy Policy"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    onChange={(e) => setPrice(e.target.value)}
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
  
  
  
    return (
      <>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
        <section>
          <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
            <span className="tracking-widest text-slate-900 font-semibold uppercase ">
              Privacy Policy
            </span>
         
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
              <th>Privay Policy</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
              <tr>
              <td>
                {data?.privacy?.privacy}
              </td>
                <td>
                  <AiFillEdit color="blue" onClick={() => setModalShow(true)} />
                </td>
              </tr>
     
          </tbody>
        </Table>
      </>
    );
  };

export default HOC(Privacy)