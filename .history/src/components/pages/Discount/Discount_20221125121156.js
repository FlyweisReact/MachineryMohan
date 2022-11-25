import React from "react";
import HOC from "../../layout/HOC";
// import { AiFillDelete } from "react-icons/ai";
// import { Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { useState } from "react";

const Discount = () => {
  // const token = localStorage.getItem("token");
  // const [data, setData] = useState([]);

  // const fetchData = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       "https://nikhil-backend.herokuapp.com/api/v1/cart",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     setData(data);
  //   } catch (err) {
  //     console.log(err);
  //     toast.error(err?.response?.data?.message);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, [axios, token]);

  return (
    <>
      {" "}
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            Push Notification
          </span>
        </div>
      </section>
    
    </>
  );
};

export default HOC(Discount);
