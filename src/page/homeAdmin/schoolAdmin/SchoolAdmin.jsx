import React, { useEffect, useState } from 'react'
import Datatable from '../../../components/admin/dataTable/DataTable'
import newRequest from '../../../ults/newRequest';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import ClassTable from '../../../components/admin/classTable/ClassTable';
const SchoolAdmin = () => {
    const [school, setSchool] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(()=>{
        setIsLoading(true);
        newRequest.get('/clazz').then((res)=>{
            setIsLoading(false);
            setSchool(res.data)
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
            {school && (
                <div className='container' style={{padding : '10px 0 40px 0'}}>
                    <ClassTable timeTable={school} />
                </div>
            )}
        </div>
    )
}

export default SchoolAdmin