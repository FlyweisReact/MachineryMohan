/** @format */

import React from "react";
import { Button, Modal, Form, Container } from "react-bootstrap";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { AiFillDelete } from "react-icons/ai";

const data = [
  {
    Name: "Sellor",
    Stock: "Headphone",
    contact: 4512451245,
    address: "Delhi",
  },
  {
    Name: "Sellor",
    Stock: "Headphone",
    contact: 4512451245,
    address: "Delhi",
  },
];

const Coupon = () => {
  return (
    <div>Coupon</div>
  )
}

export default HOC(Coupon)