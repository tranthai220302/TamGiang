import React, { useState, useEffect } from 'react';
import newRequest from '../../ults/newRequest';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { clazzs, days, ts, tableStyle, cellStyle, thStyle, thSecondChildStyle, thFirstChildStyle, style } from '../sortTimeTable/data';

const TKB = () => {
    const [timeTable, setTimeTable] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    // const [open, setOpen] = React.useState(false);
    // const [run, setRun] = useState([]);
    // const navigate = useNavigate();
    useEffect(() => {
        generateTimeTable(1);
    }, []);
    const generateTimeTable = (isMorning) => {
        setIsLoading(true);
        newRequest.get(`/schedule/timetable?isMorning=${isMorning}`)
            .then((res) => {
                setTimeTable(res.data);
                setIsLoading(false);
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
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom : '10px', justifyContent: 'left' }}>
                <button onClick={() => { generateTimeTable(1) }}>
                    Thời khoá biểu buổi sáng
                </button>
                <button onClick={() => { generateTimeTable(0) }}>
                    Thời khoá biểu buổi chiều
                </button>
{/* 
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
                )} */}
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
                                        {timeTable[`${t}-1`] && timeTable[`${t}-1`].map((lesson)=>{
                                            if( lesson.SchoolClass.name === clazz ) {
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
                                        })};
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
                                            if(lesson.SchoolClass.name == clazz){
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
                                        if(count == 0){
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

export default TKB;
