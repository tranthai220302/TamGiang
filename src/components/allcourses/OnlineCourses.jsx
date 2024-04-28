import React from "react"
import "./courses.css"
import { online } from "../../dummydata"
import Heading from "../common/heading/Heading"
import { Link } from "@mui/material"

const OnlineCourses = () => {
  return (
    <>
      <section className='online'>
        <div className='container'>
          <Heading subtitle=' Tin tức 23/4' title='' />
          <div className='content grid3'>
            {online.map((val) => (
              <div className='box'>
                <div className='img'>
                  <img src={val.cover} alt = 'new'/>
                  <img src={val.hoverCover} alt='' className='show' />
                </div>
                <div className="text_body">
                  <h1>{val.courseName}</h1>
                  <span>{val.course}</span>
                </div>
              </div>
            ))}
          </div>
          <Link style = {{color : '#1eb2a6',marginTop : '20px', width : "100%", textAlign : 'end', cursor : 'pointer'}}>View All <i className='fa fa-long-arrow-alt-right'></i></Link>
        </div>
      </section>
    </>
  )
}

export default OnlineCourses
