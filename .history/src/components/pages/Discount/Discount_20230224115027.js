/** @format */

import React, { useState } from "react";
import { Container, Form, FloatingLabel, Button } from "react-bootstrap";
import HOC from "../../layout/HOC";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from 'react-bootstrap/Modal';

const Discount = () => {
  const [title, setT] = useState("");
  const [notification, setN] = useState("");

  const token = localStorage.getItem("token");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:2000/notification/addnotification",
        {
          title,
          notification,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Notification added successfully");
    } catch (err) {
      console.log(err);
    }
  };

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
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <>
      {" "}
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            Push Notification
          </span>
        </div>
      </section>
    
    </>
  );
};

export default HOC(Discount);
