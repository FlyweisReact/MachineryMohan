/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Modal, Container } from "react-bootstrap";

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

  function ViewModal(props) {
    const [each, setEach] = useState([]);

    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:2000/job/get/${id}`
        );
        setEach(data[0]);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };

    useEffect(() => {
      setTimeout(() => {
        if (props.show === true) {
          fetchData();
        }
      }, 500);
    }, [props.show]);

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {each?.Job_name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <div className="cont">
              <p className="cont-p"> Job_name : {each?.Job_name} </p>
              <p className="cont-p"> Price : ₹{each?.Price} </p>
            </div>
            <div className="cont">
              <p className="cont-p"> Location : {each?.Location} </p>
              <p className="cont-p">
                {" "}
                Conatct Number : {each?.Conatct_number}{" "}
              </p>
            </div>
            <div className="cont">
              <p className="cont-p"> Features : {each?.Features} </p>
              <p className="cont-p"> About_company : {each?.About_company} </p>
            </div>
            <div className="cont">
              <p className="cont-p">
                {" "}
                Additional Info : {each?.Additional_info}{" "}
              </p>
              <p className="cont-p"> Speed : {each?.Description?.Speed} </p>
            </div>
            <div className="cont">
              <p className="cont-p">
                {" "}
                Output paper width : {
                  each?.Description?.Output_paper_width
                }{" "}
              </p>
              <p className="cont-p">
                {" "}
                Capacity : {each?.Description?.Capacity}{" "}
              </p>
            </div>
            <div className="cont">
              <p className="cont-p">
                {" "}
                Model name number : {each?.Description?.Model_name_number}{" "}
              </p>
              <p className="cont-p"> Brand : {each?.Description?.Brand} </p>
            </div>
            <div className="cont">
              <p className="cont-p">Model no: {each?.Description?.Model_no} </p>
              <p className="cont-p"> Brand : {each?.subcategory} </p>
            </div>
          </Container>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  }

  return (
    <>
      <ViewModal show={view} onHide={() => setView(false)} />

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
            <th>Action</th>
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
              <td>
                <i
                  className="fa-solid fa-eye"
                  onClick={() => {
                    setId(i._id);
                    setView(true);
                  }}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default HOC(Jobs);
