import React, { useCallback, useEffect, useState } from "react";
import HOC from '../layout/HOC'
import Table from "react-bootstrap/Table";
import axios from "axios";

const Help = () => {
    const [data, setData] = useState([]);
  
    const getData = useCallback(async () => {
      try {
        const { data } = await axios.get(
          "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:2000/hns/getall"
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
            Help & Support
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
              <th>Help & Support</th>
            </tr>
          </thead>
          <tbody>
          {data?.map((i , index) => (
            <tr key={index}>
              <td>
                {i.user?.full_name}
              </td>
              <td>
                {i.user?.email}
              </td>
              <td>
                {i.user?.mobile}
              </td>
              <td>
                {i.query}
              </td>
             
              </tr>
          ))}
          </tbody>
        </Table>
      </>
    );
  };


export default HOC(Help)