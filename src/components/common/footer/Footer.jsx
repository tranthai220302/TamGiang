import React from "react"
import { blog } from "../../../dummydata"
import "./footer.css"

const Footer = () => {
  return (
    <>
      <section className='newletter'>
        <div className='container flexSB'>
          <div className='left row'>
            <h1>Bản tin - Hãy theo dõi và nhận cập nhật mới nhất</h1>
            <span>Xa xa, sau những dãy núi</span>
          </div>
          <div className='right row'>
            <input type='text' placeholder='Nhập địa chỉ email' />
            <i className='fa fa-paper-plane'></i>
          </div>
        </div>
      </section>
      <footer>
        <div className='container padding'>
          <div className='box logo'>
            <h1>TAM GIANG</h1>
            <span>GIÁO DỤC & HỌC TẬP TRỰC TUYẾN</span>
            <p>Một con sông nhỏ tên Duden chảy qua chỗ của họ và cung cấp cho nó những gì cần thiết.</p>

            <i className='fab fa-facebook-f icon'></i>
            <i className='fab fa-twitter icon'></i>
            <i className='fab fa-instagram icon'></i>
          </div>
          <div className='box link'>
            <h3>Khám Phá</h3>
            <ul>
              <li>Về Chúng Tôi</li>
              <li>Dịch Vụ</li>
              <li>Khóa Học</li>
              <li>Blog</li>
              <li>Liên Hệ</li>
            </ul>
          </div>
          <div className='box link'>
            <h3>Liên Kết Nhanh</h3>
            <ul>
              <li>Liên Hệ</li>
              <li>Bảng Giá</li>
              <li>Điều Khoản & Điều Kiện</li>
              <li>Chính Sách Riêng Tư</li>
              <li>Phản Hồi</li>
            </ul>
          </div>
          <div className='box'>
            <h3>Bài Viết Gần Đây</h3>
            {blog.slice(0, 3).map((val) => (
              <div className='items flexSB'>
                <div className='img'>
                  <img src={val.cover} alt='' />
                </div>
                <div className='text'>
                  <span>
                    <i className='fa fa-calendar-alt'></i>
                    <label htmlFor=''>{val.date}</label>
                  </span>
                  <span>
                    <i className='fa fa-user'></i>
                    <label htmlFor=''>{val.type}</label>
                  </span>
                  <h4>{val.title.slice(0, 40)}...</h4>
                </div>
              </div>
            ))}
          </div>
          <div className='box last'>
            <h3>Có Câu Hỏi?</h3>
            <ul>
              <li>
                <i className='fa fa-map'></i>
                203 Fake St. Mountain View, San Francisco, California, USA
              </li>
              <li>
                <i className='fa fa-phone-alt'></i>
                +2 392 3929 210
              </li>
              <li>
                <i className='fa fa-paper-plane'></i>
                info@yourdomain.com
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className='legal'>
        <p>
          Bản quyền ©2022 Tất cả các quyền được bảo lưu | Mẫu này được làm với <i className='fa fa-heart'></i> bởi GorkhCoder
        </p>
      </div>
    </>
  )
}

export default Footer
