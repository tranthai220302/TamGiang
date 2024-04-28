import React, { useState } from "react"
import { Link } from "react-router-dom"
import Head from "./Head"
import "./header.css"

const Header = () => {
  const [click, setClick] = useState(false)

  return (
    <>
      <Head />
      <header>
        <nav className='flexSB'>
          <ul className={click ? "mobile-nav" : "flexSB "} onClick={() => setClick(false)}>
            <li>
              <Link to='/'>Trang chủ</Link>
            </li>
            <li>
              <Link to='/courses'>Tin tức</Link>
            </li>
            <li>
              <Link to='/courses'>Sự kiện</Link>
            </li>
            <li>
              <Link to='/about'>Thông báo </Link>
            </li>
            <li>
              <Link to='/team'>Danh sách</Link>
            </li>
            <li>
              <Link to='/pricing'>Chi bộ</Link>
            </li>
            <li>
              <Link to='/journal'>Thông tin đơn vị</Link>
            </li>
            <li>
              <Link to='/contact'>Liện hệ</Link>
            </li>
          </ul>
          <Link to = '/timetable'>
            <div className='start'>
              <div className='button'>THỜI KHOÁ BIỂU</div>
            </div>
          </Link>
          <button className='toggle' onClick={() => setClick(!click)}>
            {click ? <i className='fa fa-times'> </i> : <i className='fa fa-bars'></i>}
          </button>
        </nav>
      </header>
    </>
  )
}

export default Header
