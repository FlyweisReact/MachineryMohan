/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Button, Modal, Form, Container, FloatingLabel } from "react-bootstrap";

const Jobs = () => {
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [view, setView] = useState(false);

  const getService = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:2000/job/get/job"
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
