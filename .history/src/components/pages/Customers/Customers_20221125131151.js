/** @format */

import React from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";

const user = [ 
  {
    name : 'React' , 
    phone : 451236977 , 
    email : 'r@gmail.com' , 
    role : 'user'
  },
  {
    name : 'Node Js' , 
    phone : 451236977 , 
    email : 'n@gmail.com' , 
    role : 'user'
  },
  {
    name : 'Java' , 
    phone : 451236977 , 
    email : 'j@gmail.com' , 
    role : 'user'
  },
  {
    name : 'Django' , 
    phone : 451236977 , 
    email : 'd@gmail.com' , 
    role : 'user'
  },
]


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
            <th>Name</th>
            <th>Phone Number</th>
            <th> Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {user.map((i , index) => (
            <tr key={index}>
            <td>
              {}
            </td>

            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default HOC(Customers);
