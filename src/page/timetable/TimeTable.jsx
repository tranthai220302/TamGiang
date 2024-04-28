import React from 'react'
import './TimeTable.css'
import { Button } from '@mui/material'
import Table from '../../components/timetable/table'
const TimeTable = () => {
  return (
    <>
        <div className='heroTimeTable'>
        </div>
        <div className='timetable'>
            <Table />
        </div>
    </>
  )
}

export default TimeTable