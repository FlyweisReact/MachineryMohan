/** @format */

import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal, Form, Container, FloatingLabel } from "react-bootstrap";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";
import axios from "axios";

const Jobs = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);

  const getService = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:2000/job/get/job"
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
            All Jobs
          </span>
   
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
          
            <th>Job Name</th>
            <th>User</th>
            <th>Category</th>
            <th>Sub-Category</th>
            <th>Description</th>
            <th>Job Type</th>
            <th>Contact Details</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((i, index) => (
            <tr key={index}>
           
              <td>{i.Job_name}</td>
              <td>{i.User}</td>
              <td>{i.jobcategory}</td>
              <td>{i.subcategory}</td>
              <td>{i.Description}</td>
              <td>{i.Job_type}</td>
              <td>{i.Contact_number}</td>
              <td>{i.Location}</td>
              
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default HOC(Jobs);
