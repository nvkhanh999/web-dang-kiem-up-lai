//dashboard component

import {Box, Typography, useTheme, Button, IconButton } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Grid from '@mui/material/Unstable_Grid2';
import StatBox from "../../components/StatBox";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import LineChart from "../../components/LineChart";
import { useState, useEffect } from "react";
import { Link, Navigate } from 'react-router-dom';

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

	const [month, setMonth] = useState([])
  const [quarter, setQuarter] = useState([])
  const [year, setYear] = useState([])
  const [expired, setExpired] = useState([])
  const [latest, setLatest] = useState([])

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
				"http://127.0.0.1:8000/registry/latest/10",
				requestOptions,
			);
			const latest = await fetchData.json();
			setLatest(latest);
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

	if (latest.detail != null) {
		return <>{<Navigate to='/login'/>}</>
	}

    return (
        <Box m="20px">
        <Header title="Trang chủ" subtitle="Xin chào admin" />

        {/* Static */}
        <Grid container spacing={2} disableEqualOverflow>
            <Grid container xs={12} md={6}>
            <Grid xs={6} md={6}>
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

            <Grid xs={6} md={6}>
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

            <Grid xs={6} md={6}>
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

            <Grid xs={6} md={6}>
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
            
            <Grid xs={12} md={6}>
                <Box
                backgroundColor={colors.primary[400]}
                overflow="auto"
                sx={{ height: "300px"}}
                >
                <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                colors={colors.grey[100]}
                p="15px"
                
                >
                    <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                    Đăng kiểm gần đây
                    </Typography>
                </Box>
                {latest.map((registryRow, i) => (
                <Box
                key={`${registryRow.registryID}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
                >
                <Box>
                    <Typography
                    color={colors.greenAccent[500]}
                    variant="h5"
                    fontWeight="600"
                    >
                    {registryRow.registryID}
                    </Typography>
                </Box>
                <Box color={colors.grey[100]}>{registryRow.createdAt.substring(0,10)}</Box>
                <Box color={colors.grey[100]}>{registryRow.endDate.substring(0,10)}</Box>
				<Link to={`/registryManagement/${registryRow.registryID}`}>
                <Button
                    color="secondary" variant="contained"
                    p="5px 10px"
                    borderradius="4px"
                    type="submit"
                >
                    Xem chi tiết
                </Button>
				</Link>
                </Box>
                ))}
                </Box>      
            </Grid>

            
            <Grid
            xs={12} md={12}
            >
                <Box
                    p="0 30px"
                    backgroundColor={colors.primary[400]}
                    display="flex "
                    justifyContent="space-between"
                    alignItems="center"
                    height="50px"
                >
                    
                    <Typography
                        variant="h5"
                        fontWeight="600"
                        color={colors.greenAccent[500]}
                    >
                        Biểu đồ thống kê và dự báo lượng xe đăng kiểm ở các khu vực
                    </Typography>
                    
                    
                    <IconButton>
                        <DownloadOutlinedIcon
                        sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                        />
                    </IconButton>
                </Box>
                   <Box height="250px" m="-20px 0 0 0"  backgroundColor={colors.primary[400]}>
                    <LineChart isDashboard={true} />
                </Box>
            </Grid>
        
            
           
            


        </Grid>
        

        </Box>
    );
   
};

export default Dashboard;