import "./DataTable.css";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../../dataSource.js";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import newRequest from "../../../ults/newRequest.js";
import CircularProgress from '@mui/material/CircularProgress';
import TimeTableTeacher from "../timeTableTeacher/TimeTableTeacher.jsx";
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import { Button } from "@mui/material";
const Datatable = ({timeTable}) => {
  const [data, setData] = useState(timeTable);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="">
            <Button variant="outlined"><PreviewIcon/></Button>
          </div>
        );
      },
    },
    {
      field: "action1",
      headerName: "",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="">
            <Button variant="outlined"><EditIcon/></Button>
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
          Thêm Giáo Viên
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={timeTable}
        columns={userColumns.concat(actionColumn)}
        pageSize={5}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;