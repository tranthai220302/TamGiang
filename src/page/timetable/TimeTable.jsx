import React from 'react'
import './TimeTable.css'
import SortTimeTable from '../sortTimeTable/SortTimeTable'
const TimeTable = () => {
  return (
    <>
        <div className='heroTimeTable'>
        </div>
        <div className='timetable'>
            <SortTimeTable/>
        </div>
    </>
  )
}

export default TimeTable