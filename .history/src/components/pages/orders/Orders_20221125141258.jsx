import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";

const order = [
  {
    name : 'User' , 
    order : 'Product' , 
    dd : '12/01/1201' , 
    sp : 450 , 
    op : 4500 , 
    total : 10000 , 
    delivered : 'Yes' , 
    payment : 'Recieved'
  }
]

const Orders = () => {



  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Orders
          </span>
        </div>
      </section>
      <Table striped bordered hover style={{ marginTop: "2%" }}>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Order </th>
            <th>Delivery Date</th>
            <th>Shipping Price</th>
            <th> Order Price</th>
            <th> Total Price</th>
            <th> Delivered</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {order.map((I) )}
    
        </tbody>
      </Table>
    </>
  );
};

export default HOC(Orders);
