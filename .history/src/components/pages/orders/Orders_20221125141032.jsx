import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
// import { AiOutlineEye } from "react-icons/ai";
// import { useNavigate } from "react-router-dom";

const Orders = () => {
  // const navigate = useNavigate();



  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Orders
          </span>
        </div>
      </section>
      <Table striped bordered hover style={{ marginTop: "5%" }}>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Order </th>
            <th>Delivery Date</th>
            <th>Shipping Price</th>
            <th>Shipping Price</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
    
        </tbody>
      </Table>
    </>
  );
};

export default HOC(Orders);
