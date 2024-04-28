import React from "react"
import logo from '../../../ults/image/logo.png'
import { Button, Link } from "@mui/material"
const Head = () => {
  return (
    <>
      <section className='head'>
        <div className='container flexSB1'>
          <Link to = '/' sx={{textDecoration : 'none', color : 'white'}}>
            <div className='logo'>
              <img src={logo} alt="" srcset="" height={55} />
              <span className="text-black">Trường THPT Tam Giang</span>
            </div>
          </Link>
          <div className='social'>
            <i className='fab fa-facebook-f icon'></i>
            <i className='fab fa-youtube icon'></i>
            <Link to = '/login'>
            <Button variant="outlined" sx={{marginLeft : '10px', color : '#1eb2a6', backgroundColor : '#d2e7ec', border : 'none'}}>Đăng nhập</Button></Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Head
