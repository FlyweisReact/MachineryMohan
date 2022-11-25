import React from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";

const Service = () => {

  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Services
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
            <th>Price</th>
            <th>Summary</th>
            <th>Desription</th>
            <th>Category </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
         
        </tbody>
      </Table>
    </>
  );
};

export default HOC(Service);
