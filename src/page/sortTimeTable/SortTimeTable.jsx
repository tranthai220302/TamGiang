import React, { useState, useEffect } from 'react';
import newRequest from '../../ults/newRequest';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { clazzs, days, ts, tableStyle, cellStyle, thStyle, thSecondChildStyle, thFirstChildStyle, style } from './data';
import BasicTable from '../../components/table/table';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import TableReason from '../../components/table/TableReason';
const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}));

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}));
const Schedule = () => {
    const [timeTable, setTimeTable] = useState({});
    const [open1, setOpen1] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [run, setRun] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [reason, setReason] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        generateTimeTable();
    }, []);
    const sortTimeTable = (date) => {
        setIsLoading(true);
        newRequest.get(`/schedule/sort?date=${date}`)
            .then((res) => {
                setIsLoading(false);
                setTimeTable(res.data.data);
                setRun(res.data.run)
            }).catch((error) => {
                setIsLoading(false);
                console.log(error);
            })
    }
    const generateTimeTable = (date) => {
        setIsLoading(true);
        newRequest.get(`/schedule/generate?date=${date}`)
            .then((res) => {
                setTimeTable(res.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    }
    const getReasonsByDate = (date) => {
        setIsLoading(true);
        newRequest.get(`/reason/date?date=${date}`)
            .then((res) => {
                setReason(res.data);
                setIsLoading(false);
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    }


    return (
        <div className='container'>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px', justifyContent: 'left' }}>
                {/* <LightTooltip title={
                    <React.Fragment>
                        <span>Các ràng buộc :</span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '5px' }}>
                            <span>Giáo viên không dạy 2 lớp trong 1 thời gian</span>
                            <span>Các môn (Địa Lý, GDCD, Công nghệ) phải phân bố đều có ngày cách</span>
                            <span>Các môn (Toán, Ngữ Văn, Anh Văn) phải liền</span>
                            <span>Tránh 1 ngày có 3 môn liên tiếp gống nhau</span>
                            <span>Chào cờ tiết đầu</span>
                            <span>SHL tiết cuối</span>
                        </div>
                    </React.Fragment>
                }>
                    <button onClick={() => { sortTimeTable() }}>
                        Sắp xếp thời khoá biểu buổi sáng
                    </button>
                </LightTooltip> */}
                {/* <LightTooltip title={
                    <React.Fragment>
                        <span>Các ràng buộc :</span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '5px' }}>
                            <span>Giáo viên không dạy 2 lớp trong 1 thời gian</span>
                            <span>Các môn (Địa Lý, GDCD, Công nghệ) phải phân bố đều có ngày cách</span>
                            <span>Các môn (Toán, Ngữ Văn, Anh Văn) phải liền</span>
                            <span>Tránh 1 ngày có 3 môn liên tiếp gống nhau</span>
                            <span>Chào cờ tiết đầu</span>
                            <span>SHL tiết cuối</span>
                        </div>
                    </React.Fragment>
                }>
                    <button onClick={() => { sortTimeTableAfternoon() }}>
                        Sắp xếp thời khoá biểu buổi chiều
                    </button>
                </LightTooltip> */}
            </div>
            <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ height: "100%", display: 'flex', alignItems: 'center', marginTop: '30px' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Áp dụng từ ngày"
                            sx={{ width: "100%" }}
                            onChange={(newValue) => { setStartDate(dayjs(newValue).format('YYYY-MM-DD')); getReasonsByDate(dayjs(newValue).format('YYYY-MM-DD')) }}
                        />
                    </LocalizationProvider>
                </div>
                <button onClick={() => { generateTimeTable(startDate) }}>
                    Khởi tạo thời khoá biểu
                </button>
                <button onClick={() => { sortTimeTable(startDate) }}>
                    Sắp xếp thời khoá biểu
                </button>
                <button onClick={() => { setOpen1(true) }}>
                    Danh sách ngày nghỉ giáo viên
                </button>
                <Modal
                    open={open1}
                    onClose={() => { setOpen1(false) }}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{minWidth : 500}}
                >
                    <Box sx={style}>
                        {reason && reason.length > 0 ? (
                            <TableReason data={reason} />
                        ) : (<div>Không có giáo viên đăng ký ngày nghỉ</div>)}
                    </Box>
                </Modal>
                {run && run.length > 0 && (
                    <div>
                        <button onClick={() => { setOpen(true) }}>Kết quả</button>
                        <Modal
                            open={open}
                            onClose={() => { setOpen(false) }}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Kết quả sau mỗi lần tiến hoá
                                </Typography>
                                <BasicTable data={run} />
                            </Box>
                        </Modal>
                    </div>
                )}
            </div>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thFirstChildStyle}></th>
                        <th style={thSecondChildStyle}></th>
                        {clazzs.map(clazz => (
                            <th key={clazz} style={thStyle}>{clazz}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {ts.map(t => (
                        <React.Fragment key={t}>
                            <tr>
                                <td rowspan="5" style={{ ...cellStyle, fontSize: '18px', fontWeight: 'bold', backgroundColor: '#f2f2f2' }}>Thứ {t}</td>
                                <td style={cellStyle}>Tiết 1</td>
                                {
                                    clazzs && clazzs.map((clazz, i) => {
                                        let count = 0;
                                        let cells = [];
                                        // eslint-disable-next-line no-lone-blocks
                                        {
                                            timeTable[`${t}-1`] && timeTable[`${t}-1`].map((lesson) => {
                                                if (lesson.SchoolClass.name === clazz) {
                                                    count++;
                                                    cells.push(
                                                        <td key={lesson.id} style={cellStyle}>
                                                            <div style={{ fontSize: '10px', fontWeight: '600' }}>{!lesson.Subject.name.includes("Check") && lesson.Subject.name}</div>
                                                            {lesson?.Teacher?.User?.name && (
                                                                <div style={{ fontStyle: 'italic', fontSize: '10px' }}>{!lesson.Subject.name.includes("Check") && (lesson.Teacher.User.name)}</  div>
                                                            )}
                                                        </td>
                                                    )
                                                }
                                            })
                                        };
                                        if (count === 0) {
                                            cells.push(
                                                <td style={cellStyle} key={i}></td>
                                            );
                                        }
                                        return (
                                            <React.Fragment key={i}>
                                                {cells}
                                            </React.Fragment>
                                        );
                                    })
                                }
                            </tr>
                            {days.map((day, i) => (
                                <tr key={i}>
                                    <td style={day === '10' ? { ...cellStyle, borderBottom: '15px solid #f2f2f2' } : cellStyle}>Tiết {day}</td>
                                    {timeTable[`${t}-${day}`] && clazzs.map((clazz, i) => {
                                        let count = 0;
                                        let cells = [];
                                        timeTable[`${t}-${day}`].map(lesson => {
                                            if (lesson.SchoolClass.name == clazz) {
                                                count++;
                                                cells.push(
                                                    <td key={lesson.id} style={day === '5' ? { ...cellStyle, borderBottom: '15px solid #f2f2f2' } : cellStyle}>
                                                        <div style={{ fontSize: '10px', fontWeight: '600' }}>{!lesson.Subject.name.includes("Check") && lesson.Subject.name} </div>
                                                        {lesson?.Teacher?.User?.name && (
                                                            <div style={{ fontStyle: 'italic', fontSize: '10px' }}>{!lesson.Subject.name.includes("Check") && (lesson.Teacher.User.name)}</div>
                                                        )}
                                                    </td>
                                                );
                                            }
                                        })
                                        if (count == 0) {
                                            cells.push(
                                                <td style={cellStyle} key={i}></td>
                                            );
                                        }
                                        return (
                                            <React.Fragment key={i}>
                                                {cells}
                                            </React.Fragment>
                                        );
                                    })}

                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Schedule;