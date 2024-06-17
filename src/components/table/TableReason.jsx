import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function TableReason({data}) {
    const getDayOfWeek = (date)=> {
        const dayjsDate = dayjs(date, 'DD-MM-YYYY');
        const dayOfWeek = dayjsDate.day();
        const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
        return daysOfWeek[dayOfWeek];
    }
  return (
    <TableContainer sx={{maxHeight : 500}}>
        <div>Danh sách ngày nghỉ giáo viên </div>
      <Table sx={{ minWidth: 200 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Teacher</TableCell>
            <TableCell align="right">Ngày nghỉ</TableCell>
            <TableCell align="right">Thứ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
            >
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right">{row.Teacher.User.name}</TableCell>
              <TableCell align="right">{dayjs(row.date).format('DD-MM-YYYY')}</TableCell>
              <TableCell align="right">{getDayOfWeek(dayjs(row.date).format('DD-MM-YYYY'))}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
