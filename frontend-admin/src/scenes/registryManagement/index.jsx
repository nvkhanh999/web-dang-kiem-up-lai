//registry management page

import {Box, Typography, useTheme, Button } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import { tokens } from "../../theme";
import {
    DataGrid,
    GridToolbar,
  } from "@mui/x-data-grid";
import Grid from '@mui/material/Unstable_Grid2';
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import { useState, useEffect, useRef } from "react";
import { ToasterContainer, toast} from "react-toastify";
import { ExcelRenderer } from "react-excel-renderer";
import SelectInput from "@mui/material/Select/SelectInput";
const RegistryManagement = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const [data, setData] = useState([]);
   const [month, setMonth] = useState([])
  const [quarter, setQuarter] = useState([])
  const [year, setYear] = useState([])
  const [expired, setExpired] = useState([])
  const [id, setID] = useState([])
  

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
		 "http://127.0.0.1:8000/registry/all", requestOptions,
	  );
      const data = await fetchData.json();
      setData(data);
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

		if (year === 0) {
			if (month < 0) return 'Đã hết hạn';
			if (month === 0) {
				if (day < 0) return 'Đã hết hạn';
				if (day <= 30) return 'Sắp hết hạn';
				return 'Bình thường';
			}
			if (month > 1) return 'Bình thường';
			if (day >= 0) return 'Bình thường';
			return 'Sắp hết hạn';
		}

		if (month === -11) {
			if (day >= 0) return 'Bình thường';
			return 'Sắp hết hạn';
		}
		return 'Bình thường';
	  };

	var fetchData = (carID, centerID, startDate, endDate) => {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("theFuckingToken")},
			body: JSON.stringify({carID: carID, centerID: centerID, createdAt: startDate, endDate: endDate}),
		};
		
		fetch("http://127.0.0.1:8000/registry/create", requestOptions)
	};

	const fileInputRef = useRef();

	const handleClick = ()=> {
		fileInputRef.current.click();
		

	}
	const handleFileUpload = (e) => {
		const file = e.target.files[0];
		ExcelRenderer(file, (err, resp) => {
			if (err) {
				console.log(err);
			} else {
				const excelData = resp.rows;
				const newData = excelData.map((data) => ({ 
					carID: data[0],
					centerID: data[1],
					startDate: data[2],
					endDate: data[3]
				}));
				for ( var i in newData) {
					fetchData(newData[i].carID, newData[i].centerID, newData[i].startDate + "T00:00:00.000000", newData[i].endDate + "T00:00:00.000000")
				}
				

				toast.success("Tải thông tin thành công");
				window.location.reload(false);
	
				
			}
		})
	}
	
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
				"http://127.0.0.1:8000/registry/month",
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
					"http://127.0.0.1:8000/registry/quarter",
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
					"http://127.0.0.1:8000/registry/year",
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
					"http://127.0.0.1:8000/registry/almostExpired",
					requestOptions,
				);
				const expired = await fetchData.json();
				setExpired(expired);
			   })();
		}, []);
		

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

	
   return (
    <Box m="20px">
		<Box display="flex" justifyContent={"space-between"} alignItems="center">
		<Header title="Quản lý đăng kiểm" subtitle="Quản lý danh sách xe đã đăng kiểm trên toàn quốc" />
		<Box sx={{display: "inline-flex"}}>
			<input type="file" multiple={false} ref={fileInputRef} hidden onChange={handleFileUpload}/>
			<Button 
				onClick={handleClick}
				sx={{
					backgroundColor:colors.blueAccent[700],
					color: colors.grey[100],
					fontSize:"14px",
					fontWeight: "800",
					padding: "10px 20px"
				}}
			>
				Tải lên thông tin
			</Button>
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
            rows={data}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
			getRowId={row => row.registryID}
            />
        </Box>

    </Box>
        
    
   );
};

export default RegistryManagement;