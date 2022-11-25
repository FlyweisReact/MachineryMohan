/** @format */

import React from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";

import { Button, Modal, Form } from "react-bootstrap";

const user = [
  {
    name: "React",
    phone: 451236977,
    email: "r@gmail.com",
    role: "user",
  },
  {
    name: "Node Js",
    phone: 451236977,
    email: "n@gmail.com",
    role: "user",
  },
  {
    name: "Java",
    phone: 451236977,
    email: "j@gmail.com",
    role: "user",
  },
  {
    name: "Django",
    phone: 451236977,
    email: "d@gmail.com",
    role: "user",
  },
];

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
          Add Category
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Category Name</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Button variant="outline-success">Submit</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

const Customers = () => {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Users
          </span>
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
            <th>Name</th>
            <th>Phone Number</th>
            <th> Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {user.map((i, index) => (
            <tr key={index}>
              <td>{i.name}</td>
              <td>{i.phone}</td>
              <td>{i.email}</td>
              <td>{i.role}</td>
              <td>
                <div style={{ display: "flex", gap: "10px" }}>
                  {" "}
                  <AiOutlineEdit
                    color="black"
                    cursor="pointer"
                    onClick={() => setModalShow(true)}
                  />
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

export default HOC(Customers);
