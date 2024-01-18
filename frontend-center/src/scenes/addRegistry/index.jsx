//add registry page 

import { Box, Button, Typography, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import { Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { useState, useEffect, useRef } from 'react';

const AddRegistry = () => {
    const [data, setData] = useState([]);
	const usenavigate = useNavigate();

	const postRegistry = (values) => {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("theFuckingToken")},
			body: JSON.stringify({
				centerID: localStorage.getItem("centerID"),
				createdAt: values.startDate + "T00:0:0.000000", 
				endDate: values.endDate + "T00:0:0.000000",
				carID: values.carID}),
		};
	
		fetch("http://127.0.0.1:8000/registry/create/", requestOptions);
	}

	const postCar = (values) => {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("theFuckingToken")},
			body: JSON.stringify({
				carID: values.carID,
				color: values.color,
				brand: values.brand,
				type: values.type,
				usage: values.usage,
				ownerID: values.ownerID}),
		};
	
		fetch("http://127.0.0.1:8000/car/create/", requestOptions);
	}

	const postOwner = (values) => {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("theFuckingToken")},
			body: JSON.stringify({
				ownerID: parseInt(values.ownerID),
				name: values.name,
				phoneNumber: values.phoneNumber,
				address: values.address}),
		};
	
		fetch("http://127.0.0.1:8000/owner/create/", requestOptions);
	}

    const handleFormSubmit = async (values) => {
		postRegistry(values)
		postCar(values)
		postOwner(values)

		setData(data);
		toast.success("Ghi nhận kết quả đăng kiểm thành công!");

  };
  if (data.detail != null) {
	return <>{<Navigate to='/login'/>}</>
  }

  return (
    <Box m="20px">
      <Header title="Thêm đăng kiểm mới" subtitle="Ghi nhận kết quả đăng kiểm mới cho trung tâm" />
      <ToastContainer theme='colored' position='top-center'></ToastContainer>
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
            >
            {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
			handleSubmit,
            }) => (
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'grid', gridTemplateRows: 'repeat(3, 1fr)', gap:'10px' }}>
                    <Box
                    gap="10px"
                    display="grid"
                    sx={{ mb: 3}}
                    >
                    <Typography
                        variant="h3"
                        color="#ffffff"
                        fontWeight="700"
                    >
                        Thông tin đăng kiểm
                    </Typography>
                    
                    <TextField
                        fullWidth
                        variant="filled"
                        type="date"
                        label="Ngày đăng kiểm"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.startDate}
                        name="startDate"
                        error={!!touched.startDate && !!errors.startDate}
                        helperText={touched.startDate && errors.startDate}
                       
                    />

                    <TextField
                        fullWidth
                        variant="filled"
                        type="date"
                        label="Ngày hết hạn"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.endDate}
                        name="endDate"
                        error={!!touched.endDate && !!errors.endDate}
                        helperText={touched.endDate && errors.endDate}
                       
                    />
                    </Box>
                    <Box
                    gap="10px"
                    display="grid"
                    sx={{ mb: 3}}
                    >
                    <Typography
                        variant="h3"
                        color="#ffffff"
                        fontWeight="700"
                    >
                        Thông tin ô tô
                    </Typography>
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Biển số xe"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.carID}
                        name="carID"
                        error={!!touched.carID && !!errors.carID}
                        helperText={touched.carID && errors.carID}

                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Màu sắc"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.color}
                        name="color"
                        error={!!touched.color && !!errors.color}
                        helperText={touched.color && errors.color}
                       
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Hãng xe"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.brand}
                        name="brand"
                        error={!!touched.brand && !!errors.brand}
                        helperText={touched.brand && errors.brand}
                       
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Loại xe"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.type}
                        name="type"
                        error={!!touched.type && !!errors.type}
                        helperText={touched.type && errors.type}
                       
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Mục đích sử dụng"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.usage}
                        name="usage"
                        error={!!touched.usage && !!errors.usage}
                        helperText={touched.usage && errors.usage}
                    />
                    
                
                    </Box>
                    <Box
                    gap="10px"
                    display="grid"
                    sx={{ mb: 3}}
                    >
                    <Typography
                    variant="h3"
                    color="#ffffff"
                    fontWeight="700"
                    >
                        Thông tin chủ xe
                    </Typography>
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Tên chủ xe"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.name}
                        name="name"
                        error={!!touched.name && !!errors.name}
                        helperText={touched.name && errors.name}

                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Số căn cước"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.ownerID}
                        name="ownerID"
                        error={!!touched.ownerID && !!errors.ownerID}
                        helperText={touched.ownerID && errors.ownerID}
                        
                    />
                    
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Số điện thoại"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.phoneNumber}
                        name="phoneNumber"
                        error={!!touched.phoneNumber && !!errors.phoneNumber}
                        helperText={touched.phoneNumber && errors.phoneNumber}
                       
                    /> 
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Địa chỉ"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.address}
                        name="address"
                        error={!!touched.address && !!errors.address}
                        helperText={touched.address && errors.address}
                       
                    /> 
                    </Box>
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained" size="large">
                    Xác nhận
                  </Button>
                </Box>
            </form>
            )}
            </Formik>
    </Box>
  );
};

const phoneRegExp =
/^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
startDate: yup.date().required("Bắt buộc"),
endDate: yup.date().required("Bắt buộc"),
carID: yup.string().required("Bắt buộc"),
type: yup.string().required("Bắt buộc"),
brand: yup.string().required("Bắt buộc"),
color: yup.string().required("Bắt buộc"),
name: yup.string().required("Bắt buộc"),
ownerID : yup.string().required("Bắt buộc"),
phoneNumber: yup
.string()
.matches(phoneRegExp, "Số điện thoại không hợp lệ")
.required("Bắt buộc"),
address: yup.string().required("Bắt buộc")
});
const initialValues = {
    startDate:"",
    endDate: "",
    carID: "",
    type: "",
    brand: "",
    usage: "",
    color: "",
    name: "",
    ownerID : "",
    phoneNumber: "",
    address: "",
};
export default AddRegistry;
