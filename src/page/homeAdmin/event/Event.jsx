import React, { useEffect, useState } from 'react'
import BannerContent from '../../../components/admin/event/banner/Banner'
import EventBtns from '../../../components/admin/event/createEvent/EventBtns'
import DateRangeIcon from '@mui/icons-material/DateRange';
import newRequest from '../../../ults/newRequest'
import { Image } from '@mui/icons-material'
import moment from 'moment-timezone';
import './event.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ListEvent from '../../../components/admin/event/ListEvent/ListEvent';
import ModalCreate from '../../../components/admin/event/ModalCreate/ModalCreate';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
moment.tz.setDefault('Europe/Stockholm');
const Event = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [events, setEvents] = useState([]);
    const getEvents = () => {
        setIsLoading(true);
        newRequest.get('/event')
          .then((res) => {
            setEvents(res.data);
            console.log(res.data);
            setIsLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setIsLoading(false);
          });
      }
      useEffect(()=>{
        getEvents()
      },[])
    const [open, setOpen] = useState(false);
    return (
        <div className="container">
                  <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, height: "100%" }}
        open={isLoading}

      >
        <CircularProgress color="inherit" />
      </Backdrop>
            <div className="containerEvent">
                <div className='events'>
                    <div className='createEvent'>
                        <ModalCreate openModal={open} setOpenModal={setOpen} getEvents = {getEvents}/>
                        <button
                            className="buttonCreate"
                            onClick={()=>{setOpen(true)}}
                        >
                            <span className='iconCreate' />
                            <span className="textCreate">Tạo sự kiện</span>
                        </button>
                    </div>
                    <DatePicker 
                        // selected={selected}
                        // onChange={changeDate}
                        inline
                        />
                </div>
                <div className='listEvent'>
                    <ListEvent events = {events}/>
                </div>
            </div>
        </div>
    )
}

export default Event