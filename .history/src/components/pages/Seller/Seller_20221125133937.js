
import React from "react";
import HOC from "../../layout/HOC";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const cat = [
  {
    link: "https://img.freepik.com/free-vector/abstract-website-banner-with-modern-shapes_1361-1738.jpg?w=2000",
    name: "Banner",
  },
  {
    link: "https://www.picmaker.com/assets/images/youtubeLP/youtube-banner-11.webp",
    name: "Banner",
  },
  {
    link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwDMwvH6ELBL2wZezBnyqhEneYU84zPrJJ4vPVIVuQJEVAWD0jt5gTcIOkcRuED3g7oKI&usqp=CAU",
    name: "Banner",
  },
];


const Seller = () => {
  return (
    <div>Seller</div>
  )
}

export default HOC(Seller)