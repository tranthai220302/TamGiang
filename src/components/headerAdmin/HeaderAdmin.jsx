import React, { useState } from "react"
import { Link } from "react-router-dom"
import HeadAdmin from "./HeadAdmin"

const HeaderAdmin = () => {
  const [click, setClick] = useState(false)

  return (
    <div style={{backgroundColor :"#aacdd4"}}>
      <HeadAdmin />
      <header>
        <nav className='flexSB'>
          <ul className={click ? "mobile-nav" : "flexSB "} onClick={() => setClick(false)}>
            <li style={{fontSize : '14px', fontWeight : '700'}}>
              <Link to='/admin/teacher'>Giáo Viên</Link>
            </li>
            <li style={{fontSize : '14px', fontWeight : '700'}}>
              <Link to='/admin/class'>Lớp Học</Link>
            </li>
            <li style={{fontSize : '14px', fontWeight : '700'}}>
              <Link to='/admin/event'>Sự Kiện</Link>
            </li>
            <li style={{fontSize : '14px', fontWeight : '700'}}>
              <Link to='/admin/teacher'>Khoa</Link>
            </li>
            <li style={{fontSize : '14px', fontWeight : '700'}}>
              <Link to='/admin/confirm/vaction'>Duyệt ngày nghỉ</Link>
            </li>
            <li style={{fontSize : '14px', fontWeight : '700'}}>
              <Link to='/admin/data'>Thêm dữ liệu</Link>
            </li>
            <li style={{fontSize : '14px', fontWeight : '700'}}>
              <Link to='/admin/timetable'>Sắp xếp TKB Sáng</Link>
            </li>
            <li style={{fontSize : '14px', fontWeight : '700'}}>
              <Link to='/admin/timetable/afternoon'>Sắp xếp TKB Chiều</Link>
            </li>
            <li style={{fontSize : '14px', fontWeight : '700'}}>
              <Link to='/admin/timetable/teacher'>TKB giáo viên</Link>
            </li>
          </ul>
          <Link to = '/admin/tkb'>
            <div className='start'>
              <div className='button'>THỜI KHOÁ BIỂU</div>
            </div>
          </Link>
          <button className='toggle' onClick={() => setClick(!click)}>
            {click ? <i className='fa fa-times'> </i> : <i className='fa fa-bars'></i>}
          </button>
        </nav>
      </header>
    </div>
  )
}

export default HeaderAdmin
