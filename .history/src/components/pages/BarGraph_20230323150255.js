import React, { useEffect , useState } from 'react'
import HOC from '../layout/HOC'
import Chart from "react-apexcharts";
import axios from 'axios';

const BarGraph = () => {
    const [ Name , setName ] = useState('')
    const [ categoryCount , setCategoryCount ] = useState("0")
    const [ productCount , setProductCount ] = useState("0")
    const [ userCount , setUserCount ] = useState("0")

    const filterData = async (name) => {
        try{
          const { data } = await axios.get(`http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:2000/adminroute/filter?filter=${name}`)
          setProductCount(data.Product)
          setUserCount(data.Users)
          setCategoryCount(data.Machine)
        }catch(e){
          console.log(e)
        }
      }
    
      useEffect(() => {
        filterData()
      },[])

  return (
    <>
         <section>
      <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
        <span className="tracking-widest text-slate-900 font-semibold uppercase ">
          Analatics Graph
        </span>
      </div>

      <div className="dropdown">
        <p className="upper" onClick={() =>filterData('today') } >
          {Name.length < 4 ? 'Today' : Name} Data
        </p>
        <div className="dropdown-content">
          <p onClick={() =>{filterData('today')
        setName('Today')
           }} > Today</p>
          <p onClick={() =>{filterData('week')
        setName('Weekly')
           }} > Weakly</p>
          <p onClick={() =>{
            setName('Monthly')
            filterData('month') }} > Monthly</p>
          <p onClick={() =>{
            setName('Yearly')
            filterData('yearly')} } > Yearly</p>
        </div>
      </div>


      <div style={{ marginTop: "2%" }}>
      

        <Chart
          type="bar"
          width={1300}
          height={700}
          series={[
            {
              name: "User",
              data: [ userCount , 0 ],
            },
            {
              name: "Machine",
              data: [65 , 0],
            },
            {
              name: "Product",
              data: [10 , 0],
            },
            
          ]}
         style={{
            color : 'blue'
         }}
          options={{}}
          xaxis ={{
            categories : ['Jan' , 'fev']
          }}
        ></Chart>
      </div>
    </section>
    </>
  )
}

export default HOC(BarGraph)