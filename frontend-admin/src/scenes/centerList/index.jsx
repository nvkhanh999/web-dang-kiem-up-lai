//center list component

import { Box, useTheme } from "@mui/material";
import { Link } from 'react-router-dom';
import { tokens } from "../../theme";
import {
    DataGrid, GridToolbar
  } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';


const CenterList = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [data, setData] = useState([]);

	useEffect(() => {
        (async () => {
			const requestOptions = {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + localStorage.getItem("theFuckingToken"),
				  },
			};

        	const fetchData = await fetch(
            	"http://127.0.0.1:8000/center/all",
				requestOptions,
        	);
        	const data = await fetchData.json();
        	setData(data);


       	})();
    }, []);

	if (data.detail != null) {
		return <>{<Navigate to='/login'/>}</>
	}

    const columns = [
        { field: "centerID",
          headerName: "Mã trung tâm",
          renderCell: ({row : {centerID}}) => (
            <Link style={{ textDecoration: 'none', color: colors.grey[100] }}
            to={`/centerList/${centerID}`}>{centerID}</Link>
          ),
        },
		
        {
          field: "name",
          headerName: "Tên trung tâm",
          flex: 1,
          cellClassName: "name-column--cell",
        },
        {
          field: "address",
          headerName: "Địa chỉ",
          headerAlign: "left",
          align: "left",
        },
        {
          field: "phoneNumber",
          headerName: "Số điện thoại",
          flex: 1,
        },
        {
          field: "email",
          headerName: "Email",
          flex: 1,
        },
        
      ];

  return (
    <Box m="20px">
      <Header
        title="Danh sách trung tâm đăng kiểm"
        subtitle="Quản lý thông tin các trung tâm đăng kiểm"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        width="100%"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
		  getRowId={row => row.centerID}
        />
      </Box>
    </Box>
  );
};

export default CenterList;
