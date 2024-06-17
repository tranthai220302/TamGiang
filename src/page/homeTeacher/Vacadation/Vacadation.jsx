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

const Vacadation = () => {
    const [startDate, setStartDate] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isOrder, setIsOrder] = useState()
    const [reason, setReason] = useState(null);
    const [data, setData] = useState()
    const [dataAfterNoon, setDataAfterNoon] = useState();
    const [isOrderAfter, setIsOrderAfter] = useState();
    const [allChecked, setAllChecked] = useState(false); // Trạng thái của ô chọn tất cả
    const [checkedItems, setCheckedItems] = useState([]); // Danh sách các mục đã chọn
    const [reasons, setReasons] = useState([]);
    console.log(checkedItems)
    const handleToggle = (key, day, period, lessonClass, lessonSubject) => () => {
        const currentIndex = checkedItems.findIndex(item => item.order === period && item.day === day && item.class === lessonClass && item.subject === lessonSubject);
        const newCheckedItems = [...checkedItems];

        if (currentIndex === -1) {
            newCheckedItems.push({ order: period, day, class: lessonClass, subject: lessonSubject }); // Thêm phần tử nếu chưa tồn tại trong mảng
        } else {
            newCheckedItems.splice(currentIndex, 1); // Loại bỏ phần tử nếu đã tồn tại trong mảng
        }

        setCheckedItems(newCheckedItems);
    };

    const getDayOfWeek = (date)=> {
        const dayjsDate = dayjs(date, 'DD-MM-YYYY');
        const dayOfWeek = dayjsDate.day();
        const daysOfWeek = ['1', '2', '3', '4', '5', '6', '7'];
        return daysOfWeek[dayOfWeek];
    }
    const checkSchedule = (date) => {
        setIsLoading(true);
        newRequest.get(`/teacher/date?date=${date}`)
            .then((res) => {
                setData(res.data.vacation);
                setIsOrder(res.data.isOrder)
                setDataAfterNoon(res.data.vacationAfternoon);
                setIsOrderAfter(res.data.isOrderAfternoon)
                setIsLoading(false);
                console.log(res.data)
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    }
    const getReasons = () => {
        setIsLoading(true);
        newRequest.get(`/reason`)
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
    const createReason = () => {
        setIsLoading(true);
        let data = [];
        // checkedItems.map((item) => {
        //     if (item.class && item.subject) {
        //         data.push(item);
        //     }
        // })
        newRequest.post(`/reason/create`, {
            date: startDate,
            reason: reason,
        })
            .then((res) => {
                getReasons();
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    }
    useEffect(() => {
        getReasons()
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
                    <h3>Đăng ký xin nghỉ phép</h3>
                    <span>Hãy chọn đầy đủ thông tin tiêt học, môn học, lớp học và ngày bạn muốn nghỉ. Ngày nghỉ của bạn sẽ được áp dụng vào tuần sau</span>
                    <Stack spacing={2} direction="row">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Nghỉ từ"
                                sx={{ width: "70%" }}
                                onChange={(newValue) => { setStartDate(dayjs(newValue).format('YYYY-MM-DD')) }}
                            />
                        </LocalizationProvider>
                        <Button variant='outlined' sx={{ width: "30%" }} onClick={() => { checkSchedule(startDate) }}>Kiểm tra</Button>
                    </Stack>
                    <Stack>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            <ListItem key="all" disablePadding>
                            </ListItem>
                            {isOrder && isOrder == "Không có tiết dạy buổi sáng" && (
                                <div>{isOrder}</div>
                            )}
                            {isOrder == true && (
                                <React.Fragment>
                                    <div style={{fontWeight : '600',paddingLeft : '10px'}}>Tiết dạy buổi sáng</div>
                                    {Object.keys(data).map((key) => {
                                        const [day, period] = key.split('-'); // Tách chuỗi key thành thứ và tiết
                                        if (data[key].length === 0) {
                                            return null; // Bỏ qua nếu không có dữ liệu cho tiết này
                                        }
                                        const lesson = data[key][0];
                                        const { SchoolClass, Subject } = lesson;
                                        return (
                                            <ListItem key={key} disablePadding>
                                                <ListItemButton dense onClick={handleToggle(key, day, period, SchoolClass.name, Subject.name)}>
                                                    <ListItemIcon>
                                                    </ListItemIcon>
                                                    <ListItemText id={`checkbox-list-label-${key}`} primary={`Thứ ${day} - Tiết ${period}`} />
                                                </ListItemButton>
                                                <ListItemText
                                                    primary={`${Subject.name} - ${SchoolClass.name}`}
                                                />
                                            </ListItem>
                                        );
                                    })}

                                </React.Fragment>
                            )}
                            {isOrderAfter && isOrderAfter == "Không có tiết dạy buổi chiều" && (
                                <div>{isOrder}</div>
                            )}
                            {isOrderAfter == true && (
                                <React.Fragment>
                                <div style={{marginTop : '10px', fontWeight : '600', paddingLeft : '10px'}}>Tiết dạy buổi chiều</div>
                                    {Object.keys(dataAfterNoon).map((key) => {
                                        const [day, period] = key.split('-'); // Tách chuỗi key thành thứ và tiết
                                        if (dataAfterNoon[key].length === 0) {
                                            return null; // Bỏ qua nếu không có dữ liệu cho tiết này
                                        }
                                        const lesson = dataAfterNoon[key][0];
                                        const { SchoolClass, Subject } = lesson;
                                        return (
                                            <ListItem key={key} disablePadding>
                                                <ListItemButton dense onClick={handleToggle(key, day, period, SchoolClass.name, Subject.name)}>
                                                    <ListItemIcon>
                                                    </ListItemIcon>
                                                    <ListItemText id={`checkbox-list-label-${key}`} primary={`Thứ ${day} - Tiết ${period}`} />
                                                </ListItemButton>
                                                <ListItemText
                                                    primary={`${Subject.name} - ${SchoolClass.name}`}
                                                />
                                            </ListItem>
                                        );
                                    })}

                                </React.Fragment>
                            )}
                        </List>
                    </Stack>
                    <TextField
                        id="outlined-multiline-static"
                        label="Lý do"
                        multiline
                        rows={4}
                        name='desc'
                        onChange={(e) => { setReason(e.target.value) }}
                    />
                    <Button variant='contained' onClick={() => createReason()}>Submit</Button>
                </Stack>
                <Stack direction={"column"} spacing={3}>
                    <h3>Thống kê các ngày nghỉ</h3>
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

export default Vacadation