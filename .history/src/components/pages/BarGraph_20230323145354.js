import React from 'react'
import HOC from '../layout/HOC'
import Chart from "react-apexcharts";

const BarGraph = () => {

    const fetchData = async () => {
        try{

        }catch(e){
            console.log(e)
        }
    }


  return (
    <>
         <section>
      <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
        <span className="tracking-widest text-slate-900 font-semibold uppercase ">
          Analatics Graph
        </span>
      </div>
      <div style={{ marginTop: "2%" }}>
      

        <Chart
          type="bar"
          width={1300}
          height={700}
          series={[
            {
              name: "Male",
              data: [ 6 , 0 ],
            },
            {
              name: "Female",
              data: [65 , 0],
            },
            {
              name: "Common",
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