import React, { useCallback, useEffect, useState } from "react";
import HOC from '../layout/HOC'
import Table from "react-bootstrap/Table";
import { Button, Container, Form, Modal, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import {  AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";

const Help = () => {
    const [data, setData] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);
  
    const getData = useCallback(async () => {
      try {
        const { data } = await axios.get(
          "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:2000/privacy"
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {data?.privacy?.map((i , index) => (
            <tr key={index}>
              <td>
                {i.privacy}
              </td>
             
              </tr>
          ))}
          </tbody>
        </Table>
      </>
    );
  };


export default HOC(Help)