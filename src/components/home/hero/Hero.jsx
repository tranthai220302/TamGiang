import React from "react";
import Heading from "../../common/heading/Heading";
import "./Hero.css";
import { useNavigate } from "react-router-dom";
import { Link } from "@mui/material";

const Hero = () => {
  const navigate = useNavigate()
  const handleLogin = () => {
    navigate("/login"); // Replace "/login" with your desired route
  };

  return (
    <>
      <section className='hero'>
        <div className='container'>
          <div className='row'>
            <Heading subtitle='WELCOME TO' title='Trường Trung Học Phổ Thông Tam Giang' />
            <p style={{fontStyle: 'italic', fontSize: '16px'}}>
              "Mục tiêu của giáo dục không phải là dạy cách kiếm sống hay cung cấp công cụ để đạt được sự giàu có, mà đó phải là con đường dẫn lối tâm hồn con người vươn đến cái Chân và thực hành cái Thiện."
            </p>
            <div className='button'>
              <button className='primary-btn'>
                TIN TỨC HÔM NAY <i className='fa fa-long-arrow-alt-right'></i>
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className='margin'></div>
    </>
  );
};

export default Hero;
