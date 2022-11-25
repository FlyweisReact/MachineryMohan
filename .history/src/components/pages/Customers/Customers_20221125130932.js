import React from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";

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
