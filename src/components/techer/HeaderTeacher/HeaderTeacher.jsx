import React, { useState } from "react"
import { Link } from "react-router-dom"
import HeadTeacher from "../HeadTeacher"
const HeaderTeacher = () => {
    const [click, setClick] = useState(false)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('currentUser')));

    return (
        <div style={{ backgroundColor: "#aacdd4" }}>
            <HeadTeacher />
            <header>
                <nav className='flexSB'>
                    <ul className={click ? "mobile-nav" : "flexSB "} onClick={() => setClick(false)}>
                        <li>
                            <Link to='/admin/teacher'>Thông tin cá nhân</Link>
                        </li>
                        <li>
                            <Link to='/admin/teacher'>Lớp học</Link>
                        </li>
                        <li>
                            <Link to='/teacher/timetable/class'>Thời khoá biểu lớp học</Link>
                        </li>
                        <li>
                            <Link to='/teacher/vacation'>Đăng ký ngày nghỉ</Link>
                        </li>
                    </ul>
                    <Link to='/teacher/home'>
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

export default HeaderTeacher
