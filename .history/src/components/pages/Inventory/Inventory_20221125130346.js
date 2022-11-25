/** @format */

import React from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import {  AiFillDelete } from "react-icons/ai";
import { Button } from "react-bootstrap";

const cat = [
  {
    name: "Phone",
  },
  {
    name: "Electronics",
  },
  {
    name: "Home",
  },
];

const Inventory = () => {
  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Categories
          </span>
          <Button variant='outline-success'
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
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cat.map((i, index) => (
            <tr key={index}>
              <td> {i.name} </td>
              <td>
               
                  <AiFillDelete color="red" cursor="pointer" />
             
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default HOC(Inventory);
