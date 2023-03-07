/** @format */

import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal, Form, Container, FloatingLabel } from "react-bootstrap";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";
import axios from "axios";

const Services = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState([]);


  const getService = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:2000/service/get/service"
      );
      setData(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getService();
  }, [getService]);

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Services
          </span>
          <Button
            variant="outline-success"
            onClick={() => {
              setEdit(false);
              setModalShow(true);
            }}
          >
            Add Service
          </Button>
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
            <th>Name</th>
            <th>User</th>
            <th>Sub-Category</th>
            <th>Price</th>
            <th>Location</th>
            <th>Contact Details</th>
            <th>About Service</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((i, index) => (
            <tr key={index}>
              <td>
               {i.servicePictures?.map((img , index) => (
                <img src={img.img} alt='' key={index} style={{width : '100px' , marginTop : '10px'}} />
               ))}
              </td>
              <td>
                {i.Service_name}
              </td>
              <td>
                {i.User}
              </td>
              <td>
                {i.subcategory}
              </td>
              <td>
              ₹{i.Service_Price}
              </td>
              <td>
                {i.Location}
              </td>
              <td>
                {i.Conatct_number}
              </td>
              <td>
                {i.About_service}
              </td>
              <td style={{ display: "flex", gap: "10px" }}>
                <AiOutlineEdit color="black" cursor="pointer" />
           
                <AiFillDelete color="red" cursor="pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default HOC(Services);
