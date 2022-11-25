import React from "react";
import { Container, Form  , FloatingLabel} from "react-bootstrap";
import HOC from "../../layout/HOC";


const Discount = () => {
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
    
    <Container>
      <Form>

      </Form>
    </Container>
    </>
  );
};

export default HOC(Discount);
