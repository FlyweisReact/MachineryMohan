/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

const Customers = () => {
  const [data, setData] = useState([]);
  const [ dataCount , setDataCount ] = useState('')
  const [ query , setQuery ] = useState("")

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:2000/userroute/allUsers"
      );
      setData(data);
      setDataCount(data.data.length)
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteData = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:2000/userroute/delete/${id}`
      );
      console.log(data);
      toast.success("User Deleted Succesfully");
      fetchData()
    } catch (err) {
      console.log(err);
    }
  };

  const filterData = !query
    ? data?.data
    : data?.data?.filter(
        (i) =>
          i?.name?.toLowerCase().includes(query?.toLowerCase()) ||
          i?.mobile?.toString()?.toLowerCase().includes(query?.toLowerCase()) ||
          i?.category?.toLowerCase().includes(query?.toLowerCase())
      );

  

  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Users ( Total : {dataCount})
          </span>
        </div>
      </section>
      <Table
        striped
        bordered
        hover
        style={{
          marginTop: "1%",
          scrollBehavior: "smooth",
          overflow: "scroll",
        }}
      >
        <thead>
          <tr>
          <th>SNo.</th>
          <th> Id </th>
            <th>Name</th>
            <th>Phone Number</th>
            <th> Email</th>
            <th> Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((i, index) => (
            <tr key={index}>
            <td> {index + 1} </td>
              <td>{i.full_name}</td>
              <td>{i.mobile}</td>
              <td>{i.email}</td>
              <td>{i.role}</td>
              <td>
                <AiFillDelete
                  color="red"
                  cursor="pointer"
                  onClick={() => deleteData(i._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default HOC(Customers);
