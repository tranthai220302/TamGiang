import { Button, ButtonGroup, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import newRequest from '../../../ults/newRequest';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import dayjs from 'dayjs';
import { fastMemo } from '@mui/x-data-grid/internals';
const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Tên', width: 130 },
    { field: 'date', headerName: 'Ngày', width: 130 },
    {
        field: 'reason',
        headerName: 'Lý do',
        type: 'number',
        width: 200,
    },
];

// const rows = [
//     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

const ConfirmVaction = () => {
    const [startDate, setStartDate] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [reasonNo, setReasonNo] = useState(null);
    const [reasons, setReasons] = useState([]);
    const getReasons = (isConfirm) => {
        setIsLoading(true);
        newRequest.get(`/reason/confirm/${isConfirm}`)
            .then((res) => {
                console.log(res.data)
                setReasons(res.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    }
    const getReasonsNo = (isConfirm) => {
        setIsLoading(true);
        newRequest.get(`/reason/confirm/${isConfirm}`)
            .then((res) => {
                console.log(res.data)
                setReasonNo(res.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    }
    useEffect(() => {
        getReasons(true);
        getReasonsNo(false)
    }, [])
    return (
        <div className='container' style={{ padding: "30px 0" }}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Stack direction="row" spacing={7}>
                <Stack direction="column" spacing={3}>
                <h3>Danh sách chưa được duyệt</h3>
                    <div style={{ height: 400, width: '100%' }}>
                        {reasonNo && (
                            <DataGrid
                                rows={reasonNo}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                pageSizeOptions={[5, 10]}
                                checkboxSelection
                            />
                        )}
                    </div>
                </Stack>
                <Stack direction={"column"} spacing={3}>
                    <h3>Danh đã được duyệt</h3>
                    <div style={{ height: 400, width: '100%' }}>
                        {reasons && (
                            <DataGrid
                                rows={reasons}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                pageSizeOptions={[5, 10]}
                                checkboxSelection
                            />
                        )}
                    </div>
                </Stack>
            </Stack>
        </div>
    )
}

export default ConfirmVaction;