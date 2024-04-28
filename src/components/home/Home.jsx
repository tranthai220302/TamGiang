import React from "react"
import AboutCard from "../about/AboutCard"
import Hblog from "./Hblog"
import HAbout from "./HAbout"
import Hero from "./hero/Hero"
import Hprice from "./Hprice"
import Testimonal from "./testimonal/Testimonal"
import OnlineCourses from "../allcourses/OnlineCourses"
const Home = () => {
  return (
    <>
      <Hero />
      <AboutCard />
      <OnlineCourses />
      <Hblog />
      <Testimonal />
    </>
  )
}

export default Home
