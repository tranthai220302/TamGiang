import React, { useState, useEffect } from 'react';
import newRequest from '../../ults/newRequest';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import BasicTable from '../../components/table/table';
import { clazzs, days, ts, tableStyle, cellStyle, thStyle, thSecondChildStyle, thFirstChildStyle, style, day1s } from '../sortTimeTable/data';
import * as XLSX from 'xlsx';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const Teacher = () => {
    const [timeTable, setTimeTable] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [run, setRun] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [teachersPerPage, setTeachersPerPage] = useState(10); // Số lượng giáo viên mỗi trang

    useEffect(() => {
        generateTimeTable(1);
        getTeacher();
    }, []);

    const sortTimeTable = () => {
        setIsLoading(true);
        newRequest.get('/schedule/sort')
            .then((res) => {
                setIsLoading(false);
                setTimeTable(res.data.data);
                setRun(res.data.run)
            }).catch((error) => {
                setIsLoading(false);
                console.log(error);
            })
    }

    const generateTimeTable = (isMorning) => {
        setIsLoading(true);
        newRequest.get(`/schedule/teacher?isMorning=${isMorning}`)
            .then((res) => {
                setTimeTable(res.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    }

    const getTeacher = () => {
        newRequest.get('/teacher/hasSchedule')
            .then((res) => {
                setTeachers(res.data);
            }).catch((error) => {
                console.log(error);
            })
    }

    const abbreviateNames = (name) => {
        return name.split(' ').map(part => part[0].toUpperCase()).join('.');
    };

    // Tính chỉ số của giáo viên đầu tiên và cuối cùng trên trang hiện tại
    const indexOfLastTeacher = currentPage * teachersPerPage;
    const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
    const currentTeachers = teachers.slice(indexOfFirstTeacher, indexOfLastTeacher);

    // Render danh sách giáo viên
    const renderTeachers = currentTeachers.map((teacher) => (
        <th key={teacher.id} style={thStyle}>{teacher.User.name}</th>
    ));

    // Logic chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const exportToExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Thời khóa biểu');
        const header = ['', '', ...teachers.map(teacher => teacher.User.name)];
        worksheet.columns = [
            { width: 15 },
            { width: 15 },
            ...teachers.map(() => ({ width: 10 }))
        ];
        worksheet.addRow(header);

        ts.forEach(t => {
            day1s.forEach((day, index) => {
                const row = index === 0
                    ? [`Thứ ${t}`, `Tiết ${1}`]
                    : ['', `Tiết ${day}`];

                teachers.forEach(teacher => {
                    let cellData = '';
                    const lesson = timeTable[`${t}-${day}`] ? timeTable[`${t}-${day}`].find(lesson => lesson.TeacherId === teacher.id) : null;
                    if (lesson && lesson.Subject && !lesson.Subject.name.includes("Check")) {
                        cellData = [
                            { text: lesson.Subject.name, font: { size: 10, bold: true } },
                            ...(lesson.SchoolClass ? [{ text: `\n(${lesson.SchoolClass.name})`, font: { size: 8, italic: true } }] : [])
                        ];
                    }
                    if (cellData.length > 0) {
                        row.push({ richText: cellData });
                    } else {
                        row.push('');
                    }
                });

                worksheet.addRow(row);
            });
            worksheet.addRow(Array(teachers.length + 2).fill(''));
        });

        // Định dạng các ô
        worksheet.eachRow((row, rowNumber) => {
            row.eachCell((cell, colNumber) => {
                cell.font = {
                    name: 'Arial',
                    size: 7,
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
        <div className='container' style={{ padding: "20px 0" }}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button onClick={() => { generateTimeTable(1) }}>
                    Thời khoá biểu buổi sáng
                </button>
                <button onClick={() => { generateTimeTable(0) }}>
                    Thời khoá biểu buổi chiều
                </button>
                <button onClick={exportToExcel}>
                    Xuất Excel
                </button>
                {run && run.length > 0 && (
                    <div>
                        <Button onClick={() => { setOpen(true) }}>Open modal</Button>
                        <Modal
                            open={open}
                            onClose={() => { setOpen(false) }}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Text in a modal
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
                        {renderTeachers}
                    </tr>
                </thead>
                <tbody>
                    {ts.map(t => (
                        <React.Fragment key={t}>
                            <tr>
                                <td rowSpan="5" style={{ ...cellStyle, fontSize: '12px', fontWeight: 'bold', backgroundColor: '#f2f2f2' }}>Thứ {t}</td>
                                <td style={cellStyle}>T.1</td>
                                {currentTeachers.map((teacher, i) => {
                                    let count = 0;
                                    let cells = [];
                                    timeTable[`${t}-1`] && timeTable[`${t}-1`].forEach((lesson, j) => {
                                        if (lesson?.TeacherId === teacher.id) {
                                            count++;
                                            cells.push(
                                                <td key={lesson.id} style={cellStyle}>
                                                    <div style={{ fontSize: '10px', fontWeight: '600' }}>{lesson.Subject.name}</div>
                                                    {lesson?.SchoolClass?.name && (
                                                        <div style={{ fontStyle: 'italic', fontSize: '10px' }}>({lesson.SchoolClass.name})</div>
                                                    )}
                                                </td>
                                            );
                                        }
                                    });
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
                                })}
                            </tr>
                            {days.map(day => (
                                <tr key={day}>
                                    <td style={day === '5' ? { ...cellStyle, borderBottom: '15px solid #f2f2f2' } : cellStyle}>T.{day}</td>
                                    {currentTeachers.map((teacher, i) => {
                                        let count = 0;
                                        let cells = [];
                                        timeTable[`${t}-${day}`] && timeTable[`${t}-${day}`].forEach((lesson, j) => {
                                            if (lesson?.TeacherId === teacher.id) {
                                                count++;
                                                cells.push(
                                                    <td key={lesson.id} style={cellStyle}>
                                                        <div style={{ fontSize: '10px', fontWeight: '600' }}>{lesson.Subject.name}</div>
                                                        {lesson?.SchoolClass?.name && (
                                                            <div style={{ fontStyle: 'italic', fontSize: '10px' }}>({lesson.SchoolClass.name})</div>
                                                        )}
                                                    </td>
                                                );
                                            }
                                        });
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
                                    })}
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            {/* Nút chuyển trang */}
            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
                {teachers.length > 0 && (
                    <ul className="pagination" style={{ display: 'flex' }}>
                        {Array.from({ length: Math.ceil(teachers.length / teachersPerPage) }, (_, i) => (
                            <li key={i} className="page-item">
                                <button onClick={() => paginate(i + 1)} className="page-link">
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Teacher;
