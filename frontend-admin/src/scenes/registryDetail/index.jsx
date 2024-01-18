//registry detail page

import Header from "../../components/Header";
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { ToastContainer } from 'react-toastify';
import { Box, Button, Typography, useTheme, Card, CardContent, CardMedia, Grid } from "@mui/material";
import Battery90OutlinedIcon from '@mui/icons-material/Battery90Outlined';
import BatteryAlertOutlinedIcon from '@mui/icons-material/BatteryAlertOutlined';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import { tokens } from "../../theme";
import { carImages } from "../../data/mockData";
const RegistryDetail = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [registry, setRegistry] = useState([]);
	const [car, setCar] = useState([]);
	const [owner, setOwner] = useState([]);
	const [center, setCenter] = useState([]);
	const imagesR = carImages[Math.floor(Math.random()*carImages.length)];
    
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'In giấy chứng nhận đăng kiểm',
    }) 

	var today = new Date();
	var d = String(today.getDate()).padStart(2, '0');
	var m = String(today.getMonth() + 1).padStart(2, '0');
	var y = today.getFullYear();
	const registryID = useParams().registryID;
	const usenavigate = useNavigate();
	
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
	

	const fetchData = () => {
		const requestOptions = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("theFuckingToken"),
			},
		};
		
		fetch("http://127.0.0.1:8000/registry/" + registryID, requestOptions).then((response) => response.json()).then((data) => {
			if (data.detail != null) {
				usenavigate('/login')
			}
			setRegistry(data);
			fetchDataCar(data.carID)
			fetchDataCenter(data.centerID)
		})
	}

	const fetchDataCar = (carID) => {
		const requestOptions = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("theFuckingToken"),
			},
		};
		
		fetch("http://127.0.0.1:8000/car/" + carID, requestOptions).then((response) => response.json()).then((data) => {
			if (data.detail != null) {
				usenavigate('/login')
			}
			setCar(data);
			fetchDataOwner(data.ownerID);
		})
	}

	const fetchDataCenter = (centerID) => {
		const requestOptions = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("theFuckingToken"),
			},
		};
		
		fetch("http://127.0.0.1:8000/center/" + centerID, requestOptions).then((response) => response.json()).then((data) => {
			if (data.detail != null) {
				usenavigate('/login')
			}
			setCenter(data);
		})
	}

	const fetchDataOwner = (ownerID) => {
		const requestOptions = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("theFuckingToken"),
			},
		};
		
		fetch("http://127.0.0.1:8000/owner/" + ownerID, requestOptions).then((response) => response.json()).then((data) => {
			if (data.detail != null) {
				usenavigate('/login')
			}
			setOwner(data);
		})
	}
	

	useEffect(() => {
		fetchData();
	  }, []);

	 
    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Thông tin đăng kiểm" subtitle="Thông tin chi tiết của ô tô đã đăng kiểm" />
                
                    <ToastContainer theme='colored' position='top-center'></ToastContainer>      
               
            </Box>
        
            {/* Registry Info*/}
            
            
            <Card sx={{ borderRadius: '15px', backgroundColor: colors.primary[400] }} >
            <Grid container spacing={2}>
                <Grid item xs={12} md={8} >
                    <CardMedia
                        component="img"
                        alt="car"
                        image={imagesR}
                        sx={{ maxWidth: '100%', height: 500 }}
                    />
                </Grid>
                <Grid item xs={12} md={4} >
                    <CardContent sx={{ height: 500, backgroundColor: colors.primary[400]}}>
                        <Typography gutterBottom variant="h3" component="div"  color={colors.grey[100]}
                            fontWeight="bold"
                            sx={{ p: 2}}>
                        {registry.registryID}
                        </Typography>
                        <Typography variant="h5" color={colors.grey[100]} sx={{ p: 2}}>
                            Biển số xe: {car.carID}
                        </Typography>
                        <Typography variant="h5" color={colors.grey[100]} sx={{ p: 2}}>
                            Hãng xe: {car.brand}
                        </Typography>
                        <Typography variant="h5" color={colors.grey[100]} sx={{ p: 2}}>
                            Mục đích sử dụng: {car.usage}
                        </Typography>
                        <div className="color" style={{ display: 'flex' , paddingBottom: '10px'}}>
                            <Typography variant="h5" color={colors.grey[100]} sx={{ p: 2}}>
                                Màu sắc : 
                            </Typography>
                            <div style={{ display:'inline-block', borderRadius: '50%', backgroundColor: car.color, width: '50px', height:'50px', marginLeft: '5px'}}></div>
                        </div>
                        <div className="color" style={{ display: 'flex'}}>
                            <Typography variant="h5" color={colors.grey[100]} sx={{ p: 2}}>
                                Trạng thái :
                            </Typography>
                            <Button variant="contained" 
                            startIcon={ checkStatus(registry.endDate) === "Bình thường" ? <Battery90OutlinedIcon /> : <BatteryAlertOutlinedIcon/>} 
                            style={{color: "#ffffff", marginLeft: '5px', borderRadius:'10px' }}
                            color={ checkStatus(registry.endDate) === "Bình thường" ? "success" : "error"}
                            >
                                {checkStatus(registry.endDate)}
                            </Button>
                        </div>
                        <Box sx={{ p: 2}}>
                            <Button
                                onClick={handlePrint}
                                sx={{
                                backgroundColor: colors.blueAccent[700],
                                color: colors.grey[100],
                                fontSize: "12px",
                                fontWeight: "bold",
                                padding: "10px 20px",
                                }}
                            >
                                <PrintOutlinedIcon sx={{ mr: "10px" }} />
                                In giấy chứng nhận 
                            </Button>
                        </Box>
        
                
                    </CardContent>
                </Grid>
            </Grid>
            </Card>
            
            
            <Typography
                variant="h2"
                color={colors.grey[100]}
                fontWeight="bold"
                align="center"
                sx={{ m: "25px 0 45px 0" }}
            >
                Thông tin chi tiết
            </Typography>

            

            <Box sx={{ backgroundColor: colors.primary[400], borderRadius: '15px'}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} >
                        <Box>
                        <Typography
                            variant="h3"
                            color={colors.grey[100]}
                            fontWeight="bold"
                            align="center"
                            sx={{ p:2 }}
                        >
                            Thông tin chủ xe
                        </Typography>
                        <Typography variant="h5" color={colors.grey[100]} sx={{ p: 2}} align="center">
                            Họ và tên : {owner.name}
                        </Typography>
                        <Typography variant="h5" color={colors.grey[100]} sx={{ p: 2}} align="center">
                            CMMD: {owner.ownerID}
                        </Typography>
                        <Typography variant="h5" color={colors.grey[100]} sx={{ p: 2}} align="center">
                            Số điện thoại: {owner.phoneNumber}
                        </Typography>
                
                        </Box>
                        
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box>
                        <Typography
                            variant="h3"
                            color={colors.grey[100]}
                            fontWeight="bold"
                            align="center"
                            sx={{ p:2 }}
                        >
                            Thông tin đăng kiểm
                        </Typography>
                        <Typography variant="h5" color={colors.grey[100]} sx={{ p: 2}} align="center">
                            Nơi đăng kiểm : {center.name}
                        </Typography>
                        <Typography variant="h5" color={colors.grey[100]} sx={{ p: 2}} align="center">
                            Ngày đăng kiểm : {String(registry.createdAt).substring(0, 10)}
                        </Typography>
                        <Typography variant="h5" color={colors.grey[100]} sx={{ p: 2}} align="center">
                            Ngày hết hạn : {String(registry.endDate).substring(0, 10)}
                        </Typography>
                        </Box>
                    </Grid>
                    
                </Grid>
                
            </Box> 
            {/* Printing document */}
            <Box sx={{display:'none'}}>
                <Box ref={componentRef}>
                <Typography
                    variant="h1"
                    color="black"
                    fontWeight="bold"
                    align="center"
                    textTransform={"uppercase"}
                    sx={{ m: "25px 0 45px 0" }}
                >
                    Giấy chứng nhận đăng kiểm
                </Typography>

                <Typography
                    variant="h2"
                    color="black"
                    fontWeight="bold"
                    textTransform={"uppercase"}
                    align="center"
                    sx={{ p:2 }}
                >
                    Thông tin đăng kiểm
                </Typography>
                <Typography variant="h3" color="black" sx={{ mb: 2, ml: 5}}>
                    Tên chủ xe: {owner.name}
                </Typography>
                <Typography variant="h3" color="black" sx={{ mb: 2, ml: 5}}>
                    Dòng xe: {car.brand}
                </Typography>
                <Typography variant="h3" color="black" sx={{ mb: 2, ml: 5}}>
                    Biển số: {car.carID}
                </Typography>
                <Typography variant="h3" color="black" sx={{ mb: 2, ml: 5}}>
                    Mã đăng kiểm: {registry.registryID}
                </Typography>
                <Typography variant="h3" color="black" sx={{ mb: 2, ml: 5}}>
                    Nơi đăng kiểm: {center.name}
                </Typography>
                <Typography variant="h3" color="black" sx={{ mb: 2, ml: 5}}>
                    Ngày đăng kiểm: {String(registry.createdAt).substring(0, 10)}
                </Typography>
                <Typography variant="h3" color="black" sx={{ mb: 2, ml: 5}}>
                    Ngày hết hạn: {String(registry.endDate).substring(0, 10)}
                </Typography>
                <Grid container sx={{ mt: 5}}>
                    <Grid item xs={6} md={6}>
                        <Typography variant="h3" color="black" align="center" >
                            Chữ ký chủ xe  
                        </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <Typography variant="h3" color="black" align="center">
                            Xác nhận của nơi đăng kiểm  
                        </Typography>
                    </Grid>
                </Grid>
                </Box>   
            </Box>
            
            
        </Box>
           
    );
};

export default RegistryDetail;