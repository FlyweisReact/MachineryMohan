/** @format */

import React, { useState } from "react";
import { Container, Form, FloatingLabel, Button } from "react-bootstrap";
import HOC from "../../layout/HOC";
import axios from "axios";

const Discount = () => {
  const [title, setT] = useState("");
  const [notification, setN] = useState("");

  const token = localStorage.getItem("token");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        "https://setupbazaar.herokuapp.com/notification/addnotification",
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
    } catch (err) {
      console.log(err);
    }
  };

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
      <Container style={{ width: "800px", marginTop: "3%", color: "black" }}>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              onChange={(e) => setT(e.target.value)}
            />
          </Form.Group>
          <FloatingLabel
            controlId="floatingTextarea"
            label="Write Your Message"
            className="mb-3"
          >
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              onChange={(e) => setN(e.target.value)}
            />
          </FloatingLabel>
          <Button variant="outline-success">Submit</Button>
        </Form>
      </Container>
    </>
  );
};

export default HOC(Discount);
