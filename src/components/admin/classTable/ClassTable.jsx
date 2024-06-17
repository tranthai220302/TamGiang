
import { DataGrid } from "@mui/x-data-grid";
import { classColumn, userRows } from "../../../dataSource.js";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import newRequest from "../../../ults/newRequest.js";
import CircularProgress from '@mui/material/CircularProgress';
import TimeTableTeacher from "../timeTableTeacher/TimeTableTeacher.jsx";
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import { Button } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
const ClassTable = ({timeTable}) => {
  const [data, setData] = useState(timeTable);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Danh sách học sinh",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="">
            <Button variant="outlined"><PersonIcon/></Button>
          </div>
        );
      },
    },
    {
      field: "action1",
      headerName: "Trang thiết bị",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="">
            <Button variant="outlined"><TableRestaurantIcon/></Button>
          </div>
        );
      },
    },

  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        <div></div>
        <Link to="/admin/users/new" className="link">
          Thêm Lớp
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={timeTable}
        columns={classColumn.concat(actionColumn)}
        pageSize={5}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
};

export default ClassTable;