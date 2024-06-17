import React, { useEffect, useState } from 'react'
import Datatable from '../../../components/admin/dataTable/DataTable'
import newRequest from '../../../ults/newRequest';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
const TeacherAdmin = () => {
    const [teacher, setTeacher] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(()=>{
        setIsLoading(true);
        newRequest.get('/teacher').then((res)=>{
            setIsLoading(false);
            setTeacher(res.data)
        }).catch((error)=>{
            setIsLoading(false);
            console.log(error);
        })
    },[])
    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {teacher && (
                <div className='container' style={{padding : '10px 0 40px 0'}}>
                    <Datatable timeTable={teacher} />
                </div>
            )}
        </div>
    )
}

export default TeacherAdmin