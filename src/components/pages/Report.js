/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../layout/HOC";
import Table from "react-bootstrap/Table";
import axios from "axios";

const Report = () => {
  const [data, setData] = useState([]);

  const getData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:2000/report/all"
      );
      setData(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            Complaints
          </span>
        </div>
      </section>
      <Table
        striped
        bordered
        hover
        style={{
          scrollBehavior: "smooth",
          overflow: "scroll",
        }}
      >
        <thead>
          <tr>
            <th>Email</th>
            <th>Description</th>
            <th>Type</th>
            <th>Create at</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((i, index) => (
            <tr key={index}>
              <td>{i.user?.email}</td>
              <td>{i.description}</td>
              <td>{i.type}</td>
              <td>{i.createdAt?.slice(0, 10)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default HOC(Report);
