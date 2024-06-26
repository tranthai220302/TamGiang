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
import { clazzs, days, ts, tableStyle, cellStyle, thStyle, thSecondChildStyle, thFirstChildStyle, style, day1s } from './data';
import BasicTable from '../../components/table/table';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import TableReason from '../../components/table/TableReason';
import * as XLSX from 'xlsx';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
const ScheduleAfternoon = () => {
    const [timeTable, setTimeTable] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [run, setRun] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [open1, setOpen1] = useState(false);
    const [reason, setReason] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        generateTimeTableAfterNoon();
    }, []);

    const generateTimeTableAfterNoon = () => {
        setIsLoading(true);
        newRequest.get('/schedule/generate/afternoon')
            .then((res) => {
                setTimeTable(res.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    }

    const sortTimeTableAfternoon = (date) => {
        setIsLoading(true);
        newRequest.get(`/schedule/sort/afternoon?date=${date}`)
            .then((res) => {
                setIsLoading(false);
                setTimeTable(res.data.data);
                setRun(res.data.run);
            }).catch((error) => {
                setIsLoading(false);
                console.log(error);
            })
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

    const exportToExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Thời khóa biểu');
        const header = ['', '', ...clazzs];
        worksheet.columns = [
            { width: 15 }, 
            { width: 15 }, 
            ...clazzs.map(() => ({ width: 20 })) 
        ];
        worksheet.addRow(header);

        ts.forEach(t => {
            day1s.forEach((day, index) => {
                if (index === 0) {
                    const row = [`Thứ ${t}`, `Tiết ${1}`];

                    clazzs.forEach(clazz => {
                        let cellData = '';
                        if (timeTable[`${t}-1`]) {
                            const lesson = timeTable[`${t}-1`].find(lesson => lesson.SchoolClass.name === clazz);
                            if (lesson && !lesson?.Subject?.name?.includes("Check")) {
                                cellData = [
                                    { text: lesson.Subject.name, font: { size: 10, bold: true } },
                                    ...(lesson.Teacher?.User?.name ? [{ text: `\n${lesson.Teacher.User.name}`, font: { size: 8, italic: true } }] : [])
                                ];
                            }
                        }
                        if (cellData.length > 0) {
                            row.push({ richText: cellData });
                        } else {
                            row.push('');
                        }
                    });
    
                    worksheet.addRow(row);
                }else{
                    const row = [``, `Tiết ${day}`];

                    clazzs.forEach(clazz => {
                        let cellData = '';
                        if (timeTable[`${t}-${day}`]) {
                            const lesson = timeTable[`${t}-${day}`].find(lesson => lesson.SchoolClass.name === clazz);
                            if (lesson && !lesson?.Subject?.name?.includes("Check")) {
                                cellData = [
                                    { text: lesson.Subject.name, font: { size: 10, bold: true } },
                                    ...(lesson.Teacher?.User?.name ? [{ text: `\n${lesson.Teacher.User.name}`, font: { size: 8, italic: true } }] : [])
                                ];
                            }
                        }
                        if (cellData.length > 0) {
                            row.push({ richText: cellData });
                        } else {
                            row.push('');
                        }
                    });
    
                    worksheet.addRow(row);
                }

            });
            worksheet.addRow(Array(clazzs.length + 2).fill(''));
        });

        // Định dạng các ô
        worksheet.eachRow((row, rowNumber) => {
            row.eachCell((cell, colNumber) => {
                cell.font = {
                    name: 'Arial',
                    size: 10,
                    bold: rowNumber === 1 // Dòng tiêu đề in đậm
                };
                cell.alignment = {
                    vertical: 'middle',
                    horizontal: 'center',
                    wrapText: true
                };
                cell.border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                };
                if (rowNumber === 1) {
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'FFaacdd4' }
                    };
                }
            });
            const firstCell = row.getCell(1);
            firstCell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFaacdd4' } // Màu nền vàng cho cột đầu tiên
            };
        });

        // Xuất file Excel
        const buffer = await workbook.xlsx.writeBuffer();
        const dataBlob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(dataBlob, 'ThoiKhoaBieu.xlsx');
    }



    return (
        <div className='container'>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
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
                <button onClick={exportToExcel}>Xuất Excel</button>
                <button onClick={() => { generateTimeTableAfterNoon(startDate) }}>
                    Khởi tạo thời khoá biểu
                </button>
                <button onClick={() => { sortTimeTableAfternoon(startDate) }}>
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
                    sx={{ minWidth: 500 }}
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
                                <td rowSpan="5" style={{ ...cellStyle, fontSize: '18px', fontWeight: 'bold', backgroundColor: '#f2f2f2' }}>Thứ {t}</td>
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
                                                                <div style={{ fontStyle: 'italic', fontSize: '10px' }}>{!lesson.Subject.name.includes("Check") && (lesson.Teacher.User.name)}</div>
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
                                    {clazzs.map((clazz, j) => {
                                        let count = 0;
                                        let cells = [];
                                        // eslint-disable-next-line no-lone-blocks
                                        {
                                            timeTable[`${t}-${day}`] && timeTable[`${t}-${day}`].map((lesson) => {
                                                if (lesson.SchoolClass.name === clazz) {
                                                    count++;
                                                    cells.push(
                                                        <td key={lesson.id} style={day === '10' ? { ...cellStyle, borderBottom: '15px solid #f2f2f2' } : cellStyle}>
                                                            <div style={{ fontSize: '10px', fontWeight: '600' }}>{!lesson.Subject.name.includes("Check") && lesson.Subject.name}</div>
                                                            {lesson?.Teacher?.User?.name && (
                                                                <div style={{ fontStyle: 'italic', fontSize: '10px' }}>{!lesson.Subject.name.includes("Check") && (lesson.Teacher.User.name)}</div>
                                                            )}
                                                        </td>
                                                    )
                                                }
                                            })
                                        };
                                        if (count === 0) {
                                            cells.push(
                                                <td key={j} style={day === '10' ? { ...cellStyle, borderBottom: '15px solid #f2f2f2' } : cellStyle}></td>
                                            );
                                        }
                                        return (
                                            <React.Fragment key={j}>
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
    )
}

export default ScheduleAfternoon;
