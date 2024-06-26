import "./App.css"
import Header from "./components/common/header/Header"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import About from "./components/about/About"
import CourseHome from "./components/allcourses/CourseHome"
import Team from "./components/team/Team"
import Pricing from "./components/pricing/Pricing"
import Blog from "./components/blog/Blog"
import Contact from "./components/contact/Contact"
import Footer from "./components/common/footer/Footer"
import Home from "./components/home/Home"
import LoginCustomer from "./page/login/Login"
import TimeTable from "./page/timetable/TimeTable"
import SortTimeTable from "./page/sortTimeTable/SortTimeTable"
import Teacher from "./page/teacher/teacher"
import { useEffect, useState } from "react"
import HeaderAdmin from "./components/headerAdmin/HeaderAdmin";
import HomeAdmin from "./page/homeAdmin/HomeAdmin";
import TeacherAdmin from "./page/homeAdmin/teacherAdmin/TeacherAdmin";
import SchoolAdmin from "./page/homeAdmin/schoolAdmin/SchoolAdmin";
import Event from "./page/homeAdmin/event/Event";
import HeaderTeacher from "./components/techer/HeaderTeacher/HeaderTeacher";
import HomeTeacher from "./page/homeTeacher/HomeTeacher";
import Vacadation from "./page/homeTeacher/Vacadation/Vacadation";
import AddData from "./page/homeAdmin/data/AddData";
import TKB from "./page/TKB/TKB";
import ScheduleAfternoon from "./page/sortTimeTable/SortTimeTableAfternoon";
import TimeTableClass from "./components/techer/class/TimeTableClass";
import ConfirmVaction from "./page/homeAdmin/comfirm/ConfirmVacation";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('currentUser')));
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginCustomer />} />
          <Route path='/' element={<>
            <Header />
            <Home />
            <Footer />
          </>} />
          <Route path='/about' element={<>
            <Header />
            <About />
            <Footer />
          </>} />
          <Route path='/courses' element={<>
            <Header />
            <CourseHome />
            <Footer />
          </>} />
          <Route path='/team' element={<>
            <Header />
            <Team />
            <Footer />
          </>} />
          <Route path='/pricing' element={<>
            <Header />
            <Pricing />
            <Footer />
          </>} />
          <Route path='/journal' element={<>
            <Header />
            <Blog />
            <Footer />
          </>} />
          <Route path='/contact' element={<>
            <Header />
            <Contact />
            <Footer />
          </>} />
          {user && !user.Teacher && (<Route path='/admin/timetable' element={<>
            <HeaderAdmin />
            <SortTimeTable />
            <Footer />
          </>} />)}
          {user && !user.Teacher && (
            <Route path='/admin' element={<>
              <HeaderAdmin />
              <HomeAdmin />
              <Footer />
            </>} />
          )}
          {user && !user.Teacher && (
            <Route path='/admin/timetable/afternoon' element={<>
              <HeaderAdmin />
              <ScheduleAfternoon />
              <Footer />
            </>} />
          )}
          {user && !user.Teacher && (
            <Route path='/admin/tkb' element={<>
              <HeaderAdmin />
              <TKB/>
              <Footer />
            </>} />
          )}
          {user && !user.Teacher && (
            <Route path='/admin/teacher' element={<>
              <HeaderAdmin />
              <TeacherAdmin />
              <Footer />
            </>} />
          )}
          {user && !user.Teacher && (
            <Route path='/admin/class' element={<>
              <HeaderAdmin />
              <SchoolAdmin />
              <Footer />
            </>} />
          )}
          {user && !user.Teacher && (
            <Route path='/admin/schedule/teacher' element={<>
              <HeaderAdmin />
              <Teacher />
              <Footer />
            </>} />
          )}
          {user && !user.Teacher && (
            <Route path='/admin/event' element={<>
              <HeaderAdmin />
              <Event />
              <Footer />
            </>} />
          )}
          {user && !user.Teacher && (
            <Route path='/admin/confirm/vaction' element={<>
              <HeaderAdmin />
              <ConfirmVaction/>
              <Footer />
            </>} />
          )}
          {user && !user.Teacher && (
            <Route path='/admin/data' element={<>
              <HeaderAdmin />
              <AddData />
              <Footer />
            </>} />
          )}
          {user && !user.Teacher && (
            <Route path='/admin/timetable/teacher' element={<>
              <HeaderAdmin />
              <Teacher />
              <Footer />
            </>} />
          )}
          {user && user.Teacher && (
            <Route path='/teacher/home' element={<>
              <HeaderTeacher />
              <HomeTeacher />
              <Footer />
            </>} />
          )}
          {user && user.Teacher && (
            <Route path='/teacher/vacation' element={<>
              <HeaderTeacher />
              <Vacadation />
              <Footer />
            </>} />
          )}
          {user && user.Teacher && (
            <Route path='/teacher/timetable/class' element={<>
              <HeaderTeacher />
              <TimeTableClass />
              <Footer />
            </>} />
          )}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
