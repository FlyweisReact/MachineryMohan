/** @format */

import React from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import {  AiFillDelete } from "react-icons/ai";



const user = [
  {
    name: "Raftaar",
    phone: 451236977,
    email: "raftaar@gmail.com",
    role: "user",
  },
  {
    name: "Amitabh",
    phone: 451236977,
    email: "amitabh@gmail.com",
    role: "user",
  },
  {
    name: "Salman",
    phone: 451236977,
    email: "salman@gmail.com",
    role: "user",
  },
  {
    name: "Ranveer",
    phone: 451236977,
    email: "ranveer@gmail.com",
    role: "user",
  },
];



const Customers = () => {
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
          <th>
            
          </th>
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
