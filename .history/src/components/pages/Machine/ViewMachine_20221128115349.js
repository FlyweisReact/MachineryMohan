import React from "react";
import {  Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import HOC from '../../layout/HOC'

const ViewMachine = () => {
    const { id } = useParams();
    return (
      <>
        <section>
          <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
            <span className="tracking-widest text-slate-900 font-semibold uppercase ">
              Machine {id}
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
            <span style={{ fontSize: "1.5rem" }}> Tissue machine </span>
            <hr style={{ marginTop: "5%", marginBottom: "5%" }} />
            <span style={{ fontSize: "1.5rem", fontWeight: "600" }}>
              {" "}
              category :{" "}
              <span style={{ fontWeight: "400", color: "#968d74" }}>
                120
              </span>{" "}
              <hr style={{ marginTop: "5%", marginBottom: "5%" }} />
            </span>
            <span style={{ fontSize: "1.5rem", fontWeight: "600" }}>
              {" "}
              Address :{" "}
              <span style={{ fontWeight: "400", color: "#968d74" }}>
                Delhi
              </span>{" "}
              <hr style={{ marginTop: "5%", marginBottom: "5%" }} />
            </span>
            <h2 style={{ fontFamily: "Robotics" }}> ₹10,000</h2>{" "}
            <hr style={{ marginTop: "5%", marginBottom: "5%" }} />
          </div>
        </Container>
        <Container   >
          <div className="desc-P">
            <div>
              <strong>Description</strong> : publishing and graphic design, Lorem
              ipsum is a placeholder text commonly used to demonstrate the visual
              form of a document or a typeface without relying on meaningful
              content. Lorem ipsum may be used as a placeholde
            </div>
            <div>
              <strong>Features</strong> : publishing and graphic design, Lorem
              ipsum is a placeholder text commonly used to demonstrate the visual
              form of a document or a typeface without relying on meaningful
              content. Lorem ipsum may be used as a placeholde
            </div>
            <div>
              <strong>About Company</strong> : publishing and graphic design, Lorem
              ipsum is a placeholder text commonly used to demonstrate the visual
              form of a document or a typeface without relying on meaningful
              content. Lorem ipsum may be used as a placeholde
            </div>
            <div>
              <strong>Additional Info</strong> : publishing and graphic design, Lorem
              ipsum is a placeholder text commonly used to demonstrate the visual
              form of a document or a typeface without relying on meaningful
              content. Lorem ipsum may be used as a placeholde
            </div>
          </div>
        </Container>
      </>
    );
  };

export default HOC(ViewMachine)