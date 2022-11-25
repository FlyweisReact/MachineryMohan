import React from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { AiFillDelete } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Customers = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://nikhil-backend.herokuapp.com/api/v1/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(data);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [axios, token, toast]);

  const deleteService = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.delete(
        `https://nikhil-backend.herokuapp.com/api/v1/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchData();
      toast.success("User Deleted SuccessFully");
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
  };
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
            <th>Company Name </th>
            <th>Phone Number</th>
            <th>Company Email</th>
            <th>Company Address</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        
        </tbody>
      </Table>
    </>
  );
};

export default HOC(Customers);
