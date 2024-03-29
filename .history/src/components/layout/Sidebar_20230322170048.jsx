/** @format */

import React from "react";
import { RiCloseLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { BsFillImageFill } from "react-icons/bs";
import { GiNothingToSay } from "react-icons/gi";
import { BsCartFill } from "react-icons/bs";
import { MdDashboardCustomize, MdPayment, MdCategory } from "react-icons/md";
import { toast } from "react-toastify";

const Sidebar = ({ hamb, setHamb }) => {
  const navigate = useNavigate();

  const nav = [
    {
      icon: <MdDashboardCustomize className="text-xl mr-3" />,
      link: "/dashboard",
      name: "Dashboard",
    },


    
    {
      icon: <GiNothingToSay className="text-xl mr-3" />,
      link: "/discount",
      name: "Notification",
    },
    {
      icon: <BsCartFill className="text-xl mr-3" />,
      link: "/products",
      name: "Products",
    },

    {
      icon: <MdCategory className="text-xl mr-3" />,
      link: "/inventory",
      name: "Category",
    },


    {
      icon: <AiOutlineUser className="text-xl mr-3" />,
      link: "/customer",
      name: "Users",
    },
    {
      icon: <AiOutlineUser className="text-xl mr-3" />,
      link: "/admin",
      name: "Admins",
    },
   

    {
      icon: <MdCategory className="text-xl mr-3" />,
      link: "/subCat",
      name: "Sub-Category",
    },

    {
      icon: <MdPayment className="text-xl mr-3" />,
      link: "/machine",
      name: "Machine",
    },

    {
      icon: <MdPayment className="text-xl mr-3" />,
      link: "/services",
      name: "Services",
    },

    {
      icon: <MdPayment className="text-xl mr-3" />,
      link: "/leas",
      name: "Lease Listing",
    },

    {
      icon: <MdPayment className="text-xl mr-3" />,
      link: "/jobs",
      name: "Jobs",
    },



    {
      icon: <BsFillImageFill className="text-xl mr-3" />,
      link: "/cat",
      name: "Banner",
    },



    {
      icon: <MdPayment className="text-xl mr-3" />,
      link: "/complaint",
      name: "Package",
    },
    {
      icon: <MdPayment className="text-xl mr-3" />,
      link: "/report",
      name: "Report",
    },
    {
      icon: <MdPayment className="text-xl mr-3" />,
      link: "/terms",
      name: "Term&Condition",
    },
    {
      icon: <MdPayment className="text-xl mr-3" />,
      link: "/privacy",
      name: "Privacy Policy",
    },
    {
      icon: <MdPayment className="text-xl mr-3" />,
      link: "/help",
      name: "Help&Support",
    },
  ];

  const logOut = async (e) => {
    localStorage.removeItem("token");
    toast.success("Log-Out SuccessFull");
    navigate("/");
  };

  return (
    <>
      <aside className="p-4">
        {/* Top */}
        <div className="w-full md:hidden relative  p-2 mb-4">
          <RiCloseLine
            onClick={() => setHamb(!hamb)}
            className="text-3xl  absolute top-2 sm:hover:rotate-[228deg] transition-transform font-bold right-2 sm:hover:text-[22px] text-[rgb(241,146,46)] cursor-pointer"
          />
        </div>
        {/* Logo */}
        <figure className="flex  flex-col items-center">
          <span
            className="font-bold text-[rgb(241,146,46)]"
            style={{ fontSize: "2rem", textAlign: "center" }}
          >
            Admin Panel
          </span>
        </figure>
        {/* Nav-menu */}
        <nav className="py-6">
          {nav.map((nav) => {
            return (
              <Link to={nav.link} key={nav.name} className="">
                <span className="flex my-3 items-center cursor-pointer text-gray-900    tracking-wider p-2 rounded-sm">
                  {nav.icon} {nav.name}
                </span>
              </Link>
            );
          })}

          <span
            onClick={() => logOut()}
            className="flex my-3 items-center cursor-pointer text-gray-900    tracking-wider p-2 rounded-sm"
          >
            <BiLogOutCircle className="text-xl mr-3" /> Logout
          </span>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
