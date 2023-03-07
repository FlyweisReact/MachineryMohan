/** @format */

import React, {  useEffect, useState } from "react";
import { Button, Modal, Form, Container, FloatingLabel } from "react-bootstrap";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import {toast} from 'react-toastify'


const Machine = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);
  const [ subCategory , setSC] = useState([])

  const getAllMachine = async () => {
    try{
      const { data }  = await axios.get("http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:2000/machine/get/machine")
      setData(data)
    }catch(err){
      console.log(err)
    }
  }

  const getSubCategory = async () => {
    try{
      const { data }  = await axios.get("http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:2000/subcategory/get/subcategory")
      setSC(data)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    getAllMachine()
    getSubCategory()
  },[])


  function MyVerticallyCenteredModal(props) {
    const [ Machine_name , setMachineName] = useState("")
    const [ Condition , setCondition ] = useState("")
    const [Price , setPrice  ] = useState("")
    const [ Location , setLocation] = useState("")
    const [Conatct_number , setContactNumber ] = useState("")
    const [Features , setFeatures ] = useState("")
    const [About_company , setAbout_Company ] = useState("")
    const [ Speed  , setSpeed ] = useState("")
    const [Output_paper_width , setOutput_paper_width ] = useState("")
    const [Capacity , setCapacity ] = useState("")
    const [ Model_name_number , setModel_name_number] = useState("")
    const [Brand ,setBrand ] = useState("")
    const [Model_no ,setModel_no ] = useState("")
    const [machine_images ,setmachine_images ] = useState("")
    const [subcategory , setsubcategory ] = useState("")
    const [Additional_info , setAdditional_info ] = useState("")


    const addProduct = async (e) => {
      e.preventDefault();

      const fd = new FormData();
      fd.append("Machine_name" , Machine_name )
      fd.append("Condition"  , Condition)
      fd.append("Price" , Price)
      fd.append("Location"  ,Location )
      fd.append("Conatct_number" , Conatct_number )
      fd.append("Features" , Features )
      fd.append("About_company"  , About_company)
      fd.append("Speed" , Speed )
      fd.append("Output_paper_width"  , Output_paper_width )
      fd.append("Capacity"  , Capacity )
      fd.append("Model_name_number"  , Model_name_number )
      fd.append("Brand" , Brand  )
      fd.append("Model_no" , Model_no )
       Array.from(machine_images).forEach((img) => {
      fd.append("machine_images", img);
    });
      fd.append("subcategory" , subcategory )
      fd.append("Additional_info" , Additional_info )

      try {
        const { data } = await axios.post(
          "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:2000/machine/add/",
          fd
        );
        console.log(data);
          props.onHide()
          toast.success("Machine Added")
          getAllMachine()
      } catch (err) {
        console.log(err);
      }
    };


    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
       Add Machine
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container >
            <Form onSubmit={addProduct}>
              <Form.Group className="mb-3" >
                <Form.Label>Name</Form.Label>
                <Form.Control type="text"  onChange={(e) => setMachineName(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Condition</Form.Label>
                <Form.Control type="text" onChange={(e) => setCondition(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" min={1} onChange={(e) => setPrice(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" onChange={(e) => setLocation(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Contact Number</Form.Label>
                <Form.Control type="tel" pattern='[0-9]{10}' onChange={(e) => setContactNumber(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Speed</Form.Label>
                <Form.Control type="text" onChange={(e) => setSpeed(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Output Paper Width</Form.Label>
                <Form.Control type="text" onChange={(e) => setOutput_paper_width(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Capacity</Form.Label>
                <Form.Control type="text" onChange={(e) => setCapacity(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Model Number</Form.Label>
                <Form.Control type="text" onChange={(e) => setModel_no(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Model Name Number</Form.Label>
                <Form.Control type="text"  onChange={(e) => setModel_name_number(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Brand</Form.Label>
                <Form.Control type="text" onChange={(e) => setBrand(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Machine Image</Form.Label>
                <Form.Control type="file" multiple  onChange={(e) => setmachine_images(e.target.files)}/>
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Sub-Category</Form.Label> 
                <Form.Select aria-label="Default select example" onChange={(e) => setsubcategory(e.target.value)} >
      <option>Open this select Sub-Category</option>
      {subCategory?.map((i ,index) => (
        <option key={index} value={i._id}> {i.subcategory} </option>
      ))}
      
    </Form.Select>
              </Form.Group>
           
              <FloatingLabel
                controlId="floatingTextarea"
                label="Features"
                className="mb-3"
              >
                <Form.Control as="textarea"  onChange={(e) => setFeatures(e.target.value)}/>
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingTextarea"
                label="About Company"
                className="mb-3"
              >
                <Form.Control as="textarea"  onChange={(e) => setAbout_Company(e.target.value)}/>
              </FloatingLabel>
             
          
              <FloatingLabel
                controlId="floatingTextarea"
                label="Additional Info"
                className="mb-3"
              >
                <Form.Control as="textarea" onChange={(e) => setAdditional_info(e.target.value)} />
              </FloatingLabel>

              <Button
                variant="outline-success"
                type='submit'
              >
                Submit
              </Button>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  }


  const deleteData = async (id) => {
    try{ 

    }catch(er)
  }



  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Machines ( Total : {data.length})
          </span>
          <Button
            variant="outline-success"
            onClick={() => {
              setModalShow(true);
            }}
          >
            Add Machines
          </Button>
        </div>
      </section>

      <div style={{  overflow : 'auto'}}>

      <Table
        striped
        bordered
        hover
       
      >
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Sub-Category</th>
            <th>Condition</th>
            <th>Price</th>
            <th>Location</th>
            <th>About Company</th>
            <th>Features</th>
            <th>Contact Details</th>
            <th>Output Paper Width </th>
            <th>Brand </th>
            <th>Speed </th>
            <th>Capacity </th>
            <th>Model No. </th>
            <th>User</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((i, index) => (
            <tr key={index}>
              <td>
                <div className="ManyImages">
                 {i.machinePictures?.map((img , index) => (
                  <img src={img.img} alt='' key={index} style={{width : '100px' , marginTop : '20px'}} />
                 ))}
                </div>
              </td>
              <td> {i.Machine_name} </td>
              <td> {i.subcategory} </td>
              <td> {i.Condition} </td>
              <td> {i.Price} </td>
              <td> {i.Location} </td>
              <td> {i.About_company} </td>
              <td> {i.Features} </td>
              <td> {i.Conatct_number} </td>
              <td> {i.Description?.Output_paper_width} </td>
              <td> {i.Description?.Brand} </td>
              <td> {i.Description?.Speed} </td>
              <td> {i.Description?.Capacity} </td>
              <td> {i.Description?.Model_name_number} </td>
              <td> {i.User} </td>
              <td style={{ display: "flex", gap: "10px" }}>
                <AiFillDelete color="red" cursor="pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>

    </>
  );
};

export default HOC(Machine);
