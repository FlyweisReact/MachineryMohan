/** @format */

import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import HOC from "../../layout/HOC";

const ViewMachine = () => {
  const { id } = useParams();

  const [data, setData] = useState([]);

  const fetchDetails = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:2000/machine/get/${id}`
      );
      setData(data);
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            {data?.[0]?.Machine_name}
          </span>
        </div>
      </section>
      <Container style={{ color: "black", display: "flex", marginTop: "5%" }}>
        <div
          className="left"
          style={{
            width: "50%",
            textAlign: "center",
          }}
        >
          <img
            src={
              "https://cdn.shopify.com/s/files/1/0548/8849/7221/files/Anchor_4_800x.png?v=1664285998"
            }
            alt=""
            style={{ width: "400px", height: "400px" }}
          />
        </div>
        <div
          className="right"
          style={{
            marginRight: "100px",
            width: "50%",
            padding: "10px",
          }}
        >
          <span style={{ fontSize: "1.5rem" }}>
            {" "}
            {data?.[0]?.Machine_name}{" "}
          </span>
          <hr style={{ marginTop: "5%", marginBottom: "5%" }} />
          <span style={{ fontSize: "1.5rem", fontWeight: "600" }}>
            {" "}
            Speed :{" "}
            <span style={{ fontWeight: "400", color: "#968d74" }}>
              {data?.[0]?.Description?.Speed}
            </span>{" "}
            <hr style={{ marginTop: "5%", marginBottom: "5%" }} />
          </span>
          <span style={{ fontSize: "1.5rem", fontWeight: "600" }}>
            {" "}
            Output paper width :{" "}
            <span style={{ fontWeight: "400", color: "#968d74" }}>
              {data?.[0]?.Description?.Output_paper_width}
            </span>{" "}
            <hr style={{ marginTop: "5%", marginBottom: "5%" }} />
          </span>
          <span style={{ fontSize: "1.5rem", fontWeight: "600" }}>
            {" "}
            Capacity :{" "}
            <span style={{ fontWeight: "400", color: "#968d74" }}>
              {data?.[0]?.Description?.Capacity}
            </span>{" "}
            <hr style={{ marginTop: "5%", marginBottom: "5%" }} />
          </span>
          <span style={{ fontSize: "1.5rem", fontWeight: "600" }}>
            {" "}
            Brand :{" "}
            <span style={{ fontWeight: "400", color: "#968d74" }}>
              {data?.[0]?.Description?.Brand}
            </span>{" "}
            <hr style={{ marginTop: "5%", marginBottom: "5%" }} />
          </span>
          <span style={{ fontSize: "1.5rem", fontWeight: "600" }}>
            {" "}
            Model number :{" "}
            <span style={{ fontWeight: "400", color: "#968d74" }}>
              {data?.[0]?.Description?.Model_no}
            </span>{" "}
            <hr style={{ marginTop: "5%", marginBottom: "5%" }} />
          </span>
          <span style={{ fontSize: "1.5rem", fontWeight: "600" }}>
            {" "}
            Location :{" "}
            <span style={{ fontWeight: "400", color: "#968d74" }}>
              {data?.[0]?.Location}
            </span>{" "}
            <hr style={{ marginTop: "5%", marginBottom: "5%" }} />
          </span>
          <span style={{ fontSize: "1.5rem", fontWeight: "600" }}>
            {" "}
            Category :{" "}
            <span style={{ fontWeight: "400", color: "#968d74" }}>
              {data?.[0]?.category}
            </span>{" "}
            <hr style={{ marginTop: "5%", marginBottom: "5%" }} />
          </span>
          <span style={{ fontSize: "1.5rem", fontWeight: "600" }}>
            {" "}
            SubCategory :{" "}
            <span style={{ fontWeight: "400", color: "#968d74" }}>
              {data?.[0]?.subcategory}
            </span>{" "}
            <hr style={{ marginTop: "5%", marginBottom: "5%" }} />
          </span>
          <span style={{ fontSize: "1.5rem", fontWeight: "600" }}>
            {" "}
            Condition :{" "}
            <span style={{ fontWeight: "400", color: "#968d74" }}>
              {data?.[0]?.Condition}
            </span>{" "}
            <hr style={{ marginTop: "5%", marginBottom: "5%" }} />
          </span>
          <span style={{ fontSize: "1.5rem", fontWeight: "600" }}>
            {" "}
            Contact Details :{" "}
            <span style={{ fontWeight: "400", color: "#968d74" }}>
              {data?.[0]?.Conatct_number}
            </span>{" "}
            <hr style={{ marginTop: "5%", marginBottom: "5%" }} />
          </span>
          <h2 style={{ fontFamily: "Robotics" }}> ₹ {data?.[0]?.Price} </h2>{" "}
          <hr style={{ marginTop: "5%", marginBottom: "5%" }} />
        </div>
      </Container>
      <Container>
        <div className="desc-P">
          <div>
            <strong>Features</strong> : {data?.[0]?.Features}
          </div>
          <div>
            <strong>About Company</strong> : {data?.[0]?.About_company}
          </div>
        </div>
      </Container>
    </>
  );
};

export default HOC(ViewMachine);
