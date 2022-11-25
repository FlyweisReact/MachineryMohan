import React from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";

const cat = [
  {
    name  : 'Phone' 
  },
  {
    name  : 'Electronics' 
  },
  {
    name  : 'New Category' 
  },
]


const Inventory = () => {
  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Categories
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
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>

      
        </tbody>
      </Table>
    </>
  );
};

export default HOC(Inventory);
