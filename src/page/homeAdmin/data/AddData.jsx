import React, { useEffect, useState } from 'react';
import { styles, styles1 } from './style';
import { Button, List, ListItem, ListItemButton, ListItemText, Paper, InputBase, Divider, IconButton, Backdrop, CircularProgress, Pagination, Alert } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import newRequest from '../../../ults/newRequest';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DeleteTwoTone } from '@mui/icons-material';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';

const AddData = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState(null);
    const [open, setOpen] = useState(false);
    const [schedule, setSchedule] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const [openST, setOpenST] = useState([]);
    const [dataST, setDataST] = useState([]);
    const [numPage, setNumPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1)
    const [id, setId] = useState(null);
    const [st, setST] = useState(null)
    const [name, setName] = useState(null);
    const [subject, setSubject] = useState(null);
    const [number, setNumber] = useState(0)
    const [openSn, setOpenSn] = React.useState(false);
    const [message, setMessage] = useState(null);

    const handleClick = () => {
        setOpenSn(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSn(false);
    }

    const handleSearch = (search) => {
        newRequest.get(`/class/search?search=${search}`)
            .then((res) => {
                setData(res.data.hits);
            }).catch((error) => {
                console.log(error);
            });
    };

    const handleSearchST = (search, index) => {
        newRequest.get(`/teacher/search?search=${search}`)
            .then((res) => {
                setDataST(res.data.hits);
                console.log(res.data);
            }).catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        handleSearch(search);
    }, [search]);
    useEffect(() => {
        handleSearchST(name?.name);
    }, [name]);

    useEffect(() => {
        getSubjects();
    }, []);
    const handleSearchSubmit = (e, id, page) => {
        if (e) { e.preventDefault(); }
        setIsLoading(true);
        newRequest.get(`/schedule/class/${id}?page=${page}`)
            .then((res) => {
                setIsLoading(false);
                setSchedule(res.data.schedule.rows);
                setNumPage(res.data.numPage)
                console.log(res.data)
            }).catch((error) => {
                setIsLoading(false);
                console.log(error);
            });
    };

    const getSubjects = () => {
        setIsLoading(true);
        newRequest.get(`/subject`)
            .then((res) => {
                setIsLoading(false);
                setSubjects(res.data);
            }).catch((error) => {
                setIsLoading(false);
                console.log(error);
            });
    }

    const createSchedule = () => {
        setIsLoading(true);
        console.log(name, subject, number);
        if(id){
            if(!name?.id || !subject?.id){
                setIsLoading(false)
                setMessage("Nhập đầy đủ thông tin!")
                setOpenSn(true)
            }else {
                const data = {
                    SchoolClassId: id,
                    TeacherId: name.id,
                    SubjectId: subject.id,
                }
                newRequest.post(`/schedule/create`, {
                    data: data
                })
                    .then((res) => {
                        setIsLoading(false);
                        handleSearchSubmit(null, id, currentPage)
                        setOpenSn(true)
                        console.log(res.data);
                        setMessage("Thêm lịch thành công!")
                    }).catch((error) => {
                        setIsLoading(false);
                        console.log(error);
                    });
            }
        }else
        {
            setMessage("Chọn lớp để thêm lịch!")
            setIsLoading(false)
            setOpenSn(true)
        }
    }
    const deleteSchedule = (idS) => {
        setIsLoading(true);
        newRequest.delete(`/schedule/delete/${idS}`)
            .then((res) => {
                setIsLoading(false);
                setOpenSn(true)
                setMessage("Xoá lịch thành công!")
                handleSearchSubmit(null, id, currentPage)
            }).catch((error) => {
                setIsLoading(false);
                console.log(error);
            });
    }
    return (
        <div className='container' style={{ padding: '20px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
                <Snackbar open={openSn} autoHideDuration={6000} onClose={handleClose}>
                    <Alert
                        onClose={handleClose}
                        severity="success"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        {message}
                    </Alert>
                </Snackbar>
            </div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div style={{ position: "relative" }}>
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                    onSubmit={(e) => handleSearchSubmit(e)}
                >
                    <IconButton sx={{ p: '10px' }} aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Tìm lớp"
                        inputProps={{ 'aria-label': 'search class' }}
                        onChange={(e) => { setSearch(e.target.value); setOpen(true); }}
                        value={search || ''}
                    />
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
                <nav aria-label="secondary mailbox folders" style={{ position: 'absolute', marginTop: '3px', zIndex: 9999999999999 }}>
                    <List style={{ position: 'absolute', backgroundColor: 'white', boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                        {open && data && data.length > 0 && data.map((item) => (
                            <ListItem disablePadding key={item.objectID}>
                                <ListItemButton component="a" href="#simple-list" onClick={(e) => { setSearch(item.name); setOpen(false); handleSearchSubmit(e, item.objectID, 1); setId(item.objectID) }}>
                                    <ListItemText primary={item.name} sx={{ width: "200px" }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </nav>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', padding: '8px 0', gap: '10px', position: 'relative' }}>
                <select
                    style={styles.selectBox}
                    onChange={(e) => {
                        setSubject({
                            id: e.target.value,
                            name: e.target.options[e.target.selectedIndex].text
                        }); console.log(e.target.value)
                    }}
                >
                    <option value={subject?.id}>Môn học</option>
                    {subjects.map(subject => (
                        <option key={subject.id} value={subject.id}>{subject.name}</option>
                    ))}
                </select>
                <input
                    type="text"
                    style={styles.periodInput2}
                    onChange={(e) => {
                        setName({
                            name: e.target.value
                        }); setOpenST(true)
                    }}
                    value={name?.name ?? ""}
                    placeholder='Nhập tên giáo viên'
                />
                <nav aria-label="secondary mailbox folders" style={{ position: 'relative', marginTop: '3px', zIndex: 9999, height: "100px", top: '70px', right: '31%' }}>
                    <List style={{ position: 'absolute', backgroundColor: 'white', maxHeight: "400px", overflowY: "auto", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                        {openST && dataST && dataST.length > 0 && dataST.map((item) => (
                            <ListItem disablePadding key={item.objectID} sx={{ width: "100%" }}>
                                <ListItemButton component="a" href="#simple-list" sx={{ width: "100%" }} onClick={() => {
                                    setOpenST(false);
                                    setName({
                                        name: item.name,
                                        id: item.objectID
                                    });
                                }}>
                                    <ListItemText primary={item.name} sx={{ width: "250px" }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </nav>
                <Button variant='outlined' sx={{ flex: 1 }} onClick={() => { createSchedule() }}>Thêm</Button>
                <div style={{flex : 2}}></div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '30px' }}>
                <table style={styles.table}>
                    <thead>
                        <tr style={{ backgroundColor: 'red' }}>
                            <th style={{ ...styles.th, ...styles.thTd }}>Môn Học</th>
                            <th style={{ ...styles.th, ...styles.thTd }}>Số Tiết</th>
                            <th style={{ ...styles.th, ...styles.thTd, position: 'relative' }}>Giáo Viên</th>
                            <th style={{ ...styles.th, ...styles.thTd }}>Xoá</th>
                            {/* <th style={{ ...styles.th, ...styles.thTd }}>Chỉnh sửa</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {schedule.map((row, index) => (
                            <tr key={row.id}>
                                <td style={styles.thTd}>
                                    <select
                                        style={styles.selectBox}
                                        value={row.subject}
                                    >
                                        <option>{row.Subject.name}</option>
                                        {subjects.map(subject => (
                                            <option key={subject.id} value={subject.id}>{subject.name}</option>
                                        ))}
                                    </select>
                                </td>
                                <td style={styles.thTd}>
                                    <input
                                        type="number"
                                        min="1"
                                        style={styles.periodInput1}
                                        value={row.number_of_periods}
                                    />
                                </td>
                                <td style={{ ...styles.thTd, position: "relative" }}>
                                    <input
                                        type="text"
                                        style={styles.periodInput2}
                                        value={row.Teacher?.User?.name}
                                    />
                                </td>
                                <td style={styles.thTd}>
                                    <Button variant='outlined' onClick={()=>{deleteSchedule(row.id)}}><DeleteIcon /></Button>
                                </td>
                                {/* <td style={styles.thTd}>
                                    <Button variant='outlined'><EditIcon /></Button>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* <div style={{ display: 'flex', width: '30%' }}>
                    <Button onClick={addRow} variant='outlined'>Thêm dữ liệu</Button>
                    <Button variant='outlined'>Lưu</Button>
                </div> */}
            </div>

            <div style={styles.pagination}>
                <Pagination
                    defaultPage={currentPage}
                    count={numPage}
                    style={{ display: 'flex', justifyContent: 'center' }}
                    onChange={(event, value) => {
                        handleSearchSubmit(null, id, value)
                        setCurrentPage(value)
                    }}
                />
            </div>
        </div>
    );
};

export default AddData;