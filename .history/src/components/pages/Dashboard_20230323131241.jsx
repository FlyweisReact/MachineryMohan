/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../layout/HOC";
import { MdDashboardCustomize, MdOutlineLibraryBooks } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import axios from "axios";

export const dash = (data) => {
  return data;
};
const Dashboard = () => {
  const [categoryCount, setCategoryCount] = useState("");
  const [productCount, setProductCount] = useState("");
  const [userCount, setUserCount] = useState("");

  const fetchTotalCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:2000/category/get/category"
      );
      setCategoryCount(data.total);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchTotalProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:2000/product//get/product"
      );
      setProductCount(data.total);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchTotalUsers = async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:2000/userroute/total"
      );
      setUserCount(data.Users);
    } catch (e) {
      console.log(e);
    }
  };

  const filterData = async (data) => {
    try {
      const { data } = await axios.get(
        `http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:2000/adminroute/filter?filter=month`
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchTotalCategory();
    fetchTotalProducts();
    fetchTotalUsers();
  }, []);

  const card = [
    {
      progress: "bg-blue-400",
      title: "Total Category",
      number: categoryCount,
      icon: <FaUserFriends className="text-2xl text-[rgb(241,147,48)]" />,
    },
    {
      progress: "bg-green-400",
      title: "Total Products",
      number: productCount,
      icon: (
        <MdOutlineLibraryBooks className="text-2xl text-[rgb(241,147,48)]" />
      ),
    },
    {
      progress: "bg-yellow-400",
      title: "Total Customer",
      number: userCount,
      icon: (
        <MdDashboardCustomize className="text-2xl text-[rgb(241,147,48)]" />
      ),
    },
  ];
  return (
    <>
      <div className="dropdown">
        <p className="upper">Today Summary</p>
        <div className="dropdown-content">
          <p> Weakly</p>
          <p> Monthly</p>
          <p> Yearly</p>
        </div>
      </div>

      <section className="grid md:grid-cols-3 grid-cols-2 gap-y-6 gap-x-4">
        {card.map((card) => {
          return (
            <div className="px-5 py-8 bg-slate-200 space-y-2 shadow-xl flex flex-col  rounded-md">
              <div className="grid  justify-between grid-cols-4">
                <div className="flex flex-col col-span-3 space-y-1">
                  <span className="tracking-widest text-gray-900">
                    {card.title}
                  </span>
                  <span className="tracking-wider text-gray-700 text-xl md:text-2xl font-semibold">
                    {card.number}
                  </span>
                </div>
                <div className="flex rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-white justify-center items-center">
                  {card.icon}
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default HOC(Dashboard);
