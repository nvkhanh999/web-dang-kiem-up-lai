//center detail component

import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {Box, Typography, useTheme, Button} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { tokens } from "../../theme";
import {
    DataGrid,
    GridToolbar,
  } from "@mui/x-data-grid";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import { Navigate } from 'react-router-dom';

const CenterDetail = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [registry, setRegistry] = useState([]);
	const [month, setMonth] = useState([])
	const [quarter, setQuarter] = useState([])
	const [year, setYear] = useState([])
	const [expired, setExpired] = useState([])
	const centerID = useParams().centerID;

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
            "http://127.0.0.1:8000/registry/center/"+ centerID, requestOptions,
         );
         const registry = await fetchData.json();

         setRegistry(registry);
       })();
    }, []);


    
	var today = new Date();
	var d = String(today.getDate()).padStart(2, '0');
	var m = String(today.getMonth() + 1).padStart(2, '0');
	var y = today.getFullYear();
	const checkStatus = (date) => {
		date = String(date);
		let year = parseInt(date.substring(0, 4)) - y;
		let month = parseInt(date.substring(5, 7)) - m;
		let day = parseInt(date.substring(8, 10)) - d;
		
		if (year < 0) return 'Đã hết hạn';

		if (year == 0) {
			if (month < 0) return 'Đã hết hạn';
			if (month == 0) {
				if (day < 0) return 'Đã hết hạn';
				if (day <= 30) return 'Sắp hết hạn';
				return 'Bình thường';
			}
			if (month > 1) return 'Bình thường';
			if (day >= 0) return 'Bình thường';
			return 'Sắp hết hạn';
		}

		if (month == -11) {
			if (day >= 0) return 'Bình thường';
			return 'Sắp hết hạn';
		}
		return 'Bình thường';
	  };
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
				"http://127.0.0.1:8000/registry/month/" + centerID,
				requestOptions,
			);
			const month = await fetchData.json();
			setMonth(month);
		   })();
		}, []);
	
		
	
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
					"http://127.0.0.1:8000/registry/quarter/" + centerID,
					requestOptions,
				);
				const quarter = await fetchData.json();
				setQuarter(quarter);
			   })();
			}, []);
		
		
	
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
					"http://127.0.0.1:8000/registry/year/" + centerID,
					requestOptions,
				);
				const year = await fetchData.json();
				setYear(year);
			   })();
		}, []);
	
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
					"http://127.0.0.1:8000/registry/almostExpired/" + centerID,
					requestOptions,
				);
				const expired = await fetchData.json();
				setExpired(expired);
			   })();
		}, []);

		
		if (month.detail != null) {
			return <>{<Navigate to='/login'/>}</>
		}
	
		if (quarter.detail != null) {
			return <>{<Navigate to='/login'/>}</>
		}
			
		if (year.detail != null) {
			return <>{<Navigate to='/login'/>}</>
		}
	
		if (expired.detail != null) {
			return <>{<Navigate to='/login'/>}</>
		}
		
    const columns = [
        { field: "registryID", 
		 headerName: "Mã số kiểm định",
		 renderCell: ({row : {registryID}}) => (
			<Link style={{ textDecoration: 'none', color: colors.grey[100] }} 
			to={`/registryManagement/${registryID}`}>{registryID}</Link>
		  ),
		 },
        {
          field: "carID",
          headerName: "Biển số xe",
          flex: 1,
          cellClassName: "name-column--cell",
        },        
        {
          field: "centerID",
          headerName: "Mã số trung tâm đăng kiểm",
          flex: 1,
        },
        {
          field: "endDate",
          headerName: "Ngày hết hạn",
		  renderCell: ({row : {registryID, endDate}}) => {
			return (
			  <Typography sx={{ color: colors.grey[100]}}>
				{endDate.substring(0,10)}
			  </Typography>
			);
		  },
          flex: 1,
        },
		{
			field: "status",
			headerName: "Trạng thái",
			flex: 1,
			renderCell: ({row : {registryID, endDate}}) => {
			  return (
				<Typography color={checkStatus(endDate) === "Bình thường" ? colors.greenAccent[400]: '#fff207'}>{checkStatus(endDate)}</Typography>
			  );
			},
		  },
      ];
      
    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="Trung tâm đăng kiểm" subtitle="Quản lý danh sách xe đã đăng kiểm tại trung tâm" />
                <Box>
                    <Link to="/centerList">
                        <Button
                        sx={{
                        backgroundColor: colors.blueAccent[700],
                        color: colors.grey[100],
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 20px"
                        }}
                        >
                            Quay về trang trước
                        </Button>
                    </Link>
                </Box>
            </Box>
        {/* Static */}
        <Grid container spacing={2} >
            <Grid xs={6} md={3}>
                <Box
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ height: 140}}>
                <StatBox
					stat={month.data}
					title={"Tháng " + month.date}
                    subtitle="Xe đăng kiểm mới"
                    progress="0.14"
                    increase="+14%"
                />
                </Box>
            </Grid>

            <Grid xs={6} md={3}>
                <Box
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ height: 140}}
                >
                <StatBox
                    stat={quarter.data}
					title={"Quý " + quarter.date}
                    subtitle="Xe đăng kiểm mới"
                    progress="0.35"
                    increase="+35%"
                />
                </Box>
            </Grid>

            <Grid xs={6} md={3}>
                <Box
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ height: 140}}
                >
                <StatBox
					stat={year.data}
					title={"Năm " + year.date}
                    subtitle="Xe đăng kiểm mới"
                    progress="0.35"
                    increase="+35%"
                />
                </Box>
            </Grid>

            <Grid xs={6} md={3}>
                <Box
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ height: 140}}
                >
                <StatBox
                     stat={expired}
                    title="Thống kê"
                    subtitle="Xe sắp hết hạn đăng kiểm"
                    progress="0.05"
                    increase="5%"
                />
                </Box>
            </Grid>  
        </Grid>

        {/* Table List */}

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
            rows={registry}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
			getRowId={row => row.registryID}
            />
        </Box>

    </Box>
    );
};
export default CenterDetail;