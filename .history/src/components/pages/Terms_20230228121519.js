import React, { useCallback, useEffect, useState } from "react";
import HOC from '../layout/HOC'
import Table from "react-bootstrap/Table";
import { Button, Container, Form, Modal, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { toast } from "react-toastify";

const Terms = () => {
    const [data, setData] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);
  
    const getData = useCallback(async () => {
      try {
        const { data } = await axios.get(
          "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:2000/terms"
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
            const { data } = await axios.put("http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:2000/terms/63fda228556887dc231ad30a" , {terms : price } )
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
             Update Terms&Condition
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Form onSubmit={postData}>
                
                <Form.Group className="mb-3">
                  <Form.Label>Terms</Form.Label>
                  <Form.Control type="number" min={1} onChange={(e) => setPrice(e.target.value)} />
                </Form.Group>
  
           
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
              Terms&Condition
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
              <th>Terms&Condition</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
              <tr>
              <td>
                {data?.terms?.terms}
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

export default HOC(Terms)