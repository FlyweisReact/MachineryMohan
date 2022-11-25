/** @format */

import React from "react";
import { Button, Modal, Form, Container } from "react-bootstrap";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { AiFillDelete } from "react-icons/ai";

const data = [
  {
    Name: "KSDH45",
    Stock: "Headphone",
    contact: 4512451245
  },
  {
    Name: "Sellor",
    Stock: "Headphone",
    contact: 4512451245
  },
];

const Coupon = () => {
    const [modalShow, setModalShow] = React.useState(false);

    function MyVerticallyCenteredModal(props) {
      return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add Sellor
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container style={{ width: "600px" }}>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Product</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
  
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Contact Details</Form.Label>
                  <Form.Control type="number" min={1} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
  
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
  
    return (
      <>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
        <section>
          <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
            <span className="tracking-widest text-slate-900 font-semibold uppercase ">
              All Coupon
            </span>
            <Button
              variant="outline-success"
              onClick={() => {
                setModalShow(true);
              }}
            >
              Add Sellor
            </Button>
          </div>
        </section>
        <Table
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
              <th>Coupon Code</th>
              <th>Discount</th>
              <th> Min. Order</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((i, index) => (
              <tr key={index}>
                <td>{i.Name}</td>
                <td>{i.Stock}</td>
                <td>{i.contact}</td>
                <td>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <AiFillDelete color="red" cursor="pointer" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  };

export default HOC(Coupon)